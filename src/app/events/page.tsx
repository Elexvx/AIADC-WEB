import { CalendarDays, ChevronRight, Clock3, MapPin, Sparkles, Ticket } from 'lucide-react';
import { Badge, Button, InternalLink, PageHero, SectionHeading } from '@/shared/ui';
import { SiteFooter, SiteHeader } from '@/widgets/site-shell';

const eventFilters = ['全部活动', '路演活动', '创业沙龙', '政策宣讲', '行业峰会'];

const eventItems = [
  {
    title: '归心谷 PITCH AI+医疗科技路演日',
    category: '路演活动',
    description: '聚焦 AI 医疗科技项目展示与投资人交流，围绕临床场景、数据智能与商业化路径展开深度路演。',
    time: '13:30 - 17:00',
    date: '2026/05/21',
    location: '线上 + 路演会场',
    featured: true,
  },
  {
    title: '2026 第四期归心 DEMO DAY 项目路演日',
    category: '路演活动',
    description: '汇聚高成长项目与生态伙伴，通过现场展示、圆桌互动与资源对接提升项目曝光和合作效率。',
    time: '14:00 - 17:00',
    date: '2026/05/20',
    location: '主会场',
    featured: false,
  },
  {
    title: 'AI+能源科技项目路演日',
    category: '路演活动',
    description: '聚焦智慧电网、绿色储能、碳管理平台等方向，连接行业专家、资本机构与技术创业团队。',
    time: '14:00 - 17:00',
    date: '2026/04/29',
    location: '创新中心',
    featured: false,
  },
  {
    title: '企业出海跨境投资操作及金融服务宣讲会',
    category: '政策宣讲',
    description: '围绕企业出海投融资、东南亚投资合规与金融赋能方案展开政策解读与实操分享。',
    time: '14:00 - 15:00',
    date: '2026/04/23',
    location: '政策服务厅',
    featured: false,
  },
  {
    title: 'AI 时代书法 × 数字艺术跨界交流会',
    category: '创业沙龙',
    description: '邀请书法艺术界与人工智能领域嘉宾，围绕数字艺术、传统文化与 AI 创作进行跨界对话。',
    time: '14:00 - 17:00',
    date: '2026/04/18',
    location: '创意交流空间',
    featured: false,
  },
  {
    title: '破局而立·2026 LP 开年大会',
    category: '行业峰会',
    description: '围绕股权投资、创投引导基金与新质生产力方向，讨论新周期下的机会、结构与合作方式。',
    time: '09:30 - 17:30',
    date: '2026/03/25',
    location: '虹桥会展中心',
    featured: false,
  },
];

const featuredEvent = eventItems.find((item) => item.featured) ?? eventItems[0];
const regularEvents = eventItems.filter((item) => item.title !== featuredEvent.title);

export const metadata = {
  title: '活动中心',
  description: '查看全国大学生智能应用开发大赛相关活动、路演、沙龙与宣讲安排。',
};

