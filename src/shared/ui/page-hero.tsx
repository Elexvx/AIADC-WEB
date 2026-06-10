type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  className?: string;
};

export function PageHero({ eyebrow, title, description, className = '' }: PageHeroProps) {
  return (
    <section className="bg-white py-10 sm:py-12">
      <div className={`section-shell rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_16px_42px_rgba(15,23,42,0.07)] sm:p-8 lg:p-10 ${className}`.trim()}>
        <div className="mx-auto max-w-5xl text-center">
          <div className="section-kicker mx-auto text-blue-600">{eyebrow}</div>
          <h1 className="mt-4 text-balance text-3xl font-black tracking-[-0.06em] text-slate-950 sm:text-4xl lg:text-5xl">{title}</h1>
          <p className="mx-auto mt-5 max-w-4xl text-base leading-8 text-slate-600 sm:text-lg sm:leading-9">{description}</p>
        </div>
      </div>
    </section>
  );
}
