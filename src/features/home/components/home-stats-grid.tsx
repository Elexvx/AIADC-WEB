import { Card } from '@/shared/ui';
import { getSectionItems, resolveIcon } from '@/shared/content';
import { usePageContent } from '@/shared/i18n/locale-provider';

export function HomeStatsGrid() {
  const page = usePageContent('home');
  const stats = getSectionItems(page, 'stats');

  return (
    <section className="relative z-10 -mt-14">
      <div className="section-shell">
        <Card className="overflow-hidden rounded-lg border-white/80 bg-white/96 shadow-none backdrop-blur">
          <div className="grid grid-cols-2 gap-0 md:grid-cols-4">
            {stats.map((stat, index) => {
              const Icon = resolveIcon(stat.iconKey);
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
                  <span className="grid h-9 w-9 place-items-center rounded-lg bg-blue-50 text-blue-600 ring-1 ring-blue-100">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <div className="text-xl font-black leading-none tracking-[-0.05em] text-slate-950 sm:text-2xl md:text-3xl">{stat.value}</div>
                    <div className="mt-1.5 text-sm font-semibold text-slate-500">{stat.label}</div>
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
