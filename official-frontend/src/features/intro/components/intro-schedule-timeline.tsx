import { CalendarDays } from 'lucide-react';
import { Badge, Card, CardContent, ScrollReveal, SectionHeading } from '@/shared/ui';
import type { TimelineItem } from '@/shared/content';

interface IntroScheduleTimelineProps {
  items: TimelineItem[];
}

export function IntroScheduleTimeline({ items }: IntroScheduleTimelineProps) {
  return (
    <section id="schedule" className="py-8 sm:py-10">
      <div className="section-shell">
        <SectionHeading
          centered
          eyebrow="赛事安排"
          title="关键节点清晰推进"
          description="从报名、作品提交、专家评审到总决赛，帮助参赛团队提前规划开发与答辩节奏。"
          className="mx-auto max-w-4xl"
        />

        <div className="mt-8 relative">
          <div className="absolute bottom-0 left-[1.15rem] top-0 hidden w-px bg-gradient-to-b from-blue-200 via-blue-100 to-transparent sm:block" />

          <div className="space-y-4 sm:space-y-5">
            {items.map((item, index) => (
              <div key={item.id} className="relative sm:pl-14">
                <div className="absolute left-0 top-7 hidden h-9 w-9 items-center justify-center rounded-full border border-blue-200 bg-white shadow-[0_10px_24px_rgba(37,99,235,0.12)] sm:flex">
                  <div className="h-3 w-3 rounded-full bg-blue-600" />
                </div>

                <Card className="rounded-lg border-slate-200 bg-white">
                  <CardContent className="p-6 sm:p-7">
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                      <div className="min-w-0">
                        <div className="text-xs font-semibold tracking-[0.18em] text-blue-400">STEP {String(index + 1).padStart(2, '0')}</div>
                        <h3 className="mt-3 text-2xl font-semibold tracking-wide text-slate-950">{item.title}</h3>
                        <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-sm font-bold text-blue-700">
                          <CalendarDays className="h-4 w-4" />
                          {item.date}
                        </div>
                      </div>

                      <div className="flex flex-col items-start gap-3 sm:max-w-[20rem] sm:items-end sm:text-right">
                        {item.featured ? <Badge className="border border-blue-100 bg-blue-50 text-blue-700">重点节点</Badge> : null}
                        <p className="text-sm leading-7 text-slate-600 sm:text-base">{item.detail}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
