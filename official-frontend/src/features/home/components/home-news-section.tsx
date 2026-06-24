import { NewsArticleCard } from '@/features/news';
import { useLocale } from '@/shared/i18n/locale-provider';
import { HomeSectionTitle } from './home-section-title';

export function HomeNewsSection() {
  const { news } = useLocale();
  const newsArticles = news.articles.filter((article) => article.category === 'news').slice(0, 3);
  const notices = news.articles.filter((article) => article.category !== 'news').slice(0, 2);

  if (news.articles.length === 0) {
    return null;
  }

  return (
    <section id="news" className="bg-white py-10 sm:py-12">
      <div className="section-shell">
        <HomeSectionTitle
          title="新闻动态"
          description="及时呈现组委会通知、评审规则、奖金方案、报名提醒和项目培育信息。"
        />
        {newsArticles.length > 0 ? (
          <div className="mt-9 grid gap-5 md:grid-cols-3">
            {newsArticles.map((article) => (
              <NewsArticleCard key={article.slug} article={article} categoryLabel="新闻动态" />
            ))}
          </div>
        ) : null}
        {notices.length > 0 ? (
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {notices.map((article) => (
              <NewsArticleCard key={article.slug} article={article} variant="compact" />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
