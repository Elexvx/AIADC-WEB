import { resolveIcon } from '@/lib/content/icon-map';
import { getSection } from '@/lib/content/utils';
import { usePageContent } from '@/lib/i18n/locale-provider';
import { Card } from '@/components/ui';
import { HomeSectionTitle } from './home-section-title';

export function HomeGroupsSection() {
  const page = usePageContent('home');
  const section = getSection(page, 'groups');
  const groups = section?.items ?? [];

  return (
    <section id="groups" className="bg-white py-11 transition-colors duration-300 sm:py-14">
      <div className="section-shell">
        <HomeSectionTitle title={section?.title ?? '参赛组别'} description={section?.description} />

        <div className="grid gap-7 md:grid-cols-3">
          {groups.map((group) => {
            const Icon = resolveIcon(group.iconKey);

            return (
              <Card key={group.title} className="notion-doc-card group transition-colors duration-200">
                <div className="notion-doc-content text-left">
                  <div className="flex items-start justify-between gap-5">
                    <div className="notion-doc-icon">
                      <Icon className="h-6 w-6 stroke-[1.75]" />
                    </div>
                  </div>
                  <div className="notion-doc-main">
                    <h3 className="notion-doc-title !text-[#0075de] transition-colors duration-300">{group.title}</h3>
                    <p className="notion-doc-body overflow-hidden transition-colors duration-300 [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3]">
                      {group.description}
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
