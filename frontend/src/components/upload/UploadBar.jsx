/**
 * UploadBar — sticky bottom action bar with CTA button and helper text.
 */
import Icon from '../ui/Icon';

export default function UploadBar({
  phase,
  disabled,
  hintText,
  hintId,
  onAction,
  onCancel,
}) {
  let ctaLabel;
  let ctaIcon = null;

  if (phase === 'proc') {
    ctaLabel = 'Memproses…';
  } else if (phase === 'done') {
    ctaLabel = 'Periksa soal';
    ctaIcon = <Icon name="arrow_forward" />;
  } else {
    ctaLabel = 'Buat soal dari berkas';
    ctaIcon = <Icon name="arrow_forward" />;
  }

  return (
    <div className="up-bar">
      <div className="up-bar-inner">
        <button
          type="button"
          className="up-tbtn up-bar-cancel"
          onClick={onCancel}
        >
          Batal
        </button>
        <div className="up-bar-right">
          {/* Show hint on all screen sizes — on mobile as text above the button */}
          {hintText && (
            <span className="up-bar-hint" id={hintId}>
              {hintText}
            </span>
          )}
          <button
            type="button"
            className="up-btn up-btn--amber up-bar-cta"
            disabled={disabled}
            onClick={onAction}
            aria-describedby={hintText ? hintId : undefined}
          >
            {ctaLabel}
            {ctaIcon}
          </button>
        </div>
      </div>
    </div>
  );
}
