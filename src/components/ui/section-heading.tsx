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
      <div className={`section-kicker ${dark ? 'text-white' : 'text-[#0075de]'}`}>{eyebrow}</div>
      <h2
        className={`text-balance heading-2 ${
          dark ? 'text-white' : 'text-black'
        }`}
      >
        {title}
      </h2>
      {description ? (
        <p className={`max-w-3xl body-lg ${dark ? 'text-white/82' : 'text-[#31302e]'}`}>{description}</p>
      ) : null}
    </div>
  );
}
