type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  className?: string;
  backgroundImage?: string;
  dark?: boolean;
  fullBleedBackground?: boolean;
  titleAs?: 'h1' | 'h2';
};

export function PageHero({
  eyebrow,
  title,
  description,
  className = '',
  backgroundImage,
  dark = false,
  fullBleedBackground = false,
  titleAs = 'h1',
}: PageHeroProps) {
  const TitleTag = titleAs;

  if (fullBleedBackground && backgroundImage) {
    return (
      <section className={`relative overflow-hidden py-16 sm:py-20 lg:py-24 ${className}`.trim()}>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${backgroundImage})` }}
          aria-hidden="true"
        />
        <div
          className={`absolute inset-0 ${
            dark
              ? 'bg-[linear-gradient(120deg,rgba(33,49,131,0.92),rgba(33,49,131,0.82),rgba(33,49,131,0.86))]'
              : 'bg-[linear-gradient(135deg,rgba(246,245,244,0.9),rgba(255,255,255,0.9),rgba(246,245,244,0.78))] dark:bg-[linear-gradient(120deg,rgba(33,49,131,0.92),rgba(33,49,131,0.82),rgba(33,49,131,0.86))]'
          }`}
          aria-hidden="true"
        />

        <div className="section-shell relative">
          <div className="mx-auto max-w-5xl text-center">
            <div className={`section-kicker mx-auto ${dark ? 'text-white' : 'text-[#0075de] dark:text-white'}`}>{eyebrow}</div>
            <TitleTag className={`mt-4 text-balance heading-2 ${dark ? 'text-white' : 'text-black dark:text-white'}`}>{title}</TitleTag>
            <p className={`mx-auto mt-5 max-w-4xl body-lg ${dark ? 'text-white/82' : 'text-[#31302e] dark:text-white/82'}`}>{description}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`relative overflow-hidden bg-muted py-16 transition-colors duration-300 dark:bg-background sm:py-20 lg:py-24 ${className}`.trim()}>
      {backgroundImage ? (
        <>
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${backgroundImage})` }}
            aria-hidden="true"
          />
          <div
            className={`absolute inset-0 ${
              dark
                ? 'bg-[linear-gradient(120deg,rgba(33,49,131,0.88),rgba(33,49,131,0.74),rgba(33,49,131,0.8))]'
                : 'bg-[linear-gradient(135deg,rgba(246,245,244,0.84),rgba(255,255,255,0.9),rgba(246,245,244,0.8))] dark:bg-[linear-gradient(120deg,rgba(33,49,131,0.9),rgba(33,49,131,0.76),rgba(33,49,131,0.82))]'
            }`}
            aria-hidden="true"
          />
        </>
      ) : null}

      <div className="section-shell relative text-center">
        <div className={`section-kicker mx-auto ${dark ? 'text-white' : 'text-[#0075de] dark:text-white'}`}>{eyebrow}</div>
        <TitleTag className={`mx-auto mt-4 max-w-5xl text-balance heading-2 ${dark ? 'text-white' : 'text-black dark:text-white'}`}>{title}</TitleTag>
        <p className={`mx-auto mt-6 max-w-4xl text-sm leading-8 ${dark ? 'text-white/82' : 'text-[#31302e] dark:text-white/82'} sm:text-[17px] sm:leading-8 lg:text-[19px] lg:leading-9`}>{description}</p>
      </div>
    </section>
  );
}
