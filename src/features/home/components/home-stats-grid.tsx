import { Card } from '@/shared/ui';
import { homeStatItems } from '@/features/home/config/home-content';

export function HomeStatsGrid() {
  return (
    <section className="relative z-10 -mt-14">
      <div className="section-shell">
        <Card className="overflow-hidden rounded-lg border-white/80 bg-white/96 shadow-[0_22px_70px_rgba(15,23,42,0.16)] backdrop-blur">
          <div className="grid grid-cols-2 gap-0 md:grid-cols-5">
            {homeStatItems.map((stat, index) => {
              const Icon = stat.icon;

              return (
                <div
                  key={stat.label}
                  className={`flex min-h-24 flex-col items-center justify-center gap-2 border-slate-200 px-3 py-4 text-center md:min-h-24 md:border-r md:px-3 ${
                    index < 4 ? 'border-b md:border-b-0' : ''
                  } ${index % 2 === 0 ? 'border-r md:border-r' : 'md:border-r'} last:border-r-0`}
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
