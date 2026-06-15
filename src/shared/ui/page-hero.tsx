type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  className?: string;
  backgroundImage?: string;
  dark?: boolean;
  fullBleedBackground?: boolean;
};

export function PageHero({
  eyebrow,
  title,
  description,
  className = '',
  backgroundImage,
  dark = false,
  fullBleedBackground = false,
}: PageHeroProps) {
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
              ? 'bg-[linear-gradient(135deg,rgba(10,10,16,0.85),rgba(20,20,35,0.75),rgba(15,15,25,0.80))]'
              : 'bg-[linear-gradient(135deg,rgba(255,255,255,0.76),rgba(239,246,255,0.82),rgba(219,234,254,0.72))]'
          }`}
          aria-hidden="true"
        />

        <div className="section-shell relative">
          <div className="mx-auto max-w-5xl text-center">
            <div className={`section-kicker mx-auto ${dark ? 'text-cyan-200' : 'text-blue-600'}`}>{eyebrow}</div>
            <h1
              className={`mt-4 text-balance heading-1 ${
                dark ? 'text-white' : 'text-slate-950'
              }`}
            >
              {title}
            </h1>
            <p
              className={`mx-auto mt-5 max-w-4xl body-lg ${
                dark ? 'text-slate-100/92' : 'text-slate-600'
              }`}
            >
              {description}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white py-10 sm:py-12">
      <div
        className={`section-shell relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 lg:p-10 ${className}`.trim()}
      >
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
                  ? 'bg-[linear-gradient(135deg,rgba(15,23,42,0.78),rgba(30,64,175,0.58),rgba(8,47,73,0.72))]'
                  : 'bg-[linear-gradient(135deg,rgba(255,255,255,0.76),rgba(239,246,255,0.82),rgba(219,234,254,0.72))]'
              }`}
              aria-hidden="true"
            />
          </>
        ) : null}

        <div className="relative mx-auto max-w-5xl text-center">
          <div className={`section-kicker mx-auto ${dark ? 'text-cyan-200' : 'text-blue-600'}`}>{eyebrow}</div>
          <h1
            className={`mt-4 text-balance heading-1 ${
              dark ? 'text-white' : 'text-slate-950'
            }`}
          >
            {title}
          </h1>
          <p
            className={`mx-auto mt-5 max-w-4xl body-lg ${
              dark ? 'text-slate-100/92' : 'text-slate-600'
            }`}
          >
            {description}
          </p>
        </div>
      </div>
    </section>
  );
}
