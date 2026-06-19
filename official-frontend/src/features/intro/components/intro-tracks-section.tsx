import { Sparkles } from 'lucide-react';
import { Badge, Button, Card, CardContent, CardDescription, CardHeader, CardTitle, InternalLink, ScrollReveal, SectionHeading } from '@/shared/ui';
import { ROUTES } from '@/shared/config/routes';
import { resolveIcon } from '@/shared/content';
import type { CmsRecordBase } from '@/shared/content';

interface IntroTracksSectionProps {
  items: CmsRecordBase[];
}

export function IntroTracksSection({ items }: IntroTracksSectionProps) {
  return (
    <section id="tracks" className="py-8 sm:py-10">
      <div className="section-shell">
        <SectionHeading
          centered
          eyebrow="赛区设置"
          title="三大赛道同步开放"
          description="从概念孵化、原型构建到敏捷开发，覆盖智能应用开发的完整生命周期。"
          className="mx-auto max-w-4xl"
        />

        <ScrollReveal className="mt-8 grid gap-5 md:grid-cols-3" staggerChildren>
          {items.map((track) => {
            const Icon = resolveIcon(track.iconKey, Sparkles);

            return (
              <Card key={track.title} className="flex h-full flex-col rounded-lg border-slate-200 bg-white">
                <CardHeader className="space-y-5 p-6">
                  <div className="flex items-center justify-between gap-4">
                    <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 text-blue-600 ring-1 ring-blue-100">
                      <Icon className="h-6 w-6" />
                    </div>
                    <Badge className="border border-blue-100 bg-blue-50 text-blue-700">{track.subtitle ?? String(track.extra?.badge ?? '')}</Badge>
                  </div>
                  <div>
                    <CardTitle className="text-slate-950">{track.title}</CardTitle>
                    <CardDescription className="mt-3 text-sm leading-7 text-slate-600">{track.description}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="mt-auto px-6 pb-6 pt-0">
                  <Button asChild variant="outline" className="w-full rounded-md border-blue-200 text-blue-700 hover:bg-blue-50">
                    <InternalLink href={track.cta?.href ?? ROUTES.login}>{track.cta?.label ?? '查看评审标准'}</InternalLink>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </ScrollReveal>
      </div>
    </section>
  );
}
