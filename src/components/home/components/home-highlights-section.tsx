import { resolveIcon } from '@/lib/content/icon-map';
import { getSection } from '@/lib/content/utils';
import type { CmsPageContent } from '@/lib/content/types';
import { Card } from '@/components/ui';
import { HomeSectionTitle } from './home-section-title';

export function HomeHighlightsSection({ page }: { page: CmsPageContent }) {
  const section = getSection(page, 'highlights');
  const items = section?.items ?? [];

  return (
    <section id="tracks" className="bg-white py-14 transition-colors duration-300 sm:py-18">
      <div className="section-shell">
        <HomeSectionTitle title={section?.title ?? '赛道设置'} description={section?.description} />

        <div className="grid gap-6 md:grid-cols-3">
          {items.map((item) => {
            const Icon = resolveIcon(item.iconKey);

            return (
              <Card key={item.title} className="notion-doc-card group transition-colors duration-200">
                <div className="notion-doc-content text-left">
                  <div className="flex items-start justify-between gap-5">
                    <div className="notion-doc-icon">
                      <Icon className="h-6 w-6 stroke-[1.75]" />
                    </div>
                  </div>
                  <div className="notion-doc-main">
                    <h3 className="notion-doc-title !text-[#0075de] transition-colors duration-300">{item.title}</h3>
                    <p className="notion-doc-body overflow-hidden transition-colors duration-300 [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3]">
                      {item.description}
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
