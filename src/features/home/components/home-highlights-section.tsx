import { getSection, resolveIcon } from '@/shared/content';
import { usePageContent } from '@/shared/i18n/locale-provider';
import { Card, CardContent, SectionHeading } from '@/shared/ui';

export function HomeHighlightsSection() {
  const page = usePageContent('home');
  const section = getSection(page, 'highlights');
  const items = section?.items ?? [];

  return (
    <section className="bg-white pb-10 sm:pb-12">
      <div className="section-shell">
        <div className="mx-auto max-w-4xl text-center">
          <SectionHeading
            centered
            eyebrow="赛事亮点"
            title={section?.title ?? '让智能应用，从想法走向验证'}
            description={section?.description ?? '赛事围绕组别、赛道、时间线与作品评审构建一体化体验，让每个团队都能快速找到适合自己的成长路径。'}
          />
        </div>

        <div className="mt-9 grid gap-5 md:grid-cols-4">
          {items.map((item) => {
            const Icon = resolveIcon(item.iconKey);

            return (
              <Card key={item.title} className="rounded-lg border-white bg-white/96 shadow-[0_16px_42px_rgba(15,23,42,0.07)]">
                <CardContent className="flex min-h-56 flex-col p-5 sm:p-6">
                  <div className="grid h-12 w-12 place-items-center rounded-lg bg-gradient-to-br from-blue-50 to-cyan-50 text-blue-600 ring-1 ring-blue-100">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 text-lg font-bold tracking-[-0.04em] text-slate-950">{item.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{item.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
