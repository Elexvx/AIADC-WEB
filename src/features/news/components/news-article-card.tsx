import { ArrowRight, CalendarDays } from 'lucide-react';
import { getNewsCategoryLabel } from '@/features/news/lib/news';
import { type ArticleItem } from '@/shared/content';
import { Badge, InternalLink } from '@/shared/ui';

type NewsArticleCardProps = {
  article: ArticleItem;
  variant?: 'image' | 'compact' | 'row';
  showCategory?: boolean;
  categoryLabel?: string;
};

export function NewsArticleCard({
  article,
  variant = 'image',
  showCategory = true,
  categoryLabel,
}: NewsArticleCardProps) {
  const resolvedLabel = categoryLabel ?? getNewsCategoryLabel(article.category);

  if (variant === 'compact') {
    return (
      <InternalLink
        href={article.href}
        className="flex min-h-44 flex-col rounded-lg border border-slate-200 bg-white p-5 transition-colors hover:border-blue-200"
      >
        <div className="flex items-center justify-between gap-4">
          {showCategory ? (
            <Badge className="w-fit shrink-0 border border-blue-100 bg-blue-50 text-blue-700">{resolvedLabel}</Badge>
          ) : null}
          <span className="shrink-0 text-sm font-semibold text-slate-400">{article.date}</span>
        </div>
        <div className="mt-5">
          <h3 className="heading-3 text-slate-950">{article.title}</h3>
          <p className="mt-3 text-sm leading-7 text-slate-600">{article.excerpt}</p>
        </div>
      </InternalLink>
    );
  }

  if (variant === 'row') {
    return (
      <InternalLink
        href={article.href}
        className="grid gap-4 rounded-lg border border-slate-200 bg-white p-4 transition-colors hover:bg-slate-50 sm:grid-cols-[11rem_1fr]"
      >
        <div className="aspect-[4/3] overflow-hidden rounded-md bg-slate-100">
          <img src={article.image.url} alt={article.image.alt} className="h-full w-full object-cover" />
        </div>
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-3">
            {showCategory ? (
              <Badge className="border border-blue-100 bg-blue-50 text-blue-700">{resolvedLabel}</Badge>
            ) : null}
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-slate-400">
              <CalendarDays className="h-4 w-4" />
              {article.date}
            </span>
          </div>
          <h3 className="mt-3 heading-3 text-slate-950">{article.title}</h3>
          <p className="mt-3 text-sm leading-7 text-slate-600">{article.excerpt}</p>
        </div>
      </InternalLink>
    );
  }

  return (
    <InternalLink
      href={article.href}
      className="flex h-full flex-col overflow-hidden rounded-lg border border-slate-200 bg-white"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <img src={article.image.url} alt={article.image.alt} className="h-full w-full object-cover" loading="lazy" />
        {showCategory ? (
          <Badge className="absolute left-4 top-4 border border-blue-100 bg-blue-50 text-blue-700">{resolvedLabel}</Badge>
        ) : null}
      </div>
      <div className="flex min-h-56 flex-1 flex-col p-6">
        <span className="text-xs font-semibold tracking-[0.12em] text-slate-400">{article.date}</span>
        <h3 className="mt-4 heading-3 text-slate-950">{article.title}</h3>
        <p className="mt-3 text-sm leading-7 text-slate-600">{article.excerpt}</p>
        <span className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-bold text-blue-700">
          查看全文
          <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </InternalLink>
  );
}
