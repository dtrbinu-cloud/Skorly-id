/**
 * FileCard — displays a selected file with icon, name (truncated), size, status, and action buttons.
 * Props:
 *   file: File object
 *   onReplace: () => void
 *   onRemove: () => void
 */
import Icon from '../ui/Icon';
import { FILE_TYPES, getExt, formatSize } from '../../lib/uploadRules';

export default function FileCard({ file, onReplace, onRemove }) {
  const ext = getExt(file);
  const typeInfo = FILE_TYPES[ext] || { icon: 'description', bg: '#f1f5f9', fg: '#475569' };

  return (
    <div className="up-fcard">
      <span
        className="up-fcard-icon"
        style={{ background: typeInfo.bg, color: typeInfo.fg }}
      >
        <Icon name={typeInfo.icon} filled />
      </span>
      <div className="up-fcard-info">
        <p className="up-fcard-name">{file.name}</p>
        <p className="up-fcard-meta">
          <Icon name="check_circle" filled className="up-fcard-ok-icon" />
          <span>{formatSize(file.size)} · Siap diproses</span>
        </p>
      </div>
      <div className="up-fcard-actions">
        <button type="button" className="up-tbtn" onClick={onReplace}>
          Ganti
        </button>
        <button
          type="button"
          className="up-tbtn up-tbtn--red"
          onClick={onRemove}
          aria-label="Hapus berkas"
        >
          Hapus
        </button>
      </div>
    </div>
  );
}
