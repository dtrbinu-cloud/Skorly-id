import { useEffect, useRef, useState } from 'react';

export default function ImageLightbox({
  isOpen,
  image,
  onClose,
  triggerRef,
}) {
  const [zoom, setZoom] = useState(1);
  const modalRef = useRef(null);
  const closeBtnRef = useRef(null);

  // Reset zoom saat gambar dibuka
  useEffect(() => {
    if (isOpen) {
      setZoom(1);
    }
  }, [isOpen]);

  // Kelola fokus dan keyboard shortcut (Esc, Focus trap)
  useEffect(() => {
    if (!isOpen) return;

    // Simpan elemen yang aktif sebelum modal terbuka
    const prevFocused = triggerRef?.current || document.activeElement;

    // Fokuskan tombol tutup saat dialog terbuka
    const timer = setTimeout(() => {
      closeBtnRef.current?.focus();
    }, 50);

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

      // Jebakan fokus (focus trap)
      if (e.key === 'Tab' && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll(
          'button:not([disabled]), [tabindex="0"]'
        );
        if (focusable.length === 0) return;

        const firstElement = focusable[0];
        const lastElement = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Kunci scroll halaman saat lightbox aktif
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
      // Kembalikan fokus ke elemen pemicu
      if (prevFocused && typeof prevFocused.focus === 'function') {
        prevFocused.focus();
      }
    };
  }, [isOpen, onClose, triggerRef]);

  if (!isOpen || !image) return null;

  const handleZoomIn = () => {
    setZoom((z) => Math.min(3, Math.round((z + 0.5) * 10) / 10));
  };

  const handleZoomOut = () => {
    setZoom((z) => Math.max(1, Math.round((z - 0.5) * 10) / 10));
  };

  const handleResetZoom = () => {
    setZoom(1);
  };

  return (
    <div
      className="ex-lightbox-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={image.alt || 'Perbesar gambar'}
      ref={modalRef}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="ex-lightbox-toolbar">
        <div className="ex-lightbox-zoom-controls">
          <button
            type="button"
            className="ex-lightbox-btn"
            onClick={handleZoomOut}
            disabled={zoom <= 1}
            aria-label="Perkecil gambar"
            title="Perkecil (-)"
          >
            <span className="material-symbols-outlined" aria-hidden="true">
              remove
            </span>
          </button>
          <span className="ex-lightbox-zoom-val">{Math.round(zoom * 100)}%</span>
          <button
            type="button"
            className="ex-lightbox-btn"
            onClick={handleZoomIn}
            disabled={zoom >= 3}
            aria-label="Perbesar gambar"
            title="Perbesar (+)"
          >
            <span className="material-symbols-outlined" aria-hidden="true">
              add
            </span>
          </button>
          {zoom > 1 && (
            <button
              type="button"
              className="ex-lightbox-btn ex-lightbox-reset"
              onClick={handleResetZoom}
              aria-label="Kembalikan ukuran normal"
            >
              Reset
            </button>
          )}
        </div>

        <button
          type="button"
          className="ex-lightbox-btn ex-lightbox-close"
          onClick={onClose}
          ref={closeBtnRef}
          aria-label="Tutup pratinjau gambar"
        >
          <span className="material-symbols-outlined" aria-hidden="true">
            close
          </span>
          <span className="ex-lightbox-close-text">Tutup (Esc)</span>
        </button>
      </div>

      <div className="ex-lightbox-content">
        <div
          className="ex-lightbox-img-wrapper"
          style={{
            transform: `scale(${zoom})`,
            transition: 'transform 0.2s ease-out',
            cursor: zoom > 1 ? 'grab' : 'default',
          }}
        >
          <img
            src={image.url}
            alt={image.alt || 'Gambar soal'}
            className="ex-lightbox-img"
            draggable={false}
          />
        </div>
        {image.keterangan && (
          <p className="ex-lightbox-caption">{image.keterangan}</p>
        )}
      </div>
    </div>
  );
}
