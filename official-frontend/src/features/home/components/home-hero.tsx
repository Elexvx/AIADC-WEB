'use client';

import { Network, UserPlus } from 'lucide-react';
import { ROUTES } from '@/shared/config/routes';
import { getSectionItems } from '@/shared/content';
import { usePageContent } from '@/shared/i18n/locale-provider';
import { Button, InternalLink } from '@/shared/ui';

export function HomeHero() {
  const page = usePageContent('home');
  const heroSlides = getSectionItems(page, 'heroSlides');
  const currentHero = heroSlides[0];

  if (!currentHero) {
    return null;
  }

  const titleLines = String(currentHero.title).split('\n').filter(Boolean);
  const secondaryAction = currentHero.extra?.secondaryAction as { label?: string; href?: string } | undefined;

  return (
    <section id="top" className="relative overflow-hidden bg-white text-slate-950">
      <div className="absolute inset-x-0 top-0 h-px bg-slate-100" />
      <div className="pointer-events-none absolute right-0 top-0 hidden h-full w-[52%] bg-[radial-gradient(circle_at_65%_30%,rgba(219,234,254,0.78),rgba(255,255,255,0)_54%)] lg:block" />

      <div className="section-shell relative grid min-h-[500px] items-center gap-8 py-9 sm:py-11 lg:min-h-[530px] lg:grid-cols-[minmax(0,0.92fr)_minmax(36rem,1.08fr)] lg:py-10">
        <div className="relative z-10 max-w-4xl">
          <h1 className="break-all font-sans text-[clamp(2rem,8.2vw,4.8rem)] font-semibold leading-[1.12] tracking-[0.02em] text-[#082656] sm:break-normal">
            {titleLines.length > 0
              ? titleLines.map((line) => (
                  <span key={line} className="block sm:whitespace-nowrap">
                    {line}
                  </span>
                ))
              : currentHero.title}
          </h1>

          <p className="mt-7 max-w-full break-all text-base font-medium leading-7 tracking-wide text-slate-600 sm:max-w-2xl sm:break-normal sm:text-xl sm:leading-8">{currentHero.subtitle}</p>

          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <Button asChild size="lg" className="h-14 rounded-md bg-[#082f6f] px-8 text-base font-bold !text-white shadow-[0_14px_28px_rgba(8,47,111,0.20)] hover:bg-[#06275d]">
              <InternalLink href={currentHero.cta?.href ?? ROUTES.login} className="inline-flex items-center gap-2 !text-white">
                <UserPlus className="h-5 w-5 !text-white" />
                {currentHero.cta?.label ?? '立即报名'}
              </InternalLink>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-14 rounded-md border-[#082f6f]/40 bg-white px-8 text-base font-bold text-[#082f6f] hover:bg-blue-50">
              <InternalLink href={secondaryAction?.href ?? ROUTES.login} className="inline-flex items-center gap-2 text-[#082f6f]">
                <Network className="h-5 w-5" />
                {secondaryAction?.label ?? '参赛入口'}
              </InternalLink>
            </Button>
          </div>
        </div>

        <div className="relative min-h-[300px] lg:min-h-[420px]">
          <img
            src={currentHero.imageUrl ?? '/assets/aiadc-hero-visual-transparent.png'}
            alt={String(currentHero.extra?.alt ?? '智能应用开发大赛场景插画')}
            className="absolute left-1/2 top-1/2 w-[min(100%,46rem)] -translate-x-1/2 -translate-y-1/2 object-contain sm:w-[44rem] lg:left-[52%] lg:w-[56rem]"
          />
        </div>
      </div>
    </section>
  );
}
