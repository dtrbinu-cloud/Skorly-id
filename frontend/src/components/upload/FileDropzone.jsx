/**
 * FileDropzone — drag-and-drop / click-to-pick file upload zone.
 * Props:
 *   kind: 'soal' | 'kunci'
 *   compact: boolean (small version for kunci)
 *   onFile: (file: File) => void
 *   onMultiple: () => void  (called when more than one file is dropped)
 *   inputRef: React ref for the hidden input
 *   accept: string
 */
import { useCallback, useRef, useState } from 'react';
import Icon from '../ui/Icon';

export default function FileDropzone({
  kind = 'soal',
  compact = false,
  onFile,
  onMultiple,
  inputRef: externalInputRef,
  accept = '.pdf,.xlsx,.xls,.csv',
}) {
  const [dragging, setDragging] = useState(false);
  const internalRef = useRef(null);
  const inputRef = externalInputRef || internalRef;
  const dragCounter = useRef(0);

  const handleChange = useCallback(
    (e) => {
      const f = e.target.files?.[0];
      if (f) onFile(f);
      // Reset so the same file can be re-selected
      e.target.value = '';
    },
    [onFile]
  );

  const handleDragEnter = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current++;
    setDragging(true);
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current--;
    if (dragCounter.current <= 0) {
      dragCounter.current = 0;
      setDragging(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      dragCounter.current = 0;
      setDragging(false);
      const files = e.dataTransfer.files;
      if (files.length > 1 && onMultiple) onMultiple();
      if (files[0]) onFile(files[0]);
    },
    [onFile, onMultiple]
  );

  const zoneClass = [
    'up-zone',
    compact ? 'up-zone--sm' : '',
    dragging ? 'up-zone--drag' : '',
  ]
    .filter(Boolean)
    .join(' ');

  if (compact) {
    return (
      <label
        className={zoneClass}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          className="up-sr-only"
          onChange={handleChange}
        />
        <span className="up-zone-icon">
          <Icon name="key" />
        </span>
        <span className="up-zone-text-left">
          <b>{dragging ? 'Lepaskan untuk mengunggah' : 'Pilih berkas kunci'}</b>
          <br />
          <small>PDF, Excel, CSV</small>
        </span>
      </label>
    );
  }

  return (
    <label
      className={zoneClass}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="up-sr-only"
        onChange={handleChange}
      />
      <span className="up-zone-icon">
        <Icon name="upload_file" className="up-zone-icon-lg" />
      </span>
      <b>{dragging ? 'Lepaskan untuk mengunggah' : 'Tarik berkas ke sini atau pilih'}</b>
      <small>PDF, Excel, CSV · maks. 20 MB</small>
    </label>
  );
}
