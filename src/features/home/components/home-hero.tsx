'use client';

import { useEffect, useState } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { ROUTES } from '@/shared/config/routes';
import { getSectionItems } from '@/shared/content';
import { usePageContent } from '@/shared/i18n/locale-provider';
import { Button, InternalLink } from '@/shared/ui';

function highlightAccent(text: string, accent: string) {
  const [before, ...afterParts] = text.split(accent);
  const after = afterParts.join(accent);

  return (
    <>
      {before}
      <span className="text-cyan-300">{accent}</span>
      {after}
    </>
  );
}

export function HomeHero() {
  const page = usePageContent('home');
  const heroSlides = getSectionItems(page, 'heroSlides');
  const [activeHero, setActiveHero] = useState(0);
  const currentHero = heroSlides[activeHero];

  useEffect(() => {
    if (heroSlides.length === 0) {
      return;
    }
    const timer = window.setInterval(() => {
      setActiveHero((current) => (current + 1) % heroSlides.length);
    }, 5200);

    return () => window.clearInterval(timer);
  }, [heroSlides.length]);

  function showHero(index: number) {
    setActiveHero((index + heroSlides.length) % heroSlides.length);
  }

  if (!currentHero) {
    return null;
  }

  return (
    <section id="top" className="relative bg-[#07172d] text-white">
      <div className="absolute inset-0">
        {heroSlides.map((slide, index) => (
          <img
            key={slide.id}
            src={slide.imageUrl}
            alt={String(slide.extra?.alt ?? slide.title)}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${index === activeHero ? 'opacity-62' : 'opacity-0'}`}
          />
        ))}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,16,36,0.96)_0%,rgba(4,16,36,0.78)_42%,rgba(4,16,36,0.28)_78%,rgba(4,16,36,0.34)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#07172d] to-transparent" />
      </div>

      <div className="section-shell relative grid min-h-[650px] items-center pt-10 sm:min-h-[690px]">
        <div className="max-w-3xl pb-28 pt-10">
          <div className="mb-8 flex flex-wrap items-center gap-4 text-sm font-semibold text-cyan-200">
            {(currentHero.tags ?? []).map((tag: string, index: number) => (
              <span key={tag} className="contents">
                {index > 0 ? <span className="h-1 w-1 rounded-full bg-cyan-300" /> : null}
                <span className="tracking-[0.22em]">{tag}</span>
              </span>
            ))}
          </div>

          <h1 className="text-balance text-4xl font-black leading-[1.08] tracking-[-0.05em] text-white sm:text-6xl sm:tracking-[-0.07em] lg:text-7xl">
            {currentHero.title}
            <span className="block">{highlightAccent(currentHero.subtitle ?? '', String(currentHero.extra?.accent ?? ''))}</span>
          </h1>

          <p className="mt-7 max-w-2xl text-base leading-8 text-slate-200 sm:text-lg sm:leading-9">{currentHero.description}</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
            <Button asChild size="lg" className="rounded-md bg-blue-600 px-8 text-base text-white shadow-[0_18px_40px_rgba(37,99,235,0.36)] hover:bg-blue-500 sm:px-9">
              <InternalLink href={currentHero.cta?.href ?? ROUTES.login} className="inline-flex items-center gap-3">
                {currentHero.cta?.label ?? '立即报名'}
                <ArrowRight className="h-5 w-5" />
              </InternalLink>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-md border-white/30 bg-white/4 px-8 text-base text-white hover:bg-white/12 sm:px-9">
              <InternalLink href={ROUTES.intro} className="inline-flex items-center gap-3">
                了解赛事
                <ArrowRight className="h-5 w-5" />
              </InternalLink>
            </Button>
          </div>

        </div>

        <div className="absolute bottom-20 right-0 hidden items-center gap-3 lg:flex">
          <button type="button" onClick={() => showHero(activeHero - 1)} className="grid h-11 w-11 place-items-center rounded-full border border-white/24 bg-white/8 text-white transition-colors hover:bg-white/14" aria-label="上一张">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button type="button" onClick={() => showHero(activeHero + 1)} className="grid h-11 w-11 place-items-center rounded-full border border-white/24 bg-white/8 text-white transition-colors hover:bg-white/14" aria-label="下一张">
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        <div className="absolute bottom-9 left-0 flex gap-2">
          {heroSlides.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              onClick={() => showHero(index)}
              className={`h-2.5 rounded-full transition-all ${index === activeHero ? 'w-9 bg-cyan-300' : 'w-2.5 bg-white/38 hover:bg-white/62'}`}
              aria-label={`切换到第 ${index + 1} 张`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
