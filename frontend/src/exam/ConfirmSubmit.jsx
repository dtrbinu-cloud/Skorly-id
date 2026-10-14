import { useEffect, useRef } from 'react';

export default function ConfirmSubmit({
  isOpen,
  total = 0,
  answers = {},
  flags = {},
  questions = [],
  onClose,
  onConfirm,
  onJumpToQuestion,
  isSubmitting = false,
  triggerRef,
}) {
  const dialogRef = useRef(null);
  const cancelBtnRef = useRef(null);

  // Hitung ringkasan
  const answeredCount = Object.keys(answers).filter(
    (k) => answers[k] !== undefined && answers[k] !== null && answers[k] !== ''
  ).length;

  const flaggedCount = Object.keys(flags).filter(
    (k) => Boolean(flags[k])
  ).length;

  const unansweredIndices = [];
  for (let i = 0; i < total; i++) {
    const qId = questions[i]?.id ?? i;
    const isAns = answers[qId] !== undefined && answers[qId] !== null && answers[qId] !== '';
    if (!isAns) {
      unansweredIndices.push(i);
    }
  }
  const unansweredCount = unansweredIndices.length;

  // Fokus jebakan dan keyboard handler
  useEffect(() => {
    if (!isOpen) return;

    const prevActive = triggerRef?.current || document.activeElement;
    const timer = setTimeout(() => {
      cancelBtnRef.current?.focus();
    }, 50);

    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && !isSubmitting) {
        e.preventDefault();
        onClose();
        return;
      }

      // Focus trap
      if (e.key === 'Tab' && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll(
          'button:not([disabled]), [tabindex="0"]'
        );
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = prevOverflow;
      if (prevActive && typeof prevActive.focus === 'function') {
        prevActive.focus();
      }
    };
  }, [isOpen, onClose, isSubmitting, triggerRef]);

  if (!isOpen) return null;

  return (
    <div
      className="ex-dialog-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget && !isSubmitting) onClose();
      }}
    >
      <div
        className="ex-dialog-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-dialog-title"
        aria-describedby="confirm-dialog-summary"
        ref={dialogRef}
      >
        <div className="ex-dialog-header">
          <div className="ex-dialog-icon-wrap" aria-hidden="true">
            <span className="material-symbols-outlined ex-dialog-icon">
              assignment_turned_in
            </span>
          </div>
          <div>
            <h2 id="confirm-dialog-title" className="ex-dialog-title">
              Kumpulkan Ujian?
            </h2>
            <p className="ex-dialog-desc">
              Pastikan seluruh soal telah kamu tinjau dengan teliti sebelum mengirim jawaban akhir.
            </p>
          </div>
        </div>

        {/* Ringkasan */}
        <div id="confirm-dialog-summary" className="ex-summary-grid">
          <div className="ex-summary-card ex-summary-answered">
            <span className="ex-summary-num">{answeredCount}</span>
            <span className="ex-summary-label">Terjawab</span>
          </div>
          <div className="ex-summary-card ex-summary-flagged">
            <span className="ex-summary-num">{flaggedCount}</span>
            <span className="ex-summary-label">Ragu-ragu</span>
          </div>
          <div className="ex-summary-card ex-summary-unanswered">
            <span className="ex-summary-num">{unansweredCount}</span>
            <span className="ex-summary-label">Belum dijawab</span>
          </div>
        </div>

        {/* Daftar nomor belum dijawab jika ada */}
        {unansweredCount > 0 ? (
          <div className="ex-unanswered-block">
            <p className="ex-unanswered-title">
              Nomor yang belum dijawab (klik nomor untuk memeriksa):
            </p>
            <div className="ex-unanswered-chips">
              {unansweredIndices.map((idx) => (
                <button
                  key={idx}
                  type="button"
                  className="ex-unanswered-chip"
                  onClick={() => {
                    onClose();
                    onJumpToQuestion(idx);
                  }}
                  aria-label={`Buka soal nomor ${idx + 1}`}
                >
                  {String(idx + 1).padStart(2, '0')}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="ex-all-done-banner">
            <span className="material-symbols-outlined" aria-hidden="true">
              check_circle
            </span>
            <span>Semua soal sudah kamu jawab! Kamu siap mengumpulkan.</span>
          </div>
        )}

        {/* Tombol aksi */}
        <div className="ex-dialog-actions">
          <button
            type="button"
            className="ex-btn ex-btn-outline"
            onClick={onClose}
            disabled={isSubmitting}
            ref={cancelBtnRef}
          >
            Kembali periksa
          </button>
          <button
            type="button"
            className="ex-btn ex-btn-confirm-submit"
            onClick={onConfirm}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="ex-spinner" aria-hidden="true" />
                <span>Mengumpulkan…</span>
              </>
            ) : (
              <>
                <span>Kumpulkan sekarang</span>
                <span className="material-symbols-outlined" aria-hidden="true">
                  send
                </span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
