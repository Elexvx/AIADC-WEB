'use client';

import { useEffect, useRef, useState } from 'react';
import { Card } from '@/shared/ui';
import { getSectionItems } from '@/shared/content';
import { usePageContent } from '@/shared/i18n/locale-provider';

function parseValue(value: string): { num: number; suffix: string } {
  const match = value.match(/^(\d+)(.*)$/);
  if (!match) return { num: 0, suffix: value };
  return { num: parseInt(match[1], 10), suffix: match[2] };
}

function AnimatedNumber({ value }: { value: string }) {
  const [display, setDisplay] = useState('0');
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const { num, suffix } = parseValue(value);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 1500;
          const startTime = performance.now();

          function tick(now: number) {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // easeOutExpo
            const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            setDisplay(Math.round(eased * num).toString() + suffix);
            if (progress < 1) requestAnimationFrame(tick);
          }
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="text-3xl font-bold text-slate-950">
      {display}
    </div>
  );
}

export function HomeStatsGrid() {
  const page = usePageContent('home');
  const stats = getSectionItems(page, 'stats');

  return (
    <section className="relative z-10 -mt-14">
      <div className="section-shell">
        <Card className="overflow-hidden rounded-lg border-white/80 bg-white/96 shadow-none backdrop-blur">
          <div className="grid grid-cols-2 gap-0 md:grid-cols-4">
            {stats.map((stat, index) => {
              const isLeftColumnOnMobile = index % 2 === 0;
              const isTopRowOnMobile = index < 2;
              const isLastDesktopColumn = index === stats.length - 1;

              return (
                <div
                  key={stat.label}
                  className={`flex min-h-24 flex-col items-center justify-center gap-2 border-slate-200 px-3 py-4 text-center md:min-h-24 md:px-3 ${
                    isTopRowOnMobile ? 'border-b' : ''
                  } ${isLeftColumnOnMobile ? 'border-r' : ''} ${
                    isLastDesktopColumn ? 'md:border-r-0' : 'md:border-r'
                  } md:border-b-0`}
                >
                  <div>
                    <AnimatedNumber value={stat.value} />
                    <div className="mt-1.5 text-xs font-medium text-slate-500">{stat.label}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </section>
  );
}
