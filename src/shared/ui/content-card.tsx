import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import { InternalLink } from './internal-link';

type ContentCardProps = {
  title: string;
  description: string;
  imageUrl?: string;
  imageAlt?: string;
  meta?: ReactNode;
  icon?: LucideIcon;
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
  icon: Icon,
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
    <article className={cn('flex h-full flex-col overflow-hidden rounded-lg border border-white bg-white/96 shadow-[0_16px_42px_rgba(15,23,42,0.07)]', className)}>
      {imageUrl ? (
        <div className="aspect-[16/9] overflow-hidden bg-slate-100">
          <img src={imageUrl} alt={imageAlt ?? title} className="h-full w-full object-cover" loading="lazy" />
        </div>
      ) : null}

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        {meta ? <div className="text-sm font-semibold text-slate-500">{meta}</div> : null}

        <div className="mt-4 flex items-start justify-between gap-4">
          <h2 className="text-xl font-black tracking-[-0.04em] text-slate-950">{title}</h2>
          {Icon ? (
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-blue-50 text-blue-600 ring-1 ring-blue-100">
              <Icon className="h-5 w-5" />
            </span>
          ) : null}
        </div>

        <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">{description}</p>

        {action ? <div className="mt-auto pt-5">{action}</div> : null}
      </div>
    </article>
  );
}
