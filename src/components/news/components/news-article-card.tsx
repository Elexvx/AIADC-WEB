import { ArrowRight, CalendarDays } from 'lucide-react';
import { getNewsCategoryLabel } from '@/components/news/lib/news';
import { type ArticleItem } from '@/lib/content/types';
import { Badge, InternalLink } from '@/components/ui';

type NewsArticleCardProps = {
  article: ArticleItem;
  variant?: 'image' | 'compact' | 'row';
  showCategory?: boolean;
  categoryLabel?: string;
  imageLoading?: 'eager' | 'lazy';
};

export function NewsArticleCard({
  article,
  variant = 'image',
  showCategory = true,
  categoryLabel,
  imageLoading = 'lazy',
}: NewsArticleCardProps) {
  const resolvedLabel = categoryLabel ?? getNewsCategoryLabel(article.category);

  if (variant === 'compact') {
    return (
      <InternalLink
        href={article.href}
        className="notion-card-elevated flex min-h-44 flex-col p-5 transition-colors duration-200 hover:border-[#d4d4d4]"
      >
        <div className="flex items-center justify-between gap-4">
          {showCategory ? (
            <Badge className="w-fit shrink-0">{resolvedLabel}</Badge>
          ) : null}
          <span className="shrink-0 text-sm font-medium text-[#a39e98] transition-colors duration-300">{article.date}</span>
        </div>
        <div className="mt-5">
          <h3 className="heading-3 notion-card-title transition-colors duration-300">{article.title}</h3>
          <p className="notion-card-body mt-3 text-sm leading-7 transition-colors duration-300">{article.excerpt}</p>
          {article.tags?.length ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {article.tags.slice(0, 3).map((tag) => (
                <span key={tag} className="rounded-full bg-[#f6f5f4] px-2.5 py-1 text-xs font-medium text-[#615d59]">
                  {tag}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </InternalLink>
    );
  }

  if (variant === 'row') {
    return (
      <InternalLink
        href={article.href}
        className="notion-card-elevated grid gap-4 p-4 transition-colors duration-200 hover:border-[#d4d4d4] sm:grid-cols-[11rem_1fr]"
      >
        <div className="aspect-[4/3] overflow-hidden rounded-lg bg-[#f6f5f4] transition-colors duration-300">
          <img src={article.image.url} alt={article.image.alt} className="h-full w-full object-cover" loading={imageLoading} decoding="async" />
        </div>
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-3">
            {showCategory ? (
              <Badge>{resolvedLabel}</Badge>
            ) : null}
            <span className="inline-flex items-center gap-2 text-sm font-medium text-[#a39e98]">
              <CalendarDays className="h-4 w-4" />
              {article.date}
            </span>
          </div>
          <h3 className="heading-3 notion-card-title mt-3 transition-colors duration-300">{article.title}</h3>
          <p className="notion-card-body mt-3 text-sm leading-7 transition-colors duration-300">{article.excerpt}</p>
          {article.tags?.length ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {article.tags.slice(0, 4).map((tag) => (
                <span key={tag} className="rounded-full bg-[#f6f5f4] px-2.5 py-1 text-xs font-medium text-[#615d59]">
                  {tag}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </InternalLink>
    );
  }

  return (
    <InternalLink
      href={article.href}
      className="notion-card-elevated group flex h-full flex-col overflow-hidden transition-colors duration-200 hover:border-[#d4d4d4]"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <img src={article.image.url} alt={article.image.alt} className="h-full w-full object-cover" loading={imageLoading} decoding="async" />
        {showCategory ? (
          <Badge className="absolute left-4 top-4">{resolvedLabel}</Badge>
        ) : null}
      </div>
      <div className="flex min-h-56 flex-1 flex-col p-6">
        <span className="text-xs font-medium tracking-[0.08em] text-[#a39e98]">{article.date}</span>
        <h3 className="heading-3 notion-card-title mt-4 transition-colors duration-300">{article.title}</h3>
        <p className="notion-card-body mt-3 text-sm leading-7 transition-colors duration-300">{article.excerpt}</p>
        {article.tags?.length ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {article.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="rounded-full bg-[#f6f5f4] px-2.5 py-1 text-xs font-medium text-[#615d59]">
                {tag}
              </span>
            ))}
          </div>
        ) : null}
        <span className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-semibold text-[#0075de] transition-colors duration-300">
          查看全文
          <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </InternalLink>
  );
}
