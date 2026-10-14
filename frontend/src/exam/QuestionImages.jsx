import { useState, useRef, useEffect } from 'react';
import ImageLightbox from './ImageLightbox';

function SingleQuestionImage({
  image,
  index,
  total,
  soalNomor,
  isEager = true,
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [retryTimestamp, setRetryTimestamp] = useState(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const buttonRef = useRef(null);

  // Reset saat URL gambar berubah
  useEffect(() => {
    setIsLoaded(false);
    setHasError(false);
    setRetryTimestamp(null);
  }, [image.url]);

  const altText = image.alt?.trim() || `Gambar soal nomor ${soalNomor || index + 1}`;
  const effectiveSrc = retryTimestamp
    ? `${image.url}${image.url.includes('?') ? '&' : '?'}r=${retryTimestamp}`
    : image.url;

  const aspectRatio =
    image.lebar && image.tinggi
      ? `${image.lebar} / ${image.tinggi}`
      : '16 / 9';

  const handleRetry = (e) => {
    e.stopPropagation();
    setHasError(false);
    setIsLoaded(false);
    setRetryTimestamp(Date.now());
  };

  return (
    <figure className="ex-image-figure">
      <div
        className="ex-image-container"
        style={{ aspectRatio }}
      >
        {/* Skeleton berdenyut sebelum gambar termuat */}
        {!isLoaded && !hasError && (
          <div
            className="ex-image-skeleton"
            aria-hidden="true"
          />
        )}

        {/* Kotak jika gambar gagal dimuat */}
        {hasError ? (
          <div className="ex-image-error" role="alert">
            <span className="material-symbols-outlined ex-error-icon" aria-hidden="true">
              broken_image
            </span>
            <p className="ex-error-text">Gambar tidak bisa dimuat.</p>
            <button
              type="button"
              className="ex-btn-retry"
              onClick={handleRetry}
            >
              <span className="material-symbols-outlined" aria-hidden="true">
                refresh
              </span>
              Muat ulang
            </button>
          </div>
        ) : (
          <button
            type="button"
            className="ex-image-trigger"
            ref={buttonRef}
            onClick={() => setIsLightboxOpen(true)}
            aria-label={`Perbesar gambar ${index + 1}${total > 1 ? ` dari ${total}` : ''}`}
          >
            <img
              src={effectiveSrc}
              alt={altText}
              className={`ex-image-img ${isLoaded ? 'ex-loaded' : 'ex-loading'}`}
              loading={isEager ? 'eager' : 'lazy'}
              draggable={false}
              onLoad={() => setIsLoaded(true)}
              onError={() => {
                setHasError(true);
                setIsLoaded(false);
              }}
            />
            <span className="ex-image-zoom-badge" aria-hidden="true">
              <span className="material-symbols-outlined">zoom_in</span>
              Klik untuk memperbesar
            </span>
          </button>
        )}
      </div>

      {image.keterangan && (
        <figcaption className="ex-image-caption">
          {image.keterangan}
        </figcaption>
      )}

      {/* Lightbox Modal */}
      <ImageLightbox
        isOpen={isLightboxOpen}
        image={{ ...image, url: effectiveSrc, alt: altText }}
        onClose={() => setIsLightboxOpen(false)}
        triggerRef={buttonRef}
      />
    </figure>
  );
}

export default function QuestionImages({
  gambar = [],
  soalNomor,
  isEager = true,
  className = '',
}) {
  // Soal TANPA gambar: jangan render wadah, jarak, atau placeholder apa pun
  if (!gambar || gambar.length === 0) {
    return null;
  }

  const isMultiple = gambar.length >= 2;

  return (
    <div
      className={`ex-images-wrap ${
        isMultiple ? 'ex-images-grid' : 'ex-images-single'
      } ${className}`}
    >
      {gambar.map((img, idx) => (
        <SingleQuestionImage
          key={img.url || idx}
          image={img}
          index={idx}
          total={gambar.length}
          soalNomor={soalNomor}
          isEager={isEager}
        />
      ))}
    </div>
  );
}
