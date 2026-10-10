export default function Icon({
  name,
  className = '',
  filled = false,
  'aria-hidden': ariaHidden = true,
}) {
  return (
    <span
      className={`material-symbols-outlined select-none ${className}`}
      aria-hidden={ariaHidden}
      style={filled ? { fontVariationSettings: "'FILL' 1" } : undefined}
    >
      {name}
    </span>
  );
}
