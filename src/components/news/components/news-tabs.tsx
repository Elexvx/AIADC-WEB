'use client';

import { useMemo, useState } from 'react';
import { NewsArticleCard } from '@/components/news/components/news-article-card';
import { useLocale } from '@/lib/i18n/locale-provider';

export function NewsTabs() {
  const { news } = useLocale();
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const categories = useMemo(() => {
    const known = new Map(news.categories.map((category) => [category.value, category]));
    for (const article of news.articles) {
      if (!known.has(article.category)) {
        known.set(article.category, {
          label: article.category,
          value: article.category,
          description: `${article.category} 分类文章。`,
        });
      }
    }
    return Array.from(known.values());
  }, [news.articles, news.categories]);
  const tags = useMemo(
    () => Array.from(new Set(news.articles.flatMap((article) => article.tags ?? []))).filter(Boolean),
    [news.articles],
  );
  const filteredArticles = useMemo(
    () =>
      news.articles.filter((article) => {
        const categoryMatches = activeCategory === 'all' || article.category === activeCategory;
        const tagMatches = !activeTag || article.tags?.includes(activeTag);
        return categoryMatches && tagMatches;
      }),
    [activeCategory, activeTag, news.articles],
  );

  if (!news.articles.length) {
    return (
      <div className="rounded-xl border border-dashed border-[#e6e6e6] bg-white p-8 text-center text-sm text-[#615d59]">
        暂无已发布文章内容。
      </div>
    );
  }

  const categoryButtonClass = (active: boolean) =>
    `h-8 shrink-0 rounded-md px-3 text-xs font-semibold transition-colors duration-200 sm:h-9 sm:px-4 sm:text-sm ${
      active ? 'bg-[#111111] text-white' : 'bg-[#f6f5f4] text-[#615d59] hover:bg-white hover:text-[#0075de]'
    }`;
  const tagButtonClass = (active: boolean) =>
    `h-8 shrink-0 rounded-md px-3 text-xs font-semibold transition-colors duration-200 ${
      active ? 'bg-[#111111] text-white' : 'bg-[#f6f5f4] text-[#615d59] hover:bg-white hover:text-[#0075de]'
    }`;

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center gap-2">
        <span className="mr-1 text-sm font-semibold text-[#615d59]">分类</span>
        <button
          type="button"
          onClick={() => setActiveCategory('all')}
          className={categoryButtonClass(activeCategory === 'all')}
        >
          全部
        </button>
        {categories.map((category) => (
          <button
            key={category.value}
            type="button"
            onClick={() => setActiveCategory(category.value)}
            className={categoryButtonClass(activeCategory === category.value)}
          >
            {category.label}
          </button>
        ))}
      </div>

      {tags.length ? (
        <div className="flex flex-wrap items-center gap-2 border-b border-[#e6e6e6] pb-5">
          <span className="mr-1 text-sm font-semibold text-[#615d59]">标签</span>
          <button
            type="button"
            onClick={() => setActiveTag(null)}
            className={tagButtonClass(activeTag === null)}
          >
            全部
          </button>
          {tags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setActiveTag(tag)}
              className={tagButtonClass(activeTag === tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      ) : null}

      <div className="space-y-4">
        {filteredArticles.length > 0 ? (
          filteredArticles.map((article) => (
            <NewsArticleCard
              key={article.slug}
              article={article}
              variant="row"
              categoryLabel={categories.find((category) => category.value === article.category)?.label}
            />
          ))
        ) : (
          <div className="rounded-xl border border-dashed border-[#e6e6e6] bg-white p-8 text-center text-sm text-[#615d59]">
            当前筛选条件下暂无文章。
          </div>
        )}
      </div>
    </div>
  );
}
