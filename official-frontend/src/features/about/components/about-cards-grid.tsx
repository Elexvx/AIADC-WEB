import { Sparkles } from 'lucide-react';
import { resolveIcon } from '@/shared/content';
import type { CmsRecordBase } from '@/shared/content';

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
            <div key={item.id} className="rounded-lg border border-slate-200 bg-white p-6">
              <Icon className="h-6 w-6 text-blue-600" />
              <h2 className="mt-4 heading-3 text-slate-950">{item.title}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">{item.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
