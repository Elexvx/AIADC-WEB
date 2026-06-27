'use client';

import { useEffect, useRef, useState } from 'react';
import { Card } from '@/components/ui';
import { getSectionItems } from '@/lib/content/utils';
import { usePageContent } from '@/lib/i18n/locale-provider';

function AnimatedNumber({ value }: { value: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [displayValue, setDisplayValue] = useState(value.replace(/\d+/g, '0'));

  useEffect(() => {
    const node = ref.current;
    const match = value.match(/^(\D*)(\d+)(.*)$/);

    if (!node || !match || typeof window === 'undefined') {
      setDisplayValue(value);
      return;
    }

    const [, prefix, rawNumber, suffix] = match;
    const target = Number(rawNumber);
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const stableOnMobile = window.matchMedia('(max-width: 640px)').matches;

    if (!Number.isFinite(target) || reducedMotion || stableOnMobile || !('IntersectionObserver' in window)) {
      setDisplayValue(value);
      return;
    }

    let frameId = 0;
    let hasPlayed = false;
    const duration = 1450;

    const play = () => {
      if (hasPlayed) return;
      hasPlayed = true;
      const startedAt = performance.now();

      const tick = (now: number) => {
        const progress = Math.min((now - startedAt) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(target * eased);

        setDisplayValue(`${prefix}${current}${suffix}`);

        if (progress < 1) {
          frameId = requestAnimationFrame(tick);
        } else {
          setDisplayValue(value);
        }
      };

      frameId = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          play();
          observer.disconnect();
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.35 },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frameId);
    };
  }, [value]);

  return (
    <div
      ref={ref}
      data-stat-value={value}
      aria-label={value}
      className="inline-block text-center text-[2.15rem] font-bold leading-none text-[#0075de] tabular-nums transition-colors duration-300 sm:text-[2.6rem] lg:text-[2.85rem]"
      style={{ minWidth: `${value.length}ch`, fontVariantNumeric: 'tabular-nums' }}
    >
      {displayValue}
    </div>
  );
}

export function HomeStatsGrid() {
  const page = usePageContent('home');
  const stats = getSectionItems(page, 'stats');

  return (
    <section className="relative z-10 -mt-10 pb-2 lg:-mt-14">
      <div className="section-shell">
        <Card className="notion-card-elevated overflow-hidden backdrop-blur transition-colors duration-300">
          <div className="grid grid-cols-2 gap-0 md:grid-cols-4">
            {stats.map((stat, index) => {
              const isLeftColumnOnMobile = index % 2 === 0;
              const isTopRowOnMobile = index < 2;
              const isLastDesktopColumn = index === stats.length - 1;

              return (
                <div
                  key={stat.label}
                  className={`flex min-h-[118px] min-w-0 flex-col items-center justify-center gap-3 border-[#e6e6e6] px-3 py-5 text-center md:min-h-[124px] md:px-4 ${
                    isTopRowOnMobile ? 'border-b' : ''
                  } ${isLeftColumnOnMobile ? 'border-r' : ''} ${
                    isLastDesktopColumn ? 'md:border-r-0' : 'md:border-r'
                  } md:border-b-0`}
                >
                  <div className="flex min-w-0 flex-col items-center justify-center gap-2">
                    <AnimatedNumber value={stat.value} />
                    <div className="text-sm font-medium text-[#615d59] transition-colors duration-300 sm:text-[15px]">{stat.label}</div>
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
