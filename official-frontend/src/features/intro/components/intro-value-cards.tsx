import type { CmsRecordBase } from '@/shared/content';

interface IntroValueCardsProps {
  items: CmsRecordBase[];
}

export function IntroValueCards({ items }: IntroValueCardsProps) {
  return (
    <section className="bg-white pt-8 pb-8 sm:pt-10 sm:pb-10">
      <div className="section-shell">
        <div className="grid gap-5 md:grid-cols-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="rounded-lg border border-slate-200 bg-white p-6"
            >
              <div className="text-sm font-semibold tracking-wide text-blue-600">{item.title}</div>
              <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
