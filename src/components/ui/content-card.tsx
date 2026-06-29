import type { ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
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
      <InternalLink href={actionHref} className="inline-flex items-center gap-2 text-sm font-semibold text-[#0075de] transition-colors hover:text-[#005bab]">
        {actionLabel}
        <ArrowRight className="h-4 w-4" />
      </InternalLink>
    ) : (
      <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#0075de] transition-colors duration-300">
        {actionLabel}
        <ArrowRight className="h-4 w-4" />
      </span>
    )
  ) : null;

  return (
    <article className={cn('notion-card-elevated flex h-full flex-col overflow-hidden transition-colors duration-300', className)}>
      {imageUrl ? (
        <div className="aspect-[16/9] overflow-hidden bg-[#f6f5f4]">
          <img src={imageUrl} alt={imageAlt ?? title} className="h-full w-full object-cover" loading="lazy" decoding="async" />
        </div>
      ) : null}

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        {meta ? <div className="text-sm font-medium text-[#615d59] transition-colors duration-300">{meta}</div> : null}

        <h2 className="heading-3 notion-card-title transition-colors duration-300">{title}</h2>

        <p className="notion-card-body mt-3 text-sm leading-7 transition-colors duration-300 sm:text-base">{description}</p>

        {action ? <div className="mt-auto pt-5">{action}</div> : null}
      </div>
    </article>
  );
}
