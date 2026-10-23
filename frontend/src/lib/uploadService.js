/**
 * uploadService.js
 *
 * Mock service that simulates the backend upload + processing pipeline.
 *
 * Real endpoints (comment at point of use):
 *   POST /sets/upload  (multipart: soal file, optional kunci file, jenis) -> { jobId }
 *   GET  /sets/jobs/:id (poll every 1.5s; SSE could replace polling) -> { tahap, persen, galat?, hasil?, setId? }
 */

const TAHAP_MAP = { unggah: 0, baca: 1, gambar: 2, kunci: 3, selesai: 4, gagal: -1 };

/**
 * Simulate uploading files.
 * Returns a jobId.
 * Calls onProgress(persen) during the "upload" phase.
 * @param {object} params
 * @param {File} params.file
 * @param {File|null} params.keyFile
 * @param {string} params.jenis
 * @param {AbortSignal} params.signal
 * @param {(persen: number) => void} params.onProgress
 * @returns {Promise<{jobId: string}>}
 */
export async function uploadFiles({ file, keyFile, jenis, signal, onProgress }) {
  // POST /sets/upload (multipart: berkas soal, berkas kunci opsional, jenis) -> {jobId}
  // Mock only: real job IDs must be generated server-side with a cryptographic RNG.
  const jobId = `job-${globalThis.crypto.randomUUID()}`;

  // Simulate upload progress over ~1.2 seconds
  for (let p = 0; p <= 100; p += 5) {
    if (signal?.aborted) throw new DOMException('Aborted', 'AbortError');
    onProgress(p);
    await sleep(60, signal);
  }

  return { jobId };
}

/**
 * Poll job status. Returns job state.
 * @param {string} jobId
 * @param {File} file - original file (for dev-mode name-based triggers)
 * @param {AbortSignal} signal
 * @param {(status: object) => void} onStatus - called with each poll result
 * @returns {Promise<object>} final status
 */
export async function pollJob(jobId, file, signal, onStatus) {
  // GET /sets/jobs/:id (polling 1.5s, SSE bisa menggantikan)
  const stages = ['baca', 'gambar', 'kunci'];

  for (const stage of stages) {
    if (signal?.aborted) throw new DOMException('Aborted', 'AbortError');
    const status = { tahap: stage, persen: 100 };
    onStatus(status);
    await sleep(800, signal);
  }

  if (signal?.aborted) throw new DOMException('Aborted', 'AbortError');

  // Dev-mode name-based triggers
  const name = file.name.toLowerCase();
  const ext = (file.name.split('.').pop() || '').toLowerCase();

  if (import.meta.env.DEV && /scan/.test(name) && ext === 'pdf') {
    const final = {
      tahap: 'gagal',
      persen: 100,
      galat: { kode: 'scan', pesan: 'PDF ini berupa gambar hasil scan' },
    };
    onStatus(final);
    return final;
  }

  if (import.meta.env.DEV && /sebagian/.test(name)) {
    const final = {
      tahap: 'selesai',
      persen: 100,
      hasil: { jumlah: 38, bergambar: 2, terbaca: 38, total: 40 },
      setId: 'set-' + jobId,
    };
    onStatus(final);
    return final;
  }

  // Default: success
  const final = {
    tahap: 'selesai',
    persen: 100,
    hasil: { jumlah: 30, bergambar: 3, terbaca: 30, total: 30 },
    setId: 'set-' + jobId,
  };
  onStatus(final);
  return final;
}

export { TAHAP_MAP };

/* --- helpers --- */
function sleep(ms, signal) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(resolve, ms);
    signal?.addEventListener('abort', () => {
      clearTimeout(timer);
      reject(new DOMException('Aborted', 'AbortError'));
    }, { once: true });
  });
}
