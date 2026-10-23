/**
 * JenisPicker — radio group for selecting kegiatan type (Tugas harian / Ulangan / Ujian).
 */
import Icon from '../ui/Icon';

const JENIS_OPTIONS = [
  { value: 'tugas', icon: 'assignment', label: 'Tugas harian', desc: 'Sebelum tenggat' },
  { value: 'ulangan', icon: 'timer', label: 'Ulangan', desc: 'Dengan timer' },
  { value: 'ujian', icon: 'school', label: 'Ujian', desc: 'PTS dan PAS', disabled: true },
];

export default function JenisPicker({ value, onChange }) {
  return (
    <div className="up-tiles" role="radiogroup" aria-label="Jenis kegiatan">
      {JENIS_OPTIONS.map((opt) =>
        opt.disabled ? (
          <div
            key={opt.value}
            className="up-tile up-tile--off"
            aria-disabled="true"
          >
            <span className="up-tile-in">
              <span className="up-tile-ico">
                <Icon name={opt.icon} />
              </span>
              <b>{opt.label}</b>
              <small>{opt.desc}</small>
              <span className="up-tile-soon">Segera</span>
            </span>
          </div>
        ) : (
          <label key={opt.value} className="up-tile">
            <input
              type="radio"
              name="jenis"
              value={opt.value}
              className="up-sr-only"
              checked={value === opt.value}
              onChange={() => onChange(opt.value)}
            />
            <span className="up-tile-in">
              <span className="up-tile-ico">
                <Icon name={opt.icon} />
              </span>
              <b>{opt.label}</b>
              <small>{opt.desc}</small>
              <span className="up-tile-tick">
                <Icon name="check" className="up-tile-tick-icon" />
              </span>
            </span>
          </label>
        )
      )}
    </div>
  );
}
