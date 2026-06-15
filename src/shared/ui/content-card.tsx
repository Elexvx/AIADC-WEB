import type { ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import { InternalLink } from './internal-link';

type ContentCardProps = {
  title: string;
  description: string;
  imageUrl?: string;
  imageAlt?: string;
  meta?: ReactNode;
  actionLabel?: string;
  actionHref?: string;
  className?: string;
};

export function ContentCard({
  title,
  description,
  imageUrl,
  imageAlt,
  meta,
  actionLabel,
  actionHref,
  className,
}: ContentCardProps) {
  const action = actionLabel ? (
    actionHref ? (
      <InternalLink href={actionHref} className="inline-flex items-center gap-2 text-sm font-bold text-blue-700 transition-colors hover:text-blue-800">
        {actionLabel}
        <ArrowRight className="h-4 w-4" />
      </InternalLink>
    ) : (
      <span className="inline-flex items-center gap-2 text-sm font-bold text-blue-700">
        {actionLabel}
        <ArrowRight className="h-4 w-4" />
      </span>
    )
  ) : null;

  return (
    <article className={cn('flex h-full flex-col overflow-hidden rounded-lg border border-slate-200 bg-white', className)}>
      {imageUrl ? (
        <div className="aspect-[16/9] overflow-hidden bg-slate-100">
          <img src={imageUrl} alt={imageAlt ?? title} className="h-full w-full object-cover" loading="lazy" />
        </div>
      ) : null}

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        {meta ? <div className="text-sm font-semibold text-slate-500">{meta}</div> : null}

        <h2 className="heading-3 text-slate-950">{title}</h2>

        <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">{description}</p>

        {action ? <div className="mt-auto pt-5">{action}</div> : null}
      </div>
    </article>
  );
}
