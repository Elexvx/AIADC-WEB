import { Newspaper } from 'lucide-react';
import { NewsTabs } from '@/features/news';
import { SiteFooter, SiteHeader } from '@/widgets/site-shell';

export const metadata = {
  title: '资讯 Tab 查看',
  description: '通过独立 Tab 页面按分类查看全国大学生智能应用开发大赛资讯。',
};

export default function NewsTabsPage() {
  return (
    <main className="page-shell bg-[#f5f8fc]">
      <SiteHeader />

      <section className="bg-white py-10 sm:py-12">
        <div className="section-shell">
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div className="max-w-3xl">
              <div className="section-kicker text-blue-600">资讯浏览</div>
              <h1 className="mt-4 text-balance text-4xl font-black tracking-[-0.06em] text-slate-950 sm:text-6xl">独立文章 Tab 查看页</h1>
              <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
                通过顶部 Tab 直接切换新闻动态、通知公告与媒体报道，适合快速浏览与跳转详情。
              </p>
            </div>
            <a
              href="/news"
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-blue-700 shadow-[0_10px_24px_rgba(15,23,42,0.05)] transition-colors hover:bg-blue-50"
            >
              <Newspaper className="h-4 w-4" />
              返回分类页
            </a>
          </div>
        </div>
      </section>

      <section className="bg-[#f5f8fc] pb-12 sm:pb-14">
        <div className="section-shell rounded-lg border border-slate-200 bg-white p-6 shadow-[0_18px_54px_rgba(15,23,42,0.06)] sm:p-8">
          <NewsTabs />
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
