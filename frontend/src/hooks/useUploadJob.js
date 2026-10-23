import { useCallback, useRef, useState } from 'react';
import { uploadFiles, pollJob, TAHAP_MAP } from '../lib/uploadService';

/**
 * useUploadJob — manages the upload + processing lifecycle.
 *
 * Returns:
 *   start(file, keyFile, jenis) — kicks off upload + polling
 *   cancel()                    — aborts in-flight work
 *   tahap (0–4)                 — current stage index
 *   persen                      — upload percent (0–100)
 *   result                      — final result object or null
 *   error                       — error object or null
 *   setId                       — created set ID or null
 */
export default function useUploadJob() {
  const [tahap, setTahap] = useState(0);
  const [persen, setPersen] = useState(0);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [setId, setSetId] = useState(null);

  const abortRef = useRef(null);

  const cancel = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;
  }, []);

  const start = useCallback(async (file, keyFile, jenis) => {
    // Reset state
    setTahap(0);
    setPersen(0);
    setResult(null);
    setError(null);
    setSetId(null);

    const controller = new AbortController();
    abortRef.current = controller;
    const { signal } = controller;

    try {
      // Phase 1: Upload
      // POST /sets/upload (multipart: berkas soal, berkas kunci opsional, jenis) -> {jobId}
      const { jobId } = await uploadFiles({
        file,
        keyFile,
        jenis,
        signal,
        onProgress: (p) => setPersen(p),
      });

      // Phase 2–4: Poll processing stages
      // GET /sets/jobs/:id (polling 1.5s, SSE bisa menggantikan)
      const final = await pollJob(jobId, file, signal, (status) => {
        const stageIndex = TAHAP_MAP[status.tahap];
        if (stageIndex != null && stageIndex >= 0) {
          setTahap(stageIndex);
        }
      });

      // Done — set final stage
      if (final.tahap === 'selesai') {
        if (!final.hasil || !final.setId) {
          throw new Error('Respons server tidak lengkap');
        }
        const normalizedResult = {
          tipe: final.hasil.terbaca < final.hasil.total ? 'sebagian' : 'ok',
          jumlah: final.hasil.jumlah,
          bergambar: final.hasil.bergambar,
          terbaca: final.hasil.terbaca,
          total: final.hasil.total,
        };
        setTahap(4);
        setResult(normalizedResult);
        setSetId(final.setId);
        return { success: true, setId: final.setId, result: normalizedResult };
      } else if (final.tahap === 'gagal') {
        const normalizedResult = { tipe: final.galat.kode === 'scan' ? 'scan' : 'fail' };
        setTahap(4);
        setError(final.galat);
        setResult(normalizedResult);
        return { success: false, galat: final.galat, result: normalizedResult };
      }
      throw new Error('Status pekerjaan tidak dikenal');
    } catch (err) {
      if (err.name === 'AbortError') {
        // Cancelled — no state update needed
        return { cancelled: true };
      }
      setError({ kode: 'network', pesan: 'Upload gagal. Silakan coba lagi.' });
      const normalizedResult = { tipe: 'fail' };
      setResult(normalizedResult);
      return { success: false, error: err, result: normalizedResult };
    }
  }, []);

  return { start, cancel, tahap, persen, result, error, setId };
}
