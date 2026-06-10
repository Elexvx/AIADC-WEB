import { CalendarDays } from 'lucide-react';
import { siteContent } from '@/entities/site';
import { Badge, Card, CardContent } from '@/shared/ui';
import { SiteFooter, SiteHeader } from '@/widgets/site-shell';

const eventLinks = [
  { label: '大赛简介', href: '/intro' },
  { label: '赛事安排', href: '/schedule' },
  { label: '奖项设置', href: '/awards' },
  { label: '赛区设置', href: '/tracks' },
];

export const metadata = {
  title: '赛事安排',
  description: '全国大学生智能应用开发大赛赛事安排。',
};

function ScheduleCard({ item }: { item: (typeof siteContent.schedule)[number] }) {
  return (
    <Card className="rounded-lg border-white bg-white/96 shadow-[0_16px_42px_rgba(15,23,42,0.07)]">
      <CardContent className="flex min-h-[7.75rem] flex-col justify-center p-5 sm:p-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
          <h2 className="min-w-0 text-xl font-black leading-snug tracking-[-0.04em] text-slate-950">{item.title}</h2>
          {item.featured ? <Badge className="w-fit shrink-0 border border-blue-100 bg-blue-50 text-blue-700">重点节点</Badge> : null}
        </div>
        <div className="mt-4 flex flex-col gap-2 text-base text-slate-600 sm:flex-row sm:items-center sm:gap-4">
          <span className="inline-flex shrink-0 items-center gap-2 font-bold text-blue-700">
            <CalendarDays className="h-5 w-5" />
            {item.date}
          </span>
          <span className="leading-7">{item.detail}</span>
        </div>
      </CardContent>
    </Card>
  );
}

export default function SchedulePage() {
  return (
    <main className="page-shell bg-white">
      <SiteHeader />
      <section className="section-shell py-10 sm:py-14">
        <div className="mb-8 flex gap-3 overflow-x-auto pb-2 hide-scrollbar">
          {eventLinks.map((item) => (
            <a key={item.href} href={item.href} className={`shrink-0 rounded-full px-5 py-2 text-sm font-bold ${item.href === '/schedule' ? 'bg-blue-600 text-white' : 'bg-white text-slate-600'}`}>
              {item.label}
            </a>
          ))}
        </div>
        <div className="mx-auto max-w-4xl text-center">
          <div className="section-kicker mx-auto text-blue-600">赛事安排</div>
          <h1 className="mt-4 text-balance text-4xl font-black tracking-[-0.06em] text-slate-950 sm:text-6xl">关键节点清晰推进</h1>
          <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">从报名、作品提交、专家评审到总决赛，帮助参赛团队提前规划开发与答辩节奏。</p>
        </div>
        <div className="relative mx-auto mt-12 max-w-5xl">
          <div className="absolute left-5 top-5 h-[calc(100%-2.5rem)] w-px bg-gradient-to-b from-blue-200 via-blue-400 to-blue-100 md:left-1/2" />
          <div className="space-y-5">
            {siteContent.schedule.map((item, index) => {
              const alignRight = index % 2 === 0;
              return (
                <div key={item.title} className="relative grid gap-4 pl-14 md:grid-cols-[1fr_4.5rem_1fr] md:items-center md:pl-0">
                  <div className={`${alignRight ? 'hidden md:block' : 'hidden md:col-start-1 md:block'}`}>{!alignRight ? <ScheduleCard item={item} /> : null}</div>
                  <div className="absolute left-0 top-4 z-10 md:static md:col-start-2 md:grid md:place-items-center">
                    <span className={`grid h-10 w-10 place-items-center rounded-full text-sm font-black ring-4 ring-white ${item.featured ? 'bg-blue-600 text-white' : 'bg-white text-blue-700 shadow-[0_10px_26px_rgba(37,99,235,0.14)]'}`}>
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <div className={`${alignRight ? 'md:col-start-3' : 'md:col-start-3 md:hidden'}`}>
                    <ScheduleCard item={item} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
