'use client';

import { Card } from '@/shared/ui';
import { getSectionItems, resolveIcon } from '@/shared/content';
import { usePageContent } from '@/shared/i18n/locale-provider';

function AnimatedNumber({ value }: { value: string }) {
  return (
    <div className="text-2xl font-bold text-slate-950 sm:text-3xl">
      {value}
    </div>
  );
}

export function HomeStatsGrid() {
  const page = usePageContent('home');
  const stats = getSectionItems(page, 'stats');

  return (
    <section className="relative z-10 -mt-8 lg:-mt-10">
      <div className="section-shell">
        <Card className="overflow-hidden rounded-lg border-slate-200/80 bg-white shadow-[0_14px_36px_rgba(15,23,42,0.08)] backdrop-blur">
          <div className="grid grid-cols-2 gap-0 md:grid-cols-4">
            {stats.map((stat, index) => {
              const Icon = resolveIcon(stat.iconKey);
              const isLeftColumnOnMobile = index % 2 === 0;
              const isTopRowOnMobile = index < 2;
              const isLastDesktopColumn = index === stats.length - 1;

              return (
                <div
                  key={stat.label}
                  className={`flex min-h-24 min-w-0 flex-col items-center justify-center gap-2 border-slate-200 px-3 py-4 text-center md:min-h-24 md:px-3 ${
                    isTopRowOnMobile ? 'border-b' : ''
                  } ${isLeftColumnOnMobile ? 'border-r' : ''} ${
                    isLastDesktopColumn ? 'md:border-r-0' : 'md:border-r'
                  } md:border-b-0`}
                >
                  <div className="flex min-w-0 items-center justify-center gap-3 sm:gap-4">
                    <Icon className="h-8 w-8 shrink-0 stroke-[1.7] text-[#0b438f] sm:h-9 sm:w-9" />
                    <div className="min-w-0 text-left">
                      <div className="text-xs font-medium text-slate-500 sm:text-sm">{stat.label}</div>
                      <AnimatedNumber value={stat.value} />
                    </div>
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
