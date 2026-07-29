type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  className?: string;
  backgroundImage?: string;
  backgroundLoading?: 'eager' | 'lazy';
  titleAs?: 'h1' | 'h2';
};

const DEFAULT_PAGE_HERO_BACKGROUND = '/assets/hero/aiadc-intro-competition-bg.webp';

export function PageHero({
  eyebrow,
  title,
  description,
  className = '',
  backgroundImage,
  titleAs = 'h1',
  backgroundLoading = titleAs === 'h1' ? 'eager' : 'lazy',
}: PageHeroProps) {
  const TitleTag = titleAs;
  const resolvedBackgroundImage = backgroundImage ?? DEFAULT_PAGE_HERO_BACKGROUND;

  return (
    <section
      className={`relative flex min-h-72 items-center overflow-hidden py-12 sm:min-h-76 sm:py-14 lg:h-76 lg:min-h-76 lg:py-0 ${className}`.trim()}
    >
      <img
        src={resolvedBackgroundImage}
        alt=""
        aria-hidden="true"
        loading={backgroundLoading}
        decoding={backgroundLoading === 'eager' ? 'sync' : 'async'}
        fetchPriority={backgroundLoading === 'eager' ? 'high' : 'auto'}
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      <div
        className="absolute inset-0 bg-[linear-gradient(120deg,rgba(33,49,131,0.88),rgba(33,49,131,0.74),rgba(33,49,131,0.82))]"
        aria-hidden="true"
      />

      <div className="section-shell relative text-center">
        <div className="section-kicker mx-auto text-white">{eyebrow}</div>
        <TitleTag className="heading-2 mx-auto mt-4 max-w-5xl text-balance text-white">{title}</TitleTag>
        <p className="body-lg mx-auto mt-5 max-w-4xl text-white/82">{description}</p>
      </div>
    </section>
  );
}
