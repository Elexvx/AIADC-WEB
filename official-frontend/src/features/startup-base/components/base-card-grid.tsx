import { MapPin } from 'lucide-react';
import { ContentCard, ScrollReveal } from '@/shared/ui';
import type { CmsRecordBase } from '@/shared/content';

interface BaseCardGridProps {
  items: CmsRecordBase[];
}

export function BaseCardGrid({ items }: BaseCardGridProps) {
  return (
    <ScrollReveal className="section-shell grid gap-5 md:grid-cols-3" staggerChildren>
      {items.map((item) => (
          <ContentCard
                key={item.id}
                title={item.title}
                description={item.description ?? ''}
                imageUrl={item.imageUrl}
                imageAlt={item.title}
            meta={
              <span className="inline-flex items-center gap-2">
                <MapPin className="h-4 w-4 text-blue-600" />
                {String(item.extra?.location ?? '')}
              </span>
            }
            actionLabel="查看空间详情"
          />
      ))}
    </ScrollReveal>
  );
}
