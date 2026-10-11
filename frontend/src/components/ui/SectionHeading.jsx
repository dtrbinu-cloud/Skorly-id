export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  className = '',
}) {
  const alignClass =
    align === 'center'
      ? 'text-center max-w-xl mx-auto'
      : className
      ? className
      : '';

  return (
    <div className={alignClass}>
      {eyebrow && (
        <span className="font-label-md text-label-md tracking-wide text-primary font-bold">
          {eyebrow}
        </span>
      )}
      <h2 className="font-headline-xl text-headline-xl text-on-surface mt-1">
        {title}
      </h2>
      {description && (
        <p className="font-body-lg text-body-lg text-text-muted mt-2">
          {description}
        </p>
      )}
    </div>
  );
}
