'use client';

import { ChevronLeft, ChevronRight, Network, UserPlus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { ROUTES } from '@/lib/config/routes';
import { getSectionItems } from '@/lib/content/utils';
import { usePageContent } from '@/lib/i18n/locale-provider';
import { Button, InternalLink } from '@/components/ui';

const carouselIntervalMs = 8000;
const carouselWarmupDelayMs = 1200;

type HeroSlideExtra = {
  alt?: string;
  secondaryAction?: {
    label?: string;
    href?: string;
  };
  variant?: string;
};

function getSlideExtra(slide: { extra?: unknown }): HeroSlideExtra {
  return (slide.extra ?? {}) as HeroSlideExtra;
}

export function HomeHero() {
  const page = usePageContent('home');
  const heroSlides = getSectionItems(page, 'heroSlides');
  const [activeIndex, setActiveIndex] = useState(0);
  const [renderedSlideIndexes, setRenderedSlideIndexes] = useState<Set<number>>(() => new Set([0]));
  const currentHero = heroSlides[activeIndex] ?? heroSlides[0];

  useEffect(() => {
    if (heroSlides.length < 2) {
      return;
    }

    const warmupTimer = window.setTimeout(() => {
      setRenderedSlideIndexes((indexes) => {
        const nextIndexes = new Set(indexes);
        nextIndexes.add((activeIndex + 1) % heroSlides.length);
        return nextIndexes;
      });
    }, carouselWarmupDelayMs);

    return () => window.clearTimeout(warmupTimer);
  }, [activeIndex, heroSlides.length]);

  useEffect(() => {
    if (heroSlides.length < 2) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % heroSlides.length);
    }, carouselIntervalMs);

    return () => window.clearInterval(timer);
  }, [heroSlides.length]);

  useEffect(() => {
    setRenderedSlideIndexes((indexes) => {
      if (indexes.has(activeIndex)) {
        return indexes;
      }

      const nextIndexes = new Set(indexes);
      nextIndexes.add(activeIndex);
      return nextIndexes;
    });
  }, [activeIndex]);

  if (!currentHero) {
    return null;
  }

  const currentExtra = getSlideExtra(currentHero);
  const isImageOnlySlide = currentExtra.variant === 'image-only';
  const secondaryAction = currentExtra.secondaryAction;
  const titleLines = String(currentHero.title).split('\n').filter(Boolean);

  const showPreviousSlide = () => {
    setActiveIndex((index) => (index - 1 + heroSlides.length) % heroSlides.length);
  };

  const showNextSlide = () => {
    setActiveIndex((index) => (index + 1) % heroSlides.length);
  };

  return (
    <section id="top" className="relative overflow-hidden bg-[#dfeeff] text-white transition-colors duration-300">
      <div
        className="relative min-h-[430px] overflow-hidden sm:min-h-[520px] lg:min-h-[560px] xl:min-h-[620px]"
        data-active-slide={activeIndex}
        data-active-slide-id={currentHero.id}
      >
        {heroSlides.map((slide, index) => {
          if (!renderedSlideIndexes.has(index)) {
            return null;
          }

          const slideExtra = getSlideExtra(slide);
          const slideIsImageOnly = slideExtra.variant === 'image-only';
          const isActiveSlide = index === activeIndex;

          return (
            <img
              key={slide.id}
              src={slide.imageUrl ?? '/assets/aiadc-hero-visual.png'}
              alt={String(slideExtra.alt ?? 'AIADC carousel image')}
              aria-hidden={!isActiveSlide}
              decoding="async"
              fetchPriority={isActiveSlide ? 'high' : 'low'}
              loading={isActiveSlide ? 'eager' : 'lazy'}
              className={`absolute object-center transition-opacity duration-700 ease-out ${
                slideIsImageOnly
                  ? 'left-1/2 top-1/2 h-[84%] w-[92%] -translate-x-1/2 -translate-y-1/2 object-contain sm:h-[86%] sm:w-[90%] lg:h-[88%] lg:w-[88%]'
                  : 'inset-0 h-full w-full object-cover'
              } ${isActiveSlide ? 'opacity-100' : 'opacity-0'}`}
            />
          );
        })}

        {!isImageOnlySlide ? (
          <>
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(21,54,122,0.56)_0%,rgba(25,88,169,0.36)_44%,rgba(25,88,169,0.16)_74%,rgba(25,88,169,0.08)_100%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(21,54,122,0.12)_0%,rgba(21,54,122,0)_42%,rgba(21,54,122,0.20)_100%)]" />
          </>
        ) : null}

        {!isImageOnlySlide ? (
          <div className="section-shell relative z-10 flex min-h-[430px] items-center justify-center px-6 py-14 text-center sm:min-h-[520px] lg:min-h-[580px] xl:min-h-[640px]">
            <div className="mx-auto max-w-[820px]">
              <h1 className="text-[2.75rem] font-bold leading-none text-white transition-colors duration-300 sm:text-[4rem] lg:text-[4.75rem]">
                {titleLines.length > 0
                  ? titleLines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))
                  : currentHero.title}
              </h1>

              <p className="mx-auto mt-6 max-w-3xl text-sm leading-8 text-white/86 transition-colors duration-300 sm:text-[17px] sm:leading-8 lg:text-[19px] lg:leading-9">
                {currentHero.subtitle}
              </p>

              <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
                <Button asChild size="lg" className="h-12 rounded-full bg-[#0075de] px-8 text-base font-medium !text-white hover:bg-[#005bab]">
                  <InternalLink href={currentHero.cta?.href ?? ROUTES.login} className="inline-flex items-center gap-2 !text-white">
                    <UserPlus className="h-5 w-5 !text-white" />
                    {currentHero.cta?.label ?? 'Register'}
                  </InternalLink>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="hero-secondary-action h-12 rounded-full px-8 text-base font-semibold shadow-[rgba(0,0,0,0.12)_0_8px_28px]"
                >
                  <InternalLink href={secondaryAction?.href ?? ROUTES.login} className="inline-flex items-center gap-2">
                    <Network className="h-5 w-5" />
                    {secondaryAction?.label ?? 'Competition Entry'}
                  </InternalLink>
                </Button>
              </div>
            </div>
          </div>
        ) : null}

        {heroSlides.length > 1 ? (
          <>
            <button
              type="button"
              aria-label="Previous slide"
              data-carousel-action="previous"
              onClick={showPreviousSlide}
              className="absolute left-5 top-1/2 z-20 hidden h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-black/5 text-white backdrop-blur-sm transition active:scale-90 lg:grid"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label="Next slide"
              data-carousel-action="next"
              onClick={showNextSlide}
              className="absolute right-5 top-1/2 z-20 hidden h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-black/5 text-white backdrop-blur-sm transition active:scale-90 lg:grid"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
            <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2">
              {heroSlides.map((slide, index) => (
                <button
                  key={slide.id}
                  type="button"
                  aria-label={`Go to slide ${index + 1}`}
                  data-carousel-dot={index}
                  onClick={() => setActiveIndex(index)}
                  className={`h-2.5 rounded-full transition-all ${index === activeIndex ? 'w-8 bg-white' : 'w-2.5 bg-white/38'}`}
                />
              ))}
            </div>
          </>
        ) : null}
      </div>
    </section>
  );
}
