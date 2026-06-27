import { CalendarDays } from 'lucide-react';
import { Badge, Card, CardContent, ScrollReveal, SectionHeading } from '@/components/ui';
import type { TimelineItem } from '@/lib/content/types';

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

        <div className="relative mx-auto mt-8 max-w-5xl">
          <div className="absolute bottom-0 left-[1.15rem] top-0 hidden w-px bg-gradient-to-b from-[#0075de]/30 via-[#e6e6e6] to-transparent sm:block" />

          <div className="space-y-4 sm:space-y-5">
            {items.map((item, index) => (
              <div key={item.id} className="relative sm:pl-14">
                <div className="absolute left-0 top-7 hidden h-9 w-9 items-center justify-center rounded-full border border-[#e6e6e6] bg-white sm:flex">
                  <div className="h-3 w-3 rounded-full bg-[#0075de]" />
                </div>

                <Card className="notion-card">
                  <CardContent className="p-5 sm:p-6">
                    <div className="grid gap-5 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:items-start">
                      <div className="min-w-0">
                        <div className="text-xs font-semibold tracking-[0.01em] text-[#0075de]">STEP {String(index + 1).padStart(2, '0')}</div>
                        <h3 className="notion-card-title mt-3 text-2xl">{item.title}</h3>
                        <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#f6f5f4] px-3 py-1.5 text-sm font-semibold text-[#0075de]">
                          <CalendarDays className="h-4 w-4" />
                          {item.date}
                        </div>
                      </div>

                      <div className="flex flex-col items-start gap-3 md:pt-1">
                        {item.featured ? <Badge>重点节点</Badge> : null}
                        <p className="notion-card-body max-w-2xl text-sm leading-7 sm:text-base">{item.detail}</p>
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
