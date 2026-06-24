import { Card, CardContent, CardDescription, CardHeader, CardTitle, ScrollReveal, SectionHeading } from '@/shared/ui';
import type { CmsRecordBase } from '@/shared/content';

const awardToneClasses: Record<string, string> = {
  gold: 'border-amber-200 bg-amber-50 text-amber-700',
  silver: 'border-slate-200 bg-slate-50 text-slate-700',
  bronze: 'border-orange-200 bg-orange-50 text-orange-700',
  slate: 'border-blue-200 bg-blue-50 text-blue-700',
};

interface IntroAwardsSectionProps {
  items: CmsRecordBase[];
}

export function IntroAwardsSection({ items }: IntroAwardsSectionProps) {
  return (
    <section id="awards" className="py-8 sm:py-10">
      <div className="section-shell">
        <SectionHeading
          centered
          eyebrow="奖项设置"
          title="奖金、证书与产业生态支持"
          description="明确的奖项资源帮助优秀项目获得更大的展示机会与后续成长空间。"
          className="mx-auto max-w-4xl"
        />

        <ScrollReveal className="mt-8 flex gap-5 overflow-x-auto pb-2 hide-scrollbar" staggerChildren>
          {items.map((award) => (
            <Card key={award.id} className="min-w-[17rem] flex-1 rounded-lg border-white bg-white/96">
              <CardHeader className="space-y-4 p-6">
                <div className={`grid h-12 w-12 place-items-center rounded-xl border text-xl ${awardToneClasses[String(award.extra?.tone ?? 'slate')] ?? awardToneClasses.slate}`}>
                  <span>{String(award.extra?.glyph ?? '★')}</span>
                </div>
                <div>
                  <CardTitle className="text-xl font-semibold tracking-wide text-slate-950">{award.title}</CardTitle>
                  <CardDescription className="mt-1 text-slate-500">{award.subtitle}</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="px-6 pb-6 pt-0">
                <div className="text-3xl font-semibold tracking-wide text-blue-700">{String(award.extra?.prize ?? '')}</div>
                <p className="mt-3 whitespace-pre-line text-sm leading-7 text-slate-600">{award.description}</p>
              </CardContent>
            </Card>
          ))}
        </ScrollReveal>
      </div>
    </section>
  );
}
