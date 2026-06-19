type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  centered?: boolean;
  dark?: boolean;
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  centered = false,
  dark = false,
  className = '',
}: SectionHeadingProps) {
  return (
    <div className={`flex flex-col gap-3 ${centered ? 'items-center text-center' : ''} ${className}`.trim()}>
      <div className={`section-kicker ${dark ? 'text-cyan-200' : 'text-blue-600'}`}>{eyebrow}</div>
      <h2
        className={`text-balance heading-2 ${
          dark ? 'text-white' : 'text-slate-950'
        }`}
      >
        {title}
      </h2>
      {description ? (
        <p className={`max-w-3xl body-lg ${dark ? 'text-slate-300' : 'text-slate-600'}`}>{description}</p>
      ) : null}
    </div>
  );
}
