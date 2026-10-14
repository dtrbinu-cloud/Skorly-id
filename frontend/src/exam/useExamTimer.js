import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Hook untuk menghitung mundur timer ujian yang tersinkronisasi dengan jam server.
 *
 * @param {Object} params
 * @param {string|number|Date} params.deadline - Waktu batas akhir dari server (ISO atau timestamp)
 * @param {string|number|Date} params.serverNow - Waktu server saat data diambil
 * @param {Function} params.onTimeUp - Callback saat sisa waktu habis (0 detik)
 * @param {boolean} params.isEnabled - Apakah timer aktif (ruang bertimer vs tugas tanpa timer)
 */
export default function useExamTimer({
  deadline,
  serverNow,
  onTimeUp,
  isEnabled = true,
}) {
  // Hitung offset jam server terhadap jam browser saat pertama kali menerima data
  const offsetRef = useRef(0);
  const deadlineMsRef = useRef(0);
  const onTimeUpRef = useRef(onTimeUp);
  onTimeUpRef.current = onTimeUp;

  // Inisialisasi offset dan target timestamp
  if (deadline && serverNow && !deadlineMsRef.current) {
    const sNow = new Date(serverNow).getTime();
    const dLine = new Date(deadline).getTime();
    offsetRef.current = sNow - Date.now();
    deadlineMsRef.current = dLine;
  }

  const computeRemaining = useCallback(() => {
    if (!isEnabled || !deadlineMsRef.current) return 0;
    const nowWithOffset = Date.now() + offsetRef.current;
    const diffMs = deadlineMsRef.current - nowWithOffset;
    return Math.max(0, Math.floor(diffMs / 1000));
  }, [isEnabled]);

  const [remainingSeconds, setRemainingSeconds] = useState(() => computeRemaining());
  const [announcement, setAnnouncement] = useState('');
  const announced5MinRef = useRef(false);
  const announced1MinRef = useRef(false);
  const hasTriggeredTimeUpRef = useRef(false);

  useEffect(() => {
    if (!isEnabled || !deadline) return;

    // Hitung ulang sisa waktu
    const updateTick = () => {
      const remaining = computeRemaining();
      setRemainingSeconds(remaining);

      // Pengumuman aria-live saat mencapai 5 menit dan 1 menit
      if (remaining <= 300 && remaining > 295 && !announced5MinRef.current) {
        announced5MinRef.current = true;
        setAnnouncement('Perhatian: Sisa waktu ujian tinggal 5 menit lagi.');
      } else if (remaining <= 60 && remaining > 55 && !announced1MinRef.current) {
        announced1MinRef.current = true;
        setAnnouncement('Peringatan: Sisa waktu ujian tinggal 1 menit lagi! Ujian akan dikumpulkan otomatis.');
      }

      // Waktu habis
      if (remaining === 0 && !hasTriggeredTimeUpRef.current) {
        hasTriggeredTimeUpRef.current = true;
        if (onTimeUpRef.current) {
          onTimeUpRef.current();
        }
      }
    };

    // Jalankan pertama kali
    updateTick();

    // Timer tiap 1 detik
    const intervalId = setInterval(updateTick, 1000);

    // Sinkronkan saat tab kembali aktif
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        updateTick();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      clearInterval(intervalId);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [computeRemaining, deadline, isEnabled]);

  // Format ke HH:MM:SS
  const formatTime = (totalSeconds) => {
    const s = Math.max(0, totalSeconds);
    const hours = Math.floor(s / 3600);
    const minutes = Math.floor((s % 3600) / 60);
    const seconds = s % 60;
    return [
      String(hours).padStart(2, '0'),
      String(minutes).padStart(2, '0'),
      String(seconds).padStart(2, '0'),
    ].join(':');
  };

  const isLow = remainingSeconds <= 300 && remainingSeconds > 60; // 5 menit terakhir (kuning)
  const isCritical = remainingSeconds <= 60 && remainingSeconds > 0; // 1 menit terakhir (merah)
  const isExpired = remainingSeconds === 0;

  return {
    remainingSeconds,
    formattedTime: formatTime(remainingSeconds),
    isLow,
    isCritical,
    isExpired,
    announcement,
  };
}
