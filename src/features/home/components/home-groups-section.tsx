import { ChevronRight } from 'lucide-react';
import { ROUTES } from '@/shared/config/routes';
import { getSection, resolveIcon } from '@/shared/content';
import { usePageContent } from '@/shared/i18n/locale-provider';
import { Card, CardContent, InternalLink, SectionHeading } from '@/shared/ui';

export function HomeGroupsSection() {
  const page = usePageContent('home');
  const section = getSection(page, 'groups');
  const groups = section?.items ?? [];

  return (
    <section id="groups" className="bg-white py-10 sm:py-12">
      <div className="section-shell">
        <div className="mx-auto max-w-4xl text-center">
          <SectionHeading centered eyebrow="参赛对象" title={section?.title ?? '覆盖多元青年创新团队'} description={section?.description ?? '以团队形式参赛，每队 1-5 人，可跨校组队，按照组别选择对应赛道。'} />
        </div>

        <div className="mt-9 grid gap-5 md:grid-cols-3">
          {groups.map((group) => {
            const Icon = resolveIcon(group.iconKey);

            return (
              <Card key={group.title} className="rounded-lg border-white bg-white/96 shadow-[0_16px_42px_rgba(15,23,42,0.07)]">
                <CardContent className="flex h-full min-h-72 flex-col p-5 sm:p-6">
                  <div className="grid h-12 w-12 place-items-center rounded-lg bg-gradient-to-br from-blue-50 to-cyan-50 text-blue-600 ring-1 ring-blue-100">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="mt-5 min-w-0">
                    <h3 className="text-lg font-bold tracking-[-0.04em] text-slate-950">{group.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-slate-600">{group.description}</p>
                  </div>
                  <InternalLink href={group.cta?.href ?? ROUTES.login} className="mt-auto inline-flex h-9 w-fit shrink-0 items-center gap-2 rounded-md bg-blue-50 px-3 text-sm font-semibold text-blue-700 transition-colors hover:bg-blue-100">
                    {group.cta?.label ?? '了解报名条件'}
                    <ChevronRight className="h-4 w-4" />
                  </InternalLink>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
