import { useEffect, useRef } from 'react';

export default function Palette({
  total = 0,
  currentIndex = 0,
  answers = {}, // { [questionId]: 'A'..'E' }
  flags = {}, // { [questionId]: boolean }
  questions = [],
  onSelectIndex,
  onSubmitClick,
  isOpenMobile = false,
  onCloseMobile,
}) {
  const activeBtnRef = useRef(null);
  const sheetRef = useRef(null);

  // Hitung jumlah terjawab
  const answeredCount = Object.keys(answers).filter(
    (k) => answers[k] !== undefined && answers[k] !== null && answers[k] !== ''
  ).length;

  // Scroll tombol aktif ke dalam pandangan saat berganti soal
  useEffect(() => {
    if (activeBtnRef.current) {
      activeBtnRef.current.scrollIntoView({
        block: 'nearest',
        behavior: 'smooth',
      });
    }
  }, [currentIndex]);

  // Kelola Esc pada bottom sheet mobile
  useEffect(() => {
    if (!isOpenMobile) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onCloseMobile && onCloseMobile();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpenMobile, onCloseMobile]);

  const renderContent = (isMobileView = false) => (
    <div className="ex-palette-card">
      <header className="ex-palette-header">
        <div className="ex-palette-title-row">
          <h2 className="ex-palette-title">Nomor Soal</h2>
          <span className="ex-palette-count" aria-live="polite">
            {answeredCount} / {total} terjawab
          </span>
        </div>

        {isMobileView && (
          <button
            type="button"
            className="ex-palette-close-btn"
            onClick={onCloseMobile}
            aria-label="Tutup daftar soal"
          >
            <span className="material-symbols-outlined" aria-hidden="true">
              close
            </span>
          </button>
        )}
      </header>

      {/* Legenda warna */}
      <div className="ex-palette-legend" aria-hidden="true">
        <div className="ex-legend-item">
          <span className="ex-legend-dot ex-dot-answered" />
          <span>Terjawab</span>
        </div>
        <div className="ex-legend-item">
          <span className="ex-legend-dot ex-dot-flagged" />
          <span>Ragu-ragu</span>
        </div>
        <div className="ex-legend-item">
          <span className="ex-legend-dot ex-dot-unanswered" />
          <span>Belum</span>
        </div>
      </div>

      {/* Grid 5 kolom dengan tinggi maksimal scrollable */}
      <nav
        className="ex-palette-grid-scroll"
        aria-label="Navigasi nomor soal"
      >
        <div className="ex-palette-grid">
          {Array.from({ length: total }, (_, i) => {
            const q = questions[i] || {};
            const qId = q.id ?? i;
            const isAnswered = answers[qId] !== undefined && answers[qId] !== null && answers[qId] !== '';
            const isFlagged = Boolean(flags[qId]);
            const isActive = currentIndex === i;
            const paddedNumber = String(i + 1).padStart(2, '0');

            // Susun status untuk aria-label
            const statusDescriptions = [];
            if (isAnswered) statusDescriptions.push('terjawab');
            else statusDescriptions.push('belum dijawab');
            if (isFlagged) statusDescriptions.push('ragu-ragu');
            if (isActive) statusDescriptions.push('sedang dibuka');
            const ariaLabel = `Soal ${paddedNumber}, ${statusDescriptions.join(', ')}`;

            let stateClass = 'ex-btn-unanswered';
            if (isFlagged) {
              stateClass = 'ex-btn-flagged';
            } else if (isAnswered) {
              stateClass = 'ex-btn-answered';
            }

            return (
              <button
                key={qId}
                ref={isActive ? activeBtnRef : null}
                type="button"
                className={`ex-palette-btn ${stateClass} ${
                  isActive ? 'ex-palette-btn-active' : ''
                }`}
                onClick={() => {
                  onSelectIndex(i);
                  if (isMobileView && onCloseMobile) {
                    onCloseMobile();
                  }
                }}
                aria-label={ariaLabel}
                aria-current={isActive ? 'step' : undefined}
              >
                <span className="ex-palette-btn-num">{paddedNumber}</span>
                {isFlagged && (
                  <span
                    className="material-symbols-outlined ex-palette-flag-icon"
                    aria-hidden="true"
                  >
                    bookmark
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Tombol amber Selesai & kumpulkan */}
      <div className="ex-palette-footer">
        <button
          type="button"
          className="ex-btn-submit-exam"
          onClick={() => {
            if (isMobileView && onCloseMobile) onCloseMobile();
            onSubmitClick();
          }}
        >
          <span className="material-symbols-outlined" aria-hidden="true">
            task_alt
          </span>
          <span>Selesai &amp; kumpulkan</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Tampilan Desktop: Sticky Sidebar */}
      <aside className="ex-palette-desktop" aria-label="Daftar nomor soal">
        {renderContent(false)}
      </aside>

      {/* Tampilan Mobile: Bottom Sheet Drawer */}
      {isOpenMobile && (
        <div
          className="ex-sheet-backdrop"
          onClick={onCloseMobile}
          aria-hidden="true"
        />
      )}
      <div
        ref={sheetRef}
        className={`ex-sheet-drawer ${isOpenMobile ? 'ex-sheet-open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Daftar nomor soal"
      >
        <div className="ex-sheet-handle" aria-hidden="true" />
        {renderContent(true)}
      </div>
    </>
  );
}
