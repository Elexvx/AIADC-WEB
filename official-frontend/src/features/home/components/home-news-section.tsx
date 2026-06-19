import { NewsArticleCard } from '@/features/news';
import { useLocale } from '@/shared/i18n/locale-provider';
import { SectionHeading } from '@/shared/ui';

export function HomeNewsSection() {
  const { news } = useLocale();
  const newsArticles = news.articles.filter((article) => article.category === 'news');
  const notices = news.articles.filter((article) => article.category !== 'news');

  return (
    <section id="news" className="bg-white pb-10 sm:pb-12">
      <div className="section-shell">
        <SectionHeading centered eyebrow="新闻动态" title="赛事资讯实时更新" description="聚焦赛事进展、赛道发布与评审动态，帮助参赛团队快速获取重要信息。" />
        <div className="mt-9 grid gap-5 md:grid-cols-3">
          {newsArticles.map((article) => (
            <NewsArticleCard key={article.slug} article={article} categoryLabel="新闻动态" />
          ))}
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {notices.map((article) => (
            <NewsArticleCard key={article.slug} article={article} variant="compact" />
          ))}
        </div>
      </div>
    </section>
  );
}
