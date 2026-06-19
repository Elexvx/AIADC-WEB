import { HelpCircle } from 'lucide-react';
import { getSectionItems } from '@/shared/content';
import { usePageContent } from '@/shared/i18n/locale-provider';
import { Card, CardContent, SectionHeading } from '@/shared/ui';

export function HomeFaqSection() {
  const page = usePageContent('home');
  const faqItems = getSectionItems(page, 'faq');

  return (
    <section id="faq" className="bg-white py-10 sm:py-12">
      <div className="section-shell">
        <SectionHeading centered eyebrow="常见问题" title="报名与作品提交问题速查" description="把高频问题前置到官网，提升移动端与桌面端的信息查找效率。" />
        <div className="mt-9 grid gap-4 md:grid-cols-2">
          {faqItems.map((item) => (
            <Card key={item.id} className="rounded-lg border-slate-200 bg-white">
              <CardContent className="flex min-h-36 items-start gap-4 !p-6">
                <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-blue-50 text-blue-600 ring-1 ring-blue-100">
                  <HelpCircle className="h-5 w-5" />
                </div>
                <div className="min-w-0 pt-0.5">
                  <h3 className="heading-4 text-slate-950">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
