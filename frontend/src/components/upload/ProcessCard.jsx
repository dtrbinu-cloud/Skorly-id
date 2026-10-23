/**
 * ProcessCard — shows the processing pipeline with stages, progress bar, and result banners.
 * Props:
 *   file: File
 *   tahap: number (0–4)
 *   persen: number (0–100)
 *   phase: 'proc' | 'done' | 'fail'
 *   result: { tipe: 'ok' | 'sebagian' | 'scan', jumlah, bergambar, terbaca, total } | null
 *   onCancel: () => void
 *   onDownloadTemplate: () => void
 *   onPickAnother: () => void
 *   resultRef: React ref for focus management
 */
import Icon from '../ui/Icon';
import { FILE_TYPES, getExt, formatSize } from '../../lib/uploadRules';

const STAGE_LABELS = [
  'Mengunggah berkas',
  'Membaca soal',
  'Mencari gambar',
  'Mencocokkan kunci',
];

export default function ProcessCard({
  file,
  tahap,
  persen,
  phase,
  result,
  onCancel,
  onDownloadTemplate,
  onPickAnother,
  resultRef,
}) {
  const ext = getExt(file);
  const typeInfo = FILE_TYPES[ext] || { icon: 'description', bg: '#f1f5f9', fg: '#475569' };

  return (
    <div className="up-card">
      {/* File info */}
      <div className="up-proc-file">
        <span
          className="up-fcard-icon"
          style={{ background: typeInfo.bg, color: typeInfo.fg }}
        >
          <Icon name={typeInfo.icon} filled />
        </span>
        <div className="up-fcard-info">
          <p className="up-fcard-name">{file.name}</p>
          <p className="up-fcard-meta">
            <span>{formatSize(file.size)}</span>
          </p>
        </div>
      </div>

      {/* Stages */}
      <ol className="up-stages">
        {STAGE_LABELS.map((label, i) => {
          const isDone = i < tahap;
          const isRunning = i === tahap && phase === 'proc';
          let cls = 'up-stage';
          if (isDone) cls += ' up-stage--done';
          else if (isRunning) cls += ' up-stage--run';

          return (
            <li key={i} className={cls}>
              <span className="up-stage-dot">
                {isDone ? (
                  <Icon name="check" filled className="up-stage-check" />
                ) : isRunning ? (
                  <span className="up-spin" />
                ) : (
                  <i />
                )}
              </span>
              <span>{label}</span>
              {i === 0 && isRunning && (
                <>
                  <span className="up-stage-bar">
                    <i style={{ width: `${persen}%` }} />
                  </span>
                  <span className="up-stage-pct">{persen}%</span>
                </>
              )}
              {i === 0 && isDone && (
                <>
                  <span className="up-stage-bar">
                    <i style={{ width: '100%' }} />
                  </span>
                  <span className="up-stage-pct">100%</span>
                </>
              )}
            </li>
          );
        })}
      </ol>

      {/* Cancel button (only during processing) */}
      {phase === 'proc' && (
        <div className="up-proc-cancel">
          <button type="button" className="up-tbtn" onClick={onCancel}>
            Batalkan
          </button>
        </div>
      )}

      {/* Result banners */}
      {result && result.tipe === 'ok' && (
        <div
          className="up-banner up-banner--ok"
          role="status"
          ref={resultRef}
          tabIndex={-1}
        >
          <Icon name="check_circle" filled />
          <div>
            <b>{result.jumlah} soal berhasil dibuat</b>
            <p>{result.bergambar} soal memiliki gambar.</p>
          </div>
        </div>
      )}

      {result && result.tipe === 'sebagian' && (
        <div
          className="up-banner up-banner--am"
          role="status"
          ref={resultRef}
          tabIndex={-1}
        >
          <Icon name="warning" filled />
          <div>
            <b>{result.terbaca} dari {result.total} soal terbaca</b>
            <p>Soal yang ditandai bisa kamu periksa di langkah berikutnya.</p>
          </div>
        </div>
      )}

      {result && result.tipe === 'scan' && (
        <div
          className="up-banner up-banner--bad"
          role="alert"
          ref={resultRef}
          tabIndex={-1}
        >
          <Icon name="error" filled />
          <div>
            <b>PDF ini berupa gambar hasil scan</b>
            <p>Teksnya tidak bisa dibaca. Unggah PDF yang teksnya bisa dipilih, atau pakai template Excel.</p>
            <div className="up-banner-actions">
              <button
                type="button"
                className="up-btn up-btn--ghost up-btn--sm"
                onClick={onDownloadTemplate}
              >
                Unduh template Excel
              </button>
              <button
                type="button"
                className="up-btn up-btn--amber up-btn--sm"
                onClick={onPickAnother}
              >
                Pilih file lain
              </button>
            </div>
          </div>
        </div>
      )}

      {result && result.tipe === 'fail' && (
        <div
          className="up-banner up-banner--bad"
          role="alert"
          ref={resultRef}
          tabIndex={-1}
        >
          <Icon name="error" filled />
          <div>
            <b>Upload gagal diproses</b>
            <p>Periksa koneksi dan format berkas, lalu coba lagi.</p>
            <button
              type="button"
              className="up-btn up-btn--amber up-btn--sm"
              onClick={onPickAnother}
            >
              Pilih file lain
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
