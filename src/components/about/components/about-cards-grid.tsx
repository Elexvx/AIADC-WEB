import { Sparkles } from 'lucide-react';
import { resolveIcon } from '@/lib/content/icon-map';
import type { CmsRecordBase } from '@/lib/content/types';

interface AboutCardsGridProps {
  items: CmsRecordBase[];
}

export function AboutCardsGrid({ items }: AboutCardsGridProps) {
  return (
    <section className="bg-white pt-8 pb-12 sm:pt-10 sm:pb-14">
      <div className="section-shell grid gap-5 md:grid-cols-3">
        {items.map((item) => {
          const Icon = resolveIcon(item.iconKey, Sparkles);
          return (
            <div key={item.id} className="notion-card p-6">
              <div className="notion-sticker grid h-11 w-11 place-items-center">
                <Icon className="h-6 w-6" />
              </div>
              <h2 className="heading-3 notion-card-title mt-4">{item.title}</h2>
              <p className="notion-card-body mt-3 text-sm leading-7 sm:text-base">{item.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
