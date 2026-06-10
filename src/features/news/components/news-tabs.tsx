'use client';

import { useState } from 'react';
import { ArrowRight, CalendarDays } from 'lucide-react';
import { Badge, Card } from '@/shared/ui';
import { getNewsCategoryGroups, getNewsCategoryLabel, type NewsCategoryKey } from '@/features/news/lib/news';

const newsGroups = getNewsCategoryGroups();

export function NewsTabs() {
  const [activeTab, setActiveTab] = useState<NewsCategoryKey>('news');
  const activeGroup = newsGroups.find((group) => group.key === activeTab) ?? newsGroups[0];

  return (
    <div className="space-y-8">
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

      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <Card className="overflow-hidden rounded-lg border-white bg-white/96 shadow-[0_18px_54px_rgba(15,23,42,0.07)]">
          <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
            <img src={activeGroup.articles[0]?.imageUrl} alt={activeGroup.articles[0]?.title ?? activeGroup.label} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0.08)_0%,rgba(15,23,42,0.82)_100%)]" />
            <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8">
              <Badge className="border border-blue-100 bg-blue-50 text-blue-700">{activeGroup.label}</Badge>
              <h2 className="mt-4 text-balance text-2xl font-black tracking-[-0.05em] sm:text-4xl">{activeGroup.articles[0]?.title}</h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-200 sm:text-base">{activeGroup.description}</p>
            </div>
          </div>
        </Card>

        <div className="space-y-4">
          {activeGroup.articles.map((article) => (
            <a
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
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
