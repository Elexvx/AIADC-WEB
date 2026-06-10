import { siteContent } from '@/entities/site';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui';
import { SiteFooter, SiteHeader } from '@/widgets/site-shell';

const eventLinks = [
  { label: '大赛简介', href: '/intro' },
  { label: '赛事安排', href: '/schedule' },
  { label: '奖项设置', href: '/awards' },
  { label: '赛区设置', href: '/tracks' },
];

const awardToneClasses: Record<string, string> = {
  gold: 'border-amber-200 bg-amber-50 text-amber-700',
  silver: 'border-slate-200 bg-slate-50 text-slate-700',
  bronze: 'border-orange-200 bg-orange-50 text-orange-700',
  slate: 'border-blue-200 bg-blue-50 text-blue-700',
};

export const metadata = {
  title: '奖项设置',
  description: '全国大学生智能应用开发大赛奖项设置。',
};

export default function AwardsPage() {
  return (
    <main className="page-shell bg-white">
      <SiteHeader />
      <section className="section-shell py-10 sm:py-14">
        <div className="mb-8 flex gap-3 overflow-x-auto pb-2 hide-scrollbar">
          {eventLinks.map((item) => (
            <a key={item.href} href={item.href} className={`shrink-0 rounded-full px-5 py-2 text-sm font-bold ${item.href === '/awards' ? 'bg-blue-600 text-white' : 'bg-white text-slate-600'}`}>
              {item.label}
            </a>
          ))}
        </div>
        <div className="mx-auto max-w-4xl text-center">
          <div className="section-kicker mx-auto text-blue-600">奖项设置</div>
          <h1 className="mt-4 text-balance text-4xl font-black tracking-[-0.06em] text-slate-950 sm:text-6xl">奖金、证书与产业生态支持</h1>
          <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">明确的奖项资源帮助优秀项目获得更大的展示机会与后续成长空间。</p>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-4">
          {siteContent.awards.map((award) => (
            <Card key={award.title} className="rounded-lg border-white bg-white/96 shadow-[0_16px_42px_rgba(15,23,42,0.07)]">
              <CardHeader className="space-y-4 p-6">
                <div className={`grid h-12 w-12 place-items-center rounded-lg border text-xl ${awardToneClasses[award.tone] ?? awardToneClasses.slate}`}>
                  <span>{award.icon}</span>
                </div>
                <div>
                  <CardTitle className="text-xl font-black tracking-[-0.05em] text-slate-950">{award.title}</CardTitle>
                  <CardDescription className="mt-1 text-slate-500">{award.subtitle}</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="px-6 pb-6 pt-0">
                <div className="text-3xl font-black tracking-[-0.06em] text-blue-700">{award.prize}</div>
                <p className="mt-3 whitespace-pre-line text-sm leading-7 text-slate-600">{award.detail}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
