import { ArrowRight, CalendarDays, LayoutGrid } from 'lucide-react';
import { getNewsCategoryGroups, NewsArticleCard } from '@/features/news';
import { Badge, Card, CardContent } from '@/shared/ui';
import { SiteFooter, SiteHeader } from '@/widgets/site-shell';

const newsGroups = getNewsCategoryGroups();

export const metadata = {
  title: '新闻中心',
  description: '查看全国大学生智能应用开发大赛新闻动态、通知公告与媒体报道。',
};

export default function NewsCategoryPage() {
  return (
    <main className="page-shell bg-white">
      <SiteHeader />

      <section className="bg-[#07172d] py-10 text-white sm:py-14">
        <div className="section-shell">
          <div className="flex flex-wrap items-center justify-between gap-5">
            <div className="max-w-3xl">
              <div className="section-kicker text-cyan-200">新闻中心</div>
              <h1 className="mt-4 text-balance text-4xl font-black tracking-[-0.06em] sm:text-6xl">独立文章分类页</h1>
              <p className="mt-5 text-base leading-8 text-slate-300 sm:text-lg">
                将赛事资讯按新闻动态、通知公告、媒体报道拆分管理，便于查看分类内容与详情文章。
              </p>
            </div>
            <a
              href="/news/tabs"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-white/12"
            >
              <LayoutGrid className="h-4 w-4" />
              切换到 Tab 查看页
            </a>
          </div>
        </div>
      </section>

      <section className="bg-white py-10 sm:py-12">
        <div className="section-shell">
          <div className="grid gap-5 md:grid-cols-3">
            {newsGroups.map((group) => (
              <Card key={group.key} className="rounded-lg border-slate-200 bg-white shadow-[0_16px_42px_rgba(15,23,42,0.07)]">
                <CardContent className="flex min-h-56 flex-col p-6">
                  <Badge className="w-fit border border-blue-100 bg-blue-50 text-blue-700">{group.label}</Badge>
                  <div className="mt-5 text-4xl font-black tracking-[-0.06em] text-slate-950">{group.count}</div>
                  <p className="mt-2 text-sm font-semibold text-slate-400">篇文章</p>
                  <p className="mt-4 text-sm leading-7 text-slate-600">{group.description}</p>
                  <div className="mt-auto flex items-center justify-between gap-4 pt-5 text-sm">
                    <span className="inline-flex items-center gap-2 font-semibold text-slate-400">
                      <CalendarDays className="h-4 w-4" />
                      最近更新 {group.latestDate}
                    </span>
                    <a href={`#${group.key}`} className="inline-flex items-center gap-2 font-bold text-blue-700">
                      查看分类
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white pb-12 sm:pb-14">
        <div className="section-shell space-y-8">
          {newsGroups.map((group) => (
            <div key={group.key} id={group.key} className="scroll-mt-24 rounded-lg border border-slate-200 bg-white p-6 shadow-[0_16px_42px_rgba(15,23,42,0.06)] sm:p-8">
              <div className="flex flex-wrap items-end justify-between gap-4 border-b border-slate-200 pb-5">
                <div className="max-w-2xl">
                  <div className="section-kicker text-blue-600">{group.label}</div>
                  <h2 className="mt-4 text-3xl font-black tracking-[-0.05em] text-slate-950">{group.label}内容</h2>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{group.description}</p>
                </div>
                <a href="/news/tabs" className="inline-flex items-center gap-2 text-sm font-bold text-blue-700">
                  在 Tab 页查看
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>

              <div className="mt-6 grid gap-5 lg:grid-cols-2">
                {group.articles.map((article) => (
                  <NewsArticleCard key={article.slug} article={article} variant="row" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
