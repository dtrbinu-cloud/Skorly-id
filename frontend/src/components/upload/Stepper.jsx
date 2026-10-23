/**
 * Stepper — 3-step progress indicator for the "Buat ruang" flow.
 * Steps: 1. Unggah, 2. Periksa, 3. Atur
 */
import Icon from '../ui/Icon';

const STEPS = [
  { label: 'Unggah' },
  { label: 'Periksa' },
  { label: 'Atur' },
];

export default function Stepper({ current = 0 }) {
  return (
    <ol className="up-stepper" aria-label="Langkah pembuatan ruang">
      {STEPS.map((step, i) => {
        const isDone = i < current;
        const isOn = i === current;
        let cls = 'up-step';
        if (isDone) cls += ' up-step--done';
        else if (isOn) cls += ' up-step--on';

        return (
          <li key={i}>
            {i > 0 && <span className="up-step-line" aria-hidden="true" />}
            <span
              className={cls}
              {...(isOn ? { 'aria-current': 'step' } : {})}
            >
              <span className="up-step-num">
                {isDone ? (
                  <Icon name="check" filled className="up-step-check-icon" />
                ) : (
                  i + 1
                )}
              </span>
              <span className="up-step-label">
                {step.label}
              </span>
            </span>
          </li>
        );
      })}
    </ol>
  );
}
