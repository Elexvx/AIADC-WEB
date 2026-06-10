import { Building2, CalendarDays, Code2, Mail, MapPin, Rocket, Sparkles } from 'lucide-react';
import { siteContent } from '@/entities/site';
import { Badge, Button, Card, CardContent, CardDescription, CardHeader, CardTitle, SectionHeading } from '@/shared/ui';
import { SiteFooter, SiteHeader } from '@/widgets/site-shell';

const contactItems = [
  { icon: Mail, title: '咨询邮箱', text: 'contact@ai-competition.org' },
  { icon: Building2, title: '组织单位', text: '全国大学生智能应用开发大赛组委会' },
  { icon: MapPin, title: '服务范围', text: '线上报名、作品评审、总决赛组织' },
];

const awardToneClasses: Record<string, string> = {
  gold: 'border-amber-200 bg-amber-50 text-amber-700',
  silver: 'border-slate-200 bg-slate-50 text-slate-700',
  bronze: 'border-orange-200 bg-orange-50 text-orange-700',
  slate: 'border-blue-200 bg-blue-50 text-blue-700',
};

const trackIcons = [Sparkles, Code2, Rocket];

export const metadata = {
  title: '大赛简介',
  description: '全国大学生智能应用开发大赛简介。',
};

export default function IntroPage() {
  return (
    <main className="page-shell bg-white text-slate-950">
      <SiteHeader />

      <section className="overflow-hidden bg-[linear-gradient(180deg,#eff6ff_0%,#ffffff_72%)]">
        <div className="section-shell py-12 sm:py-16">
          <div className="max-w-5xl">
            <div className="section-kicker text-blue-600">大赛简介</div>
            <h1 className="mt-4 text-balance text-4xl font-black tracking-[-0.06em] text-slate-950 sm:text-6xl">
              构建高水平智能
              <span className="block">应用创新竞赛生态</span>
            </h1>
            <p className="mt-6 max-w-4xl text-base leading-8 text-slate-600 sm:text-lg sm:leading-9">
              全国大学生智能应用开发大赛致力于吸引更多高校学生与青年团队参与人工智能应用开发、产业命题验证与项目路演，推动区域经济与数字产业高质量协同发展。
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {['创新竞赛生态', '产业命题验证', '项目路演成长'].map((item) => (
              <div
                key={item}
                className="rounded-2xl bg-white/88 p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)] ring-1 ring-blue-100/70 backdrop-blur"
              >
                <div className="text-sm font-black tracking-[-0.03em] text-blue-600">{item}</div>
                <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">
                  围绕智能应用开发全流程，连接高校、产业与青年创新团队，帮助项目从创意萌芽走向真实场景验证。
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-8 sm:py-10">
        <div className="section-shell">
          <SectionHeading
            eyebrow="赛事安排"
            title="关键节点清晰推进"
            description="从报名、作品提交、专家评审到总决赛，帮助参赛团队提前规划开发与答辩节奏。"
            className="max-w-3xl"
          />

          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            {siteContent.schedule.map((item, index) => (
              <Card key={item.title} className="rounded-2xl border-white bg-white/96 shadow-[0_16px_42px_rgba(15,23,42,0.07)]">
                <CardContent className="p-6 sm:p-7">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-xs font-black tracking-[0.18em] text-blue-400">STEP {String(index + 1).padStart(2, '0')}</div>
                      <h3 className="mt-3 text-2xl font-black tracking-[-0.04em] text-slate-950">{item.title}</h3>
                    </div>
                    {item.featured ? <Badge className="border border-blue-100 bg-blue-50 text-blue-700">重点节点</Badge> : null}
                  </div>
                  <div className="mt-5 flex flex-col gap-2 text-base text-slate-600 sm:flex-row sm:items-center sm:gap-4">
                    <span className="inline-flex items-center gap-2 font-bold text-blue-700">
                      <CalendarDays className="h-5 w-5" />
                      {item.date}
                    </span>
                    <span className="leading-7">{item.detail}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-8 sm:py-10">
        <div className="section-shell">
          <SectionHeading
            eyebrow="奖项设置"
            title="奖金、证书与产业生态支持"
            description="明确的奖项资源帮助优秀项目获得更大的展示机会与后续成长空间。"
            className="max-w-3xl"
          />

          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {siteContent.awards.map((award) => (
              <Card key={award.title} className="rounded-2xl border-white bg-white/96 shadow-[0_16px_42px_rgba(15,23,42,0.07)]">
                <CardHeader className="space-y-4 p-6">
                  <div className={`grid h-12 w-12 place-items-center rounded-xl border text-xl ${awardToneClasses[award.tone] ?? awardToneClasses.slate}`}>
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
        </div>
      </section>

      <section className="py-8 sm:py-10">
        <div className="section-shell">
          <SectionHeading
            eyebrow="赛区设置"
            title="三大赛道同步开放"
            description="从概念孵化、原型构建到敏捷开发，覆盖智能应用开发的完整生命周期。"
            className="max-w-3xl"
          />

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {siteContent.tracks.map((track, index) => {
              const Icon = trackIcons[index] ?? Sparkles;

              return (
                <Card key={track.title} className="flex h-full flex-col rounded-2xl border-white bg-white/96 shadow-[0_16px_42px_rgba(15,23,42,0.07)]">
                  <CardHeader className="space-y-5 p-6">
                    <div className="flex items-center justify-between gap-4">
                      <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 text-blue-600 ring-1 ring-blue-100">
                        <Icon className="h-6 w-6" />
                      </div>
                      <Badge className="border border-blue-100 bg-blue-50 text-blue-700">{track.code}</Badge>
                    </div>
                    <div>
                      <CardTitle className="text-xl font-black tracking-[-0.05em] text-slate-950">{track.title}</CardTitle>
                      <CardDescription className="mt-3 text-sm leading-7 text-slate-600">{track.description}</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="mt-auto px-6 pb-6 pt-0">
                    <Button asChild variant="outline" className="w-full rounded-md border-blue-200 text-blue-700 hover:bg-blue-50">
                      <a href="/#signup">{track.cta}</a>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-8 pb-14 sm:py-10 sm:pb-16">
        <div className="section-shell">
          <SectionHeading
            eyebrow="联系我们"
            title="组委会咨询与赛事服务"
            description="面向院校组织、团队报名、材料提交与媒体合作提供统一咨询入口。"
            className="max-w-3xl"
          />

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {contactItems.map((item) => {
              const Icon = item.icon;

              return (
                <div key={item.title} className="rounded-2xl bg-slate-50 p-6 ring-1 ring-slate-200/80">
                  <Icon className="h-6 w-6 text-blue-600" />
                  <h3 className="mt-4 text-base font-black tracking-[-0.03em] text-slate-950">{item.title}</h3>
                  <p className="mt-2 break-words text-sm leading-7 text-slate-600">{item.text}</p>
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
