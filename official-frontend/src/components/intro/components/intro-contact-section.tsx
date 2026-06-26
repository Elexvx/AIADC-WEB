import { Mail } from 'lucide-react';
import { ScrollReveal, SectionHeading } from '@/components/ui';
import { resolveIcon } from '@/lib/content/icon-map';
import type { CmsRecordBase } from '@/lib/content/types';

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
              <div key={item.title} className="notion-card p-6">
                <div className="notion-sticker grid h-11 w-11 place-items-center">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="heading-4 notion-card-title mt-4">{item.title}</h3>
                <p className="notion-card-body mt-2 break-words text-sm leading-7">{item.description}</p>
              </div>
            );
          })}
        </ScrollReveal>
      </div>
    </section>
  );
}
