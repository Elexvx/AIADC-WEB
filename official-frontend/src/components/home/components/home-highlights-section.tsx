import { resolveIcon } from '@/lib/content/icon-map';
import { getSection } from '@/lib/content/utils';
import { usePageContent } from '@/lib/i18n/locale-provider';
import { Card } from '@/components/ui';
import { HomeSectionTitle } from './home-section-title';

export function HomeHighlightsSection() {
  const page = usePageContent('home');
  const section = getSection(page, 'highlights');
  const items = section?.items ?? [];

  return (
    <section id="tracks" className="py-16 transition-colors duration-300 sm:py-20">
      <div className="section-shell">
        <HomeSectionTitle title={section?.title ?? '赛道设置'} description={section?.description} />

        <div className="grid gap-7 md:grid-cols-3">
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