export default function EventsPage() {
  return (
    <main className="page-shell bg-white">
      <SiteHeader />
      <PageHero
        eyebrow="活动中心"
        title="日常活动与线下交流安排"
        description="集中展示大赛相关路演活动、创业沙龙、政策宣讲与行业交流内容，方便参赛团队统一查看近期安排。"
      />

      <section className="bg-white -mt-2 pb-2">
        <div className="section-shell">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {eventFilters.map((filter, index) => (
              <button
                key={filter}
                type="button"
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  index === 0
                    ? 'bg-blue-600 text-white shadow-[0_10px_24px_rgba(37,99,235,0.22)]'
                    : 'bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white pb-12 sm:pb-14">
        <div className="section-shell">
          <SectionHeading
            centered
            eyebrow="精选活动"
            title="近期重点活动一览"
            description="延续全站统一的信息卡片样式，优先展示重点活动，并平铺查看其他活动安排。"
            className="mx-auto max-w-4xl"
          />

          <div className="mt-8 grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
            <article className="rounded-lg border border-white bg-white/96 p-6 shadow-[0_16px_42px_rgba(15,23,42,0.07)] sm:p-7">
              <div className="flex flex-wrap items-center gap-3">
                <Badge className="border border-blue-100 bg-blue-50 text-blue-700">{featuredEvent.category}</Badge>
                <span className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-3 py-1 text-xs font-bold tracking-[0.12em] text-white">
                  <Sparkles className="h-3.5 w-3.5" />
                  精彩活动
                </span>
              </div>

              <h2 className="mt-5 text-balance text-3xl font-black tracking-[-0.05em] text-slate-950 sm:text-4xl">
                {featuredEvent.title}
              </h2>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
                {featuredEvent.description}
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                  <div className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.12em] text-slate-400">
                    <CalendarDays className="h-4 w-4 text-blue-600" />
                    日期
                  </div>
                  <div className="mt-2 text-sm font-semibold text-slate-700">{featuredEvent.date}</div>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                  <div className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.12em] text-slate-400">
                    <Clock3 className="h-4 w-4 text-blue-600" />
                    时间
                  </div>
                  <div className="mt-2 text-sm font-semibold text-slate-700">{featuredEvent.time}</div>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                  <div className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.12em] text-slate-400">
                    <MapPin className="h-4 w-4 text-blue-600" />
                    地点
                  </div>
                  <div className="mt-2 text-sm font-semibold text-slate-700">{featuredEvent.location}</div>
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="inline-flex items-center gap-2 text-sm font-semibold text-slate-400">
                  <Ticket className="h-4 w-4" />
                  详情页面与报名通道即将开放
                </div>
                <Button asChild className="rounded-xl bg-blue-600 text-white hover:bg-blue-700">
                  <InternalLink href="/login">
                    查看详情
                    <ChevronRight className="h-4 w-4" />
                  </InternalLink>
                </Button>
              </div>
            </article>

            <div className="grid gap-4">
              {regularEvents.slice(0, 3).map((event) => (
                <article
                  key={`${event.title}-${event.date}`}
                  className="rounded-lg border border-white bg-white/96 p-5 shadow-[0_16px_42px_rgba(15,23,42,0.07)]"
                >
                  <div className="flex items-center justify-between gap-3">
                    <Badge className="border border-blue-100 bg-blue-50 text-blue-700">{event.category}</Badge>
                    <span className="text-sm font-semibold text-slate-400">{event.date}</span>
                  </div>
                  <h3 className="mt-4 text-lg font-black leading-snug tracking-[-0.04em] text-slate-950">{event.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{event.description}</p>
                  <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-slate-500">
                    <MapPin className="h-4 w-4 text-blue-600" />
                    {event.location}
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {regularEvents.slice(3).map((event) => (
              <article
                key={`${event.title}-${event.date}`}
                className="flex h-full flex-col rounded-lg border border-white bg-white/96 p-6 shadow-[0_16px_42px_rgba(15,23,42,0.07)]"
              >
                <div className="flex flex-wrap items-center gap-3">
                  <Badge className="border border-blue-100 bg-blue-50 text-blue-700">{event.category}</Badge>
                  <span className="text-sm font-semibold text-slate-400">{event.date}</span>
                </div>

                <h3 className="mt-4 text-xl font-black tracking-[-0.04em] text-slate-950">{event.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{event.description}</p>

                <div className="mt-5 space-y-2 text-sm font-semibold text-slate-500">
                  <div className="inline-flex items-center gap-2">
                    <Clock3 className="h-4 w-4 text-blue-600" />
                    {event.time}
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" />
                    <span>{event.location}</span>
                  </div>
                </div>

                <InternalLink
                  href="/login"
                  className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-bold text-blue-700 transition-colors hover:text-blue-800"
                >
                  查看详情
                  <ChevronRight className="h-4 w-4" />
                </InternalLink>
              </article>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
