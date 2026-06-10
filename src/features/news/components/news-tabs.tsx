'use client';

import { useState } from 'react';
import { ArrowRight, CalendarDays } from 'lucide-react';
import { Badge, InternalLink } from '@/shared/ui';
import { getNewsCategoryGroups, getNewsCategoryLabel, type NewsCategoryKey } from '@/features/news/lib/news';

const newsGroups = getNewsCategoryGroups();

export function NewsTabs() {
  const [activeTab, setActiveTab] = useState<NewsCategoryKey>('news');
  const activeGroup = newsGroups.find((group) => group.key === activeTab) ?? newsGroups[0];

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

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {activeGroup.articles.length > 0 ? (
          activeGroup.articles.map((article) => (
            <InternalLink
              key={article.slug}
              href={article.href}
              className="block rounded-lg border border-slate-200 bg-white p-5 shadow-[0_14px_36px_rgba(15,23,42,0.06)] transition-colors hover:bg-slate-50"
            >
              <div className="flex flex-wrap items-center gap-3">
                <Badge className="border border-blue-100 bg-blue-50 text-blue-700">{getNewsCategoryLabel(article.category)}</Badge>
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-slate-400">
                  <CalendarDays className="h-4 w-4" />
                  {article.date}
                </span>
              </div>
              <h3 className="mt-4 text-xl font-black tracking-[-0.04em] text-slate-950">{article.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{article.excerpt}</p>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-blue-700">
                查看全文
                <ArrowRight className="h-4 w-4" />
              </span>
            </InternalLink>
          ))
        ) : (
          <div className="rounded-lg border border-dashed border-slate-200 bg-slate-50 p-8 text-center text-sm text-slate-500 md:col-span-2 xl:col-span-3">
            当前分类暂无文章。
          </div>
        )}
      </div>
    </div>
  );
}
