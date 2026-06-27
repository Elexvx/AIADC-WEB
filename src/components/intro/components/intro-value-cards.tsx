import type { CmsRecordBase } from '@/lib/content/types';

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
              className="notion-card p-6"
            >
              <div className="text-[1.125rem] font-bold leading-7 tracking-[0] text-[#0075de]">{item.title}</div>
              <p className="notion-card-body mt-4 text-[15px] leading-8 sm:text-base">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
