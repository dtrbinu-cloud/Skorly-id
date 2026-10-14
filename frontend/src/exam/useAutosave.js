import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Hook untuk mengelola penyimpanan otomatis jawaban ujian.
 *
 * Mendukung:
 * - Antrean perubahan jawaban & status ragu-ragu
 * - Debounce 400ms
 * - PUT /attempts/:id/answers { questionId, pilihan, ragu, lastIndex }
 * - Retry dengan exponential backoff (1s, 2s, 4s, maks 15s)
 * - Deteksi offline/online via navigator.onLine & event listeners
 * - Peringatan window beforeunload bila antrean belum kosong
 * - Status teks: 'Tersimpan' | 'Menyimpan…' | 'Belum tersimpan'
 */
export default function useAutosave({
  attemptId,
  isDemo = false,
  onSaveSuccess,
}) {
  const [saveStatus, setSaveStatus] = useState('saved'); // 'saved' | 'saving' | 'unsaved'
  const [isOffline, setIsOffline] = useState(() => !navigator.onLine);

  // Antrean pembaruan: Map questionId -> data payload
  const queueRef = useRef(new Map());
  const debounceTimerRef = useRef(null);
  const retryTimerRef = useRef(null);
  const backoffDelayRef = useRef(1000);
  const isFlushingRef = useRef(false);

  // Pantau status online / offline
  useEffect(() => {
    const handleOnline = () => {
      setIsOffline(false);
      // Begitu kembali online, langsung proses antrean yang tertahan
      flushQueue();
    };

    const handleOffline = () => {
      setIsOffline(true);
      setSaveStatus('unsaved');
      if (retryTimerRef.current) {
        clearTimeout(retryTimerRef.current);
      }
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Peringatkan lewat beforeunload jika antrean belum kosong
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (queueRef.current.size > 0 || saveStatus === 'saving') {
        e.preventDefault();
        e.returnValue = 'Masih ada jawaban yang belum tersimpan ke server. Yakin ingin keluar?';
        return e.returnValue;
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [saveStatus]);

  // Fungsi pengiriman ke server
  const flushQueue = useCallback(async () => {
    if (isFlushingRef.current) return;
    if (queueRef.current.size === 0) {
      setSaveStatus('saved');
      return;
    }
    if (!navigator.onLine) {
      setSaveStatus('unsaved');
      return;
    }

    isFlushingRef.current = true;
    setSaveStatus('saving');

    // Ambil item pertama dari antrean
    const [qId, payload] = queueRef.current.entries().next().value;

    try {
      if (isDemo) {
        // Mode demo: simpan ke localStorage sebagai simulasi
        try {
          const key = `skorly_demo_attempt_${attemptId}`;
          const current = JSON.parse(localStorage.getItem(key) || '{}');
          current[qId] = payload;
          localStorage.setItem(key, JSON.stringify(current));
        } catch {
          // Abaikan error localStorage
        }
        // Simulasi latensi simpan sebentar
        await new Promise((res) => setTimeout(res, 250));
      } else {
        // Panggilan API riil
        const res = await fetch(`/attempts/${encodeURIComponent(attemptId)}/answers`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        if (!res.ok) {
          throw new Error(`Gagal menyimpan jawaban: ${res.status}`);
        }
      }

      // Berhasil: hapus dari antrean
      queueRef.current.delete(qId);
      backoffDelayRef.current = 1000; // reset delay backoff

      if (onSaveSuccess) {
        onSaveSuccess(payload);
      }

      isFlushingRef.current = false;

      // Jika masih ada antrean lainnya, kirim item berikutnya
      if (queueRef.current.size > 0) {
        flushQueue();
      } else {
        setSaveStatus('saved');
      }
    } catch (err) {
      isFlushingRef.current = false;
      setSaveStatus('unsaved');

      // Jadwalkan retry dengan exponential backoff (1s, 2s, 4s, maks 15s)
      const currentDelay = backoffDelayRef.current;
      backoffDelayRef.current = Math.min(15000, currentDelay * 2);

      if (navigator.onLine) {
        retryTimerRef.current = setTimeout(() => {
          flushQueue();
        }, currentDelay);
      }
    }
  }, [attemptId, isDemo, onSaveSuccess]);

  // Masukkan perubahan jawaban atau ragu-ragu ke antrean dengan debounce 400ms
  const enqueueAnswer = useCallback(
    ({ questionId, pilihan, ragu, lastIndex }) => {
      // Simpan juga salinan cadangan lokal instan untuk pemulihan refresh
      try {
        const backupKey = `skorly_backup_${attemptId}`;
        const existing = JSON.parse(localStorage.getItem(backupKey) || '{}');
        existing[questionId] = { pilihan, ragu, lastIndex, updatedAt: Date.now() };
        localStorage.setItem(backupKey, JSON.stringify(existing));
      } catch {
        // ignore
      }

      // Masukkan ke antrean
      queueRef.current.set(questionId, {
        questionId,
        pilihan,
        ragu,
        lastIndex,
      });

      setSaveStatus('saving');

      // Bersihkan timer debounce sebelumnya
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }

      debounceTimerRef.current = setTimeout(() => {
        flushQueue();
      }, 400);
    },
    [attemptId, flushQueue]
  );

  // Bersihkan timer saat unmount
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
      if (retryTimerRef.current) clearTimeout(retryTimerRef.current);
    };
  }, []);

  // Teks status tampilan
  const statusText = isOffline
    ? 'Belum tersimpan'
    : saveStatus === 'saving'
    ? 'Menyimpan…'
    : saveStatus === 'unsaved'
    ? 'Belum tersimpan'
    : 'Tersimpan';

  return {
    saveStatus,
    statusText,
    isOffline,
    enqueueAnswer,
    hasPendingQueue: queueRef.current.size > 0,
  };
}
