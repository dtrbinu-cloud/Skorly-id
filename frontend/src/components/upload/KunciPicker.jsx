/**
 * KunciPicker — segmented control for selecting kunci jawaban source,
 * plus a secondary file dropzone when "terpisah" is chosen.
 */
import { useRef } from 'react';
import FileDropzone from './FileDropzone';
import FileCard from './FileCard';
import Icon from '../ui/Icon';

const OPTIONS = [
  { value: 'sama', label: 'Di berkas yang sama' },
  { value: 'terpisah', label: 'Berkas terpisah' },
  { value: 'nanti', label: 'Isi nanti' },
];

const HINTS = {
  sama: 'Kunci dibaca otomatis dari berkas.',
  terpisah: 'Kunci akan dipasangkan ke soal berdasarkan nomor.',
  nanti: 'Ruang baru bisa dibuat setelah semua soal punya kunci.',
};

export default function KunciPicker({
  value,
  onChange,
  keyFile,
  keyError,
  onKeyFile,
  onKeyRemove,
  onMultiple,
}) {
  const keyInputRef = useRef(null);

  return (
    <>
      <div className="up-seg" role="radiogroup" aria-label="Sumber kunci jawaban">
        {OPTIONS.map((opt) => (
          <label key={opt.value} className="up-seg-label">
            <input
              type="radio"
              name="kunci"
              value={opt.value}
              className="up-sr-only"
              checked={value === opt.value}
              onChange={() => onChange(opt.value)}
            />
            <span className="up-seg-text">{opt.label}</span>
          </label>
        ))}
      </div>
      <p className="up-hint">{HINTS[value]}</p>

      {value === 'terpisah' && (
        <div className="up-key-box">
          {keyFile ? (
            <FileCard
              file={keyFile}
              onReplace={() => keyInputRef.current?.click()}
              onRemove={onKeyRemove}
            />
          ) : (
            <FileDropzone
              kind="kunci"
              compact
              onFile={onKeyFile}
              onMultiple={onMultiple}
              inputRef={keyInputRef}
            />
          )}
          {keyError && (
            <p className="up-err" role="alert">
              <Icon name="error" />
              <span>{keyError}</span>
            </p>
          )}
        </div>
      )}
    </>
  );
}
