import { NewsArticleCard } from '@/components/news';
import type { ArticleItem, NewsCategorySummary } from '@/lib/content/types';
import { HomeSectionTitle } from './home-section-title';

type HomeNewsSectionProps = {
  news: {
    categories: NewsCategorySummary[];
    articles: ArticleItem[];
  };
};

export function HomeNewsSection({ news }: HomeNewsSectionProps) {
  const articles = news.articles.slice(0, 3);

  if (news.articles.length === 0) {
    return null;
  }

  return (
    <section id="news" className="bg-background py-14 transition-colors duration-300 sm:py-18">
      <div className="section-shell">
        <HomeSectionTitle
          title="新闻动态"
          description="及时呈现组委会通知、评审规则、报名提醒和项目培育信息。"
        />
        {articles.length > 0 ? (
          <div className="mt-9 grid gap-5 md:grid-cols-3">
            {articles.map((article) => (
              <NewsArticleCard key={article.slug} article={article} imageLoading="eager" />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
