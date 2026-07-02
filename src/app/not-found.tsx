import {
  ArrowRight,
  CalendarDays,
  Compass,
  FileText,
  Home,
  Info,
  Newspaper,
  Phone,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { ROUTES } from '@/lib/config/routes';
import { Button, InternalLink } from '@/components/ui';

type QuickLink = {
  label: string;
  href: string;
  description: string;
  icon: LucideIcon;
};

const quickLinks: QuickLink[] = [
  {
    label: '首页',
    href: ROUTES.home,
    description: '回到赛事官网入口，重新开始导航。',
    icon: Home,
  },
  {
    label: '活动中心',
    href: ROUTES.events,
    description: '查看报名、评审和项目活动安排。',
    icon: CalendarDays,
  },
  {
    label: '资料中心',
    href: ROUTES.materials,
    description: '下载通知、执行方案和评审规则。',
    icon: FileText,
  },
  {
    label: '通知公告',
    href: ROUTES.news,
    description: '查看官方发布和最新动态。',
    icon: Newspaper,
  },
  {
    label: '关于大赛',
    href: ROUTES.about,
    description: '了解赛事背景、赛程和奖项设置。',
    icon: Info,
  },
  {
    label: '联系方式',
    href: ROUTES.contact,
    description: '查找官网邮箱、咨询群和联系渠道。',
    icon: Phone,
  },
];

export default function NotFoundPage() {
  return (
    <main className="relative flex flex-1 overflow-hidden bg-background text-foreground">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[-6rem] top-8 h-64 w-64 rounded-full bg-[#dfeeff] blur-3xl dark:bg-[#17368d]/38" />
        <div className="absolute right-[-5rem] top-24 h-72 w-72 rounded-full bg-[#d9e4ff] blur-3xl dark:bg-[#2c4ce0]/28" />
        <div className="absolute bottom-[-7rem] left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-[#edf5ff] blur-3xl dark:bg-white/6" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.65),transparent_48%),linear-gradient(180deg,rgba(255,255,255,0.42),rgba(255,255,255,0)_34%)] dark:bg-[radial-gradient(circle_at_top,rgba(51,82,173,0.22),transparent_44%),linear-gradient(180deg,rgba(15,23,42,0.1),rgba(15,23,42,0)_34%)]" />
      </div>

      <div className="section-shell relative flex flex-1 items-center py-14 sm:py-18 lg:py-22">
        <div className="grid w-full items-center gap-10 lg:grid-cols-[minmax(0,1.02fr)_minmax(360px,0.98fr)] lg:gap-14">
          <section aria-labelledby="not-found-title" className="max-w-2xl">
            <p className="text-[0.78rem] font-bold tracking-[0.24em] text-[#0075de] uppercase dark:text-[#7aa2ff]">
              404 / Not Found
            </p>
            <h1
              id="not-found-title"
              className="mt-5 max-w-[9ch] text-balance text-[3.25rem] font-bold leading-[0.92] tracking-[-0.06em] text-[#18253f] sm:text-[4.5rem] lg:text-[5.5rem] dark:text-white"
            >
              页面走丢了
            </h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-[#615d59] sm:text-[1.05rem] sm:leading-8 dark:text-white/78">
              你访问的地址可能已经失效、被移除，或者输入路径有误。先回到主站入口，我们再从正确的导航继续往前。
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="px-7">
                <InternalLink href={ROUTES.home}>
                  返回首页
                  <ArrowRight className="h-4 w-4" />
                </InternalLink>
              </Button>
              <Button asChild variant="secondary" size="lg" className="px-7">
                <InternalLink href={ROUTES.news}>
                  查看通知公告
                </InternalLink>
              </Button>
            </div>

            <div className="mt-10">
              <p className="text-sm font-semibold tracking-[0.08em] text-[#18253f] dark:text-white/88">常用入口</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {quickLinks.slice(1, 5).map((link) => {
                  const Icon = link.icon;

                  return (
                    <InternalLink
                      key={link.href}
                      href={link.href}
                      className="group rounded-2xl border border-[#dfe7fb] bg-white/82 p-4 shadow-[0_18px_48px_rgba(15,43,97,0.06)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#c5daf8] hover:shadow-[0_20px_52px_rgba(15,43,97,0.1)] dark:border-white/12 dark:bg-white/6 dark:hover:border-white/20"
                    >
                      <div className="flex items-start gap-3">
                        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-[#eef6ff] text-[#0075de] transition-colors group-hover:bg-[#dfeeff] dark:bg-white/10 dark:text-white dark:group-hover:bg-white/14">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-base font-bold text-[#18253f] dark:text-white">{link.label}</span>
                            <ArrowRight className="h-4 w-4 text-[#0075de] transition-transform duration-200 group-hover:translate-x-0.5 dark:text-[#7aa2ff]" />
                          </div>
                          <p className="mt-2 text-sm leading-7 text-[#615d59] dark:text-white/72">{link.description}</p>
                        </div>
                      </div>
                    </InternalLink>
                  );
                })}
              </div>
            </div>
          </section>

          <section className="relative mx-auto w-full max-w-[560px]">
            <div className="absolute inset-x-6 top-5 h-24 rounded-full bg-[#0075de]/12 blur-3xl dark:bg-[#2c60ff]/24" />
            <div className="relative overflow-hidden rounded-[2rem] border border-[#dfe7fb] bg-white/88 p-6 shadow-[0_26px_90px_rgba(15,43,97,0.14)] backdrop-blur xl:p-8 dark:border-white/12 dark:bg-[#121b34]/84">
              <div className="pointer-events-none absolute right-4 top-0 text-[7.5rem] font-bold leading-none tracking-[-0.08em] text-[#dfeeff] dark:text-white/6">
                404
              </div>

              <div className="relative flex items-start justify-between gap-4">
                <div>
                  <p className="text-[0.72rem] font-bold tracking-[0.22em] text-[#0075de] uppercase dark:text-[#7aa2ff]">
                    AIADC Route Map
                  </p>
                  <h2 className="mt-3 text-[1.9rem] font-bold leading-tight tracking-[-0.04em] text-[#18253f] dark:text-white">
                    试试这些可达页面
                  </h2>
                  <p className="mt-3 max-w-sm text-sm leading-7 text-[#615d59] dark:text-white/74">
                    当前页面无法访问，但主导航里的 6 个页面都能正常到达。
                  </p>
                </div>
                <div className="grid h-14 w-14 shrink-0 place-items-center rounded-[1.4rem] bg-[#eef6ff] text-[#0075de] dark:bg-white/10 dark:text-white">
                  <Compass className="h-7 w-7" />
                </div>
              </div>

              <div className="relative mt-7 grid gap-3 sm:grid-cols-2">
                {quickLinks.map((link, index) => {
                  const Icon = link.icon;

                  return (
                    <InternalLink
                      key={link.href}
                      href={link.href}
                      className={`group rounded-2xl border p-4 transition-all duration-200 hover:-translate-y-0.5 ${
                        index === 0
                          ? 'border-[#b8d8ff] bg-[linear-gradient(135deg,#eef6ff,#ffffff)] sm:col-span-2 dark:border-[#3b63ca] dark:bg-[linear-gradient(135deg,rgba(35,74,170,0.36),rgba(18,27,52,0.96))]'
                          : 'border-[#e5edf8] bg-white/72 hover:border-[#c8d9f1] dark:border-white/10 dark:bg-white/4 dark:hover:border-white/18'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white text-[#0075de] shadow-[0_10px_20px_rgba(0,117,222,0.08)] dark:bg-white/10 dark:text-white dark:shadow-none">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-[#18253f] dark:text-white">{link.label}</span>
                            <ArrowRight className="h-4 w-4 text-[#0075de] transition-transform duration-200 group-hover:translate-x-0.5 dark:text-[#7aa2ff]" />
                          </div>
                          <p className="mt-2 text-sm leading-7 text-[#615d59] dark:text-white/72">{link.description}</p>
                        </div>
                      </div>
                    </InternalLink>
                  );
                })}
              </div>

              <div className="mt-6 rounded-2xl border border-dashed border-[#d7e5fa] bg-[#f8fbff] px-4 py-3 text-sm leading-7 text-[#4d5b6f] dark:border-white/12 dark:bg-white/4 dark:text-white/66">
                如果你是从搜索引擎或旧收藏夹进入，这个链接很可能已经过期。新的内容入口都已经整理到顶部导航里了。
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
