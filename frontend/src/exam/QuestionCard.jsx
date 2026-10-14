import { useState, useRef, useEffect } from 'react';
import RichText from './RichText';
import QuestionImages from './QuestionImages';
import ImageLightbox from './ImageLightbox';

export default function QuestionCard({
  question,
  total = 1,
  currentIndex = 0,
  selectedOption,
  isFlagged = false,
  onSelectOption,
  onToggleFlag,
  onPrev,
  onNext,
  onSubmitClick,
  isFirst = false,
  isLast = false,
  textSize = 'md',
  onChangeTextSize,
  mode = 'student', // 'student' | 'guru' | 'demo'
  sharedReadingRange = null, // { start: number, end: number }
  isEager = true,
}) {
  const [wacanaOpen, setWacanaOpen] = useState(true);
  const [optionLightboxImg, setOptionLightboxImg] = useState(null);
  const optImgTriggerRef = useRef(null);

  if (!question) {
    return null;
  }

  const soalNomor = question.nomor || currentIndex + 1;
  const mapelMateri = [question.mapel, question.materi].filter(Boolean).join(' • ');

  // Hitung judul rentang soal wacana
  const wacanaTitle = sharedReadingRange && sharedReadingRange.start && sharedReadingRange.end
    ? sharedReadingRange.start === sharedReadingRange.end
      ? `Bacaan untuk soal ${sharedReadingRange.start}`
      : `Bacaan untuk soal ${sharedReadingRange.start}–${sharedReadingRange.end}`
    : 'Bacaan soal';

  return (
    <article
      className="ex-card"
      aria-labelledby={`q-title-${question.id || currentIndex}`}
    >
      {/* Kepala kartu soal */}
      <header className="ex-card-header">
        <div className="ex-card-header-left">
          <span className="ex-badge-num">
            Soal No. {soalNomor} dari {total}
          </span>
          {mapelMateri && (
            <span className="ex-badge-category" title={mapelMateri}>
              {mapelMateri}
            </span>
          )}
          {mode === 'guru' && question.kunci && (
            <span className="ex-badge-guru-kunci">
              Kunci: {question.kunci}
            </span>
          )}
        </div>

        {/* Kontrol ukuran teks A- / A / A+ */}
        <div className="ex-card-header-right">
          <div
            className="ex-text-sizer"
            role="group"
            aria-label="Ukuran teks soal"
          >
            <button
              type="button"
              className={`ex-sizer-btn ${textSize === 'sm' ? 'ex-sizer-active' : ''}`}
              onClick={() => onChangeTextSize('sm')}
              aria-pressed={textSize === 'sm'}
              title="Teks kecil (15px)"
            >
              A−
            </button>
            <button
              type="button"
              className={`ex-sizer-btn ${textSize === 'md' ? 'ex-sizer-active' : ''}`}
              onClick={() => onChangeTextSize('md')}
              aria-pressed={textSize === 'md'}
              title="Teks normal (17px)"
            >
              A
            </button>
            <button
              type="button"
              className={`ex-sizer-btn ${textSize === 'lg' ? 'ex-sizer-active' : ''}`}
              onClick={() => onChangeTextSize('lg')}
              aria-pressed={textSize === 'lg'}
              title="Teks besar (20px)"
            >
              A+
            </button>
          </div>
        </div>
      </header>

      {/* Badan kartu soal */}
      <div className="ex-card-body">
        {/* Wacana bersama (jika ada) */}
        {question.wacana && (
          <section
            className="ex-wacana-box"
            aria-label={wacanaTitle}
          >
            <div className="ex-wacana-header">
              <div className="ex-wacana-title-wrap">
                <span className="material-symbols-outlined ex-wacana-icon" aria-hidden="true">
                  menu_book
                </span>
                <h3 className="ex-wacana-title">{wacanaTitle}</h3>
              </div>
              <button
                type="button"
                className="ex-wacana-toggle"
                onClick={() => setWacanaOpen((o) => !o)}
                aria-expanded={wacanaOpen}
                aria-label={wacanaOpen ? 'Tutup bacaan' : 'Buka bacaan'}
              >
                <span>{wacanaOpen ? 'Sembunyikan' : 'Buka'}</span>
                <span
                  className="material-symbols-outlined ex-toggle-arrow"
                  style={{
                    transform: wacanaOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s ease',
                  }}
                  aria-hidden="true"
                >
                  expand_more
                </span>
              </button>
            </div>

            {wacanaOpen && (
              <div className="ex-wacana-content">
                {question.wacana.judul && (
                  <h4 className="ex-wacana-subtitle">
                    {question.wacana.judul}
                  </h4>
                )}
                <RichText
                  content={question.wacana.teks}
                  textSize={textSize}
                  className="ex-wacana-text"
                />
                {question.wacana.gambar && question.wacana.gambar.length > 0 && (
                  <QuestionImages
                    gambar={question.wacana.gambar}
                    soalNomor={soalNomor}
                    isEager={isEager}
                  />
                )}
              </div>
            )}
          </section>
        )}

        {/* Teks soal utama */}
        <div id={`q-title-${question.id || currentIndex}`} className="ex-question-text-wrap">
          <RichText content={question.teks} textSize={textSize} />
        </div>

        {/* Blok rumus (opsional, hanya jika field rumus ada) */}
        {question.rumus && (
          <div className="ex-formula-block" role="region" aria-label="Rumus matematika">
            <span className="material-symbols-outlined ex-formula-icon" aria-hidden="true">
              functions
            </span>
            <code className="ex-formula-code">{question.rumus}</code>
          </div>
        )}

        {/* Gambar soal (opsional, tidak merender apa pun jika array kosong) */}
        {question.gambar && question.gambar.length > 0 && (
          <QuestionImages
            gambar={question.gambar}
            soalNomor={soalNomor}
            isEager={isEager}
          />
        )}

        {/* Pilihan jawaban */}
        <div className="ex-options-section">
          <p className="ex-options-heading">Pilih salah satu jawaban</p>
          <div
            className="ex-options-list"
            role="radiogroup"
            aria-label={`Pilihan jawaban untuk soal nomor ${soalNomor}`}
          >
            {question.opsi?.map((opt) => {
              const isSelected = selectedOption === opt.kode;
              const isGuruCorrect = mode === 'guru' && question.kunci === opt.kode;

              return (
                <label
                  key={opt.kode}
                  className={`ex-option-card ${
                    isSelected ? 'ex-option-selected' : ''
                  } ${isGuruCorrect ? 'ex-option-guru-key' : ''}`}
                >
                  <input
                    type="radio"
                    name={`question-${question.id || currentIndex}`}
                    value={opt.kode}
                    checked={isSelected}
                    onChange={() => onSelectOption && onSelectOption(opt.kode)}
                    className="ex-sr-only"
                    disabled={mode === 'guru'}
                  />

                  {/* Lencana huruf 36px */}
                  <span
                    className={`ex-option-badge ${
                      isSelected ? 'ex-badge-selected' : ''
                    } ${isGuruCorrect ? 'ex-badge-key' : ''}`}
                    aria-hidden="true"
                  >
                    {opt.kode}
                  </span>

                  {/* Konten Opsi: Teks dan/atau Gambar */}
                  <div className="ex-option-content">
                    {opt.teks && (
                      <RichText
                        content={opt.teks}
                        textSize={textSize}
                        className="ex-option-text"
                      />
                    )}

                    {opt.gambar && (
                      <div className="ex-option-img-wrap">
                        <button
                          type="button"
                          className="ex-option-img-btn"
                          ref={optImgTriggerRef}
                          onClick={(e) => {
                            e.stopPropagation();
                            setOptionLightboxImg({
                              ...opt.gambar,
                              alt: opt.gambar.alt || `Gambar opsi ${opt.kode}`,
                            });
                          }}
                          aria-label={`Perbesar gambar opsi ${opt.kode}`}
                        >
                          <img
                            src={opt.gambar.url}
                            alt={opt.gambar.alt || `Gambar opsi ${opt.kode}`}
                            className="ex-option-img"
                            style={{ maxHeight: '140px' }}
                            draggable={false}
                          />
                          <span className="ex-option-img-zoom-tag" aria-hidden="true">
                            <span className="material-symbols-outlined">zoom_in</span>
                          </span>
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Lingkaran centang di kanan */}
                  <div className="ex-option-check" aria-hidden="true">
                    <span
                      className={`material-symbols-outlined ex-check-icon ${
                        isSelected || isGuruCorrect ? 'ex-check-filled' : 'ex-check-empty'
                      }`}
                      style={{
                        fontVariationSettings: isSelected || isGuruCorrect ? "'FILL' 1" : "'FILL' 0",
                      }}
                    >
                      {isSelected || isGuruCorrect ? 'check_circle' : 'circle'}
                    </span>
                  </div>
                </label>
              );
            })}
          </div>
        </div>
      </div>

      {/* Baris bawah aksi (Hanya untuk student / demo) */}
      {mode !== 'guru' && (
        <footer className="ex-card-footer">
          <div className="ex-footer-actions">
            <button
              type="button"
              className="ex-btn ex-btn-outline"
              disabled={isFirst}
              onClick={onPrev}
            >
              <span className="material-symbols-outlined" aria-hidden="true">
                arrow_back
              </span>
              <span>Sebelumnya</span>
            </button>

            <button
              type="button"
              className={`ex-btn ex-btn-flag ${isFlagged ? 'ex-flag-active' : ''}`}
              onClick={onToggleFlag}
              aria-pressed={isFlagged}
            >
              <span
                className="material-symbols-outlined"
                style={{
                  fontVariationSettings: isFlagged ? "'FILL' 1" : "'FILL' 0",
                }}
                aria-hidden="true"
              >
                bookmark
              </span>
              <span>{isFlagged ? 'Ragu-ragu aktif' : 'Ragu-ragu'}</span>
            </button>

            {isLast ? (
              <button
                type="button"
                className="ex-btn ex-btn-primary ex-btn-submit-check"
                onClick={onSubmitClick}
              >
                <span>Periksa jawaban</span>
                <span className="material-symbols-outlined" aria-hidden="true">
                  fact_check
                </span>
              </button>
            ) : (
              <button
                type="button"
                className="ex-btn ex-btn-primary"
                onClick={onNext}
              >
                <span>Selanjutnya</span>
                <span className="material-symbols-outlined" aria-hidden="true">
                  arrow_forward
                </span>
              </button>
            )}
          </div>

          {/* Petunjuk pintasan kecil (disembunyikan di layar sentuh) */}
          <div className="ex-shortcuts-hint" aria-hidden="true">
            <span>Pintasan:</span>
            <kbd>A</kbd>–<kbd>E</kbd> pilih jawaban
            <span className="ex-dot-sep">•</span>
            <kbd>←</kbd> / <kbd>→</kbd> pindah soal
            <span className="ex-dot-sep">•</span>
            <kbd>R</kbd> ragu-ragu
          </div>
        </footer>
      )}

      {/* Lightbox untuk gambar opsi */}
      {optionLightboxImg && (
        <ImageLightbox
          isOpen={Boolean(optionLightboxImg)}
          image={optionLightboxImg}
          onClose={() => setOptionLightboxImg(null)}
          triggerRef={optImgTriggerRef}
        />
      )}
    </article>
  );
}
