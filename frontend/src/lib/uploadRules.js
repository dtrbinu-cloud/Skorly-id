/**
 * uploadRules.js
 * Supported file types, validation, and formatting utilities for the upload flow.
 */

export const FILE_TYPES = {
  pdf:  { icon: 'picture_as_pdf', bg: '#ffe4e6', fg: '#e11d48' },
  xlsx: { icon: 'table_chart',    bg: '#dcfce7', fg: '#16a34a' },
  xls:  { icon: 'table_chart',    bg: '#dcfce7', fg: '#16a34a' },
  csv:  { icon: 'description',    bg: '#f1f5f9', fg: '#475569' },
};

const MAX_SIZE = 20 * 1024 * 1024; // 20 MB

/**
 * Returns the lowercase file extension.
 */
export function getExt(file) {
  return (file?.name?.split('.').pop() || '').toLowerCase();
}

/**
 * Format bytes into a human-readable MB string (Indonesian decimal separator).
 */
export function formatSize(bytes) {
  const mb = bytes / 1048576;
  const fixed = mb < 1 ? mb.toFixed(2) : mb.toFixed(1);
  return fixed.replace('.', ',') + ' MB';
}

/**
 * Validate a file. Returns an error message string, or '' if valid.
 */
export function validate(file) {
  if (!file || typeof file.name !== 'string' || typeof file.size !== 'number') {
    return 'Berkas tidak valid. Pilih berkas yang benar.';
  }
  if (!FILE_TYPES[getExt(file)]) {
    return 'Jenis berkas tidak didukung. Gunakan PDF, Excel, atau CSV.';
  }
  if (!Number.isFinite(file.size) || file.size <= 0) {
    return 'Berkas kosong. Pilih berkas yang berisi soal.';
  }
  if (file.size > MAX_SIZE) {
    return `Berkas ${formatSize(file.size)}. Maksimal 20 MB. Kompres lalu unggah lagi.`;
  }
  return '';
}
