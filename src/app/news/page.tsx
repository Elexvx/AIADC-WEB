import { NewsTabs } from '@/features/news';
import { PageHero } from '@/shared/ui';
import { SiteFooter, SiteHeader } from '@/widgets/site-shell';

export const metadata = {
  title: '新闻中心',
  description: '通过顶部分类切换查看全国大学生智能应用开发大赛新闻动态、通知公告与媒体报道。',
};

export default function NewsPage() {
  return (
    <main className="page-shell bg-white">
      <SiteHeader />
      <PageHero
        eyebrow="新闻中心"
        title="赛事资讯集中浏览"
        description="通过顶部分类直接切换新闻动态、通知公告与媒体报道，平铺查看文章并跳转详情。"
      />

      <section className="bg-white pb-12 sm:pb-14">
        <div className="section-shell rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_16px_42px_rgba(15,23,42,0.07)] sm:p-8">
          <NewsTabs />
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
