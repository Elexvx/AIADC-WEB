'use client';

import { useState } from 'react';
import { NewsArticleCard } from '@/features/news/components/news-article-card';
import { type NewsCategoryKey } from '@/features/news/lib/news';
import { useLocale } from '@/shared/i18n/locale-provider';

export function NewsTabs() {
  const { news } = useLocale();
  const [activeTab, setActiveTab] = useState<NewsCategoryKey>('news');
  const newsGroups = news.categories.map((category) => {
    const articles = news.articles.filter((article) => article.category === category.value);

    return {
      key: category.value,
      label: category.label,
      description: category.description,
      articles,
      count: articles.length,
      latestDate: articles[0]?.date ?? '',
    };
  });
  const activeGroup = newsGroups.find((group) => group.key === activeTab) ?? newsGroups[0];

  if (!activeGroup) {
    return (
      <div className="rounded-lg border border-dashed border-slate-200 bg-slate-50 p-8 text-center text-sm text-slate-500">
        暂无已发布新闻内容。
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-3">
        {newsGroups.map((group) => (
          <button
            key={group.key}
            type="button"
            onClick={() => setActiveTab(group.key)}
            className={`rounded-full px-5 py-2.5 text-sm font-bold transition-colors ${
              activeTab === group.key ? 'bg-blue-600 text-white' : 'bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-blue-50'
            }`}
          >
            {group.label}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {activeGroup.articles.length > 0 ? (
          activeGroup.articles.map((article) => (
            <NewsArticleCard key={article.slug} article={article} variant="row" />
          ))
        ) : (
          <div className="rounded-lg border border-dashed border-slate-200 bg-slate-50 p-8 text-center text-sm text-slate-500">
            当前分类暂无文章。
          </div>
        )}
      </div>
    </div>
  );
}
