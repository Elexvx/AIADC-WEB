import { getSection, resolveIcon } from '@/shared/content';
import { usePageContent } from '@/shared/i18n/locale-provider';
import { Card, CardContent } from '@/shared/ui';
import { HomeSectionTitle } from './home-section-title';

export function HomeGroupsSection() {
  const page = usePageContent('home');
  const section = getSection(page, 'groups');
  const groups = section?.items ?? [];

  return (
    <section id="groups" className="bg-white py-9 sm:py-11">
      <div className="section-shell">
        <HomeSectionTitle title={section?.title ?? '参赛组别'} />

        <div className="grid gap-7 md:grid-cols-3">
          {groups.map((group) => {
            const Icon = resolveIcon(group.iconKey);

            return (
              <Card key={group.title} className="rounded-md border-slate-200 bg-white shadow-none transition-colors hover:border-blue-200">
                <CardContent className="flex h-[172px] flex-col items-center justify-center px-6 py-5 text-center sm:h-[182px]">
                  <div>
                    <Icon className="mx-auto h-9 w-9 stroke-[1.7] text-[#0b55b7]" />
                    <h3 className="mt-3 text-xl font-semibold tracking-wide text-[#082656]">{group.title}</h3>
                    <p className="mx-auto mt-3 max-w-[18rem] overflow-hidden text-sm leading-6 text-slate-600 [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3]">{group.description}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
