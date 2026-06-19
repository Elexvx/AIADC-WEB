import { Mail } from 'lucide-react';
import { ScrollReveal, SectionHeading } from '@/shared/ui';
import { resolveIcon } from '@/shared/content';
import type { CmsRecordBase } from '@/shared/content';

interface IntroContactSectionProps {
  items: CmsRecordBase[];
}

export function IntroContactSection({ items }: IntroContactSectionProps) {
  return (
    <section id="contact" className="py-8 pb-14 sm:py-10 sm:pb-16">
      <div className="section-shell">
        <SectionHeading
          centered
          eyebrow="联系我们"
          title="组委会咨询与赛事服务"
          description="面向院校组织、团队报名、材料提交与媒体合作提供统一咨询入口。"
          className="mx-auto max-w-4xl"
        />

        <ScrollReveal className="mt-8 grid gap-4 sm:grid-cols-3" staggerChildren>
          {items.map((item) => {
            const Icon = resolveIcon(item.iconKey, Mail);

            return (
              <div key={item.title} className="rounded-lg border border-slate-200 bg-white p-6">
                <Icon className="h-6 w-6 text-blue-600" />
                <h3 className="mt-4 heading-4 text-slate-950">{item.title}</h3>
                <p className="mt-2 break-words text-sm leading-7 text-slate-600">{item.description}</p>
              </div>
            );
          })}
        </ScrollReveal>
      </div>
    </section>
  );
}
