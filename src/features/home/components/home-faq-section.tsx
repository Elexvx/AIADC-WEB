import { HelpCircle } from 'lucide-react';
import { homeFaqItems } from '@/features/home/config/home-content';
import { Card, CardContent, SectionHeading } from '@/shared/ui';

export function HomeFaqSection() {
  return (
    <section id="faq" className="bg-white py-10 sm:py-12">
      <div className="section-shell">
        <SectionHeading centered eyebrow="常见问题" title="报名与作品提交问题速查" description="把高频问题前置到官网，提升移动端与桌面端的信息查找效率。" />
        <div className="mt-9 grid gap-4 md:grid-cols-2">
          {homeFaqItems.map((item) => (
            <Card key={item.question} className="rounded-lg border-slate-200 bg-white shadow-[0_14px_36px_rgba(15,23,42,0.06)]">
              <CardContent className="flex min-h-36 items-start gap-4 !p-6">
                <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-blue-50 text-blue-600 ring-1 ring-blue-100">
                  <HelpCircle className="h-5 w-5" />
                </div>
                <div className="min-w-0 pt-0.5">
                  <h3 className="text-base font-black leading-6 tracking-[-0.03em] text-slate-950">{item.question}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{item.answer}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
