import { HelpCircle } from 'lucide-react';
import { getSectionItems } from '@/lib/content/utils';
import type { CmsPageContent } from '@/lib/content/types';
import { Card, CardContent } from '@/components/ui';
import { HomeSectionTitle } from './home-section-title';

export function HomeFaqSection({ page }: { page: CmsPageContent }) {
  const faqItems = getSectionItems(page, 'faq');

  return (
    <section id="faq" className="bg-background py-14 transition-colors duration-300 sm:py-18">
      <div className="section-shell">
        <HomeSectionTitle title="常见问题" description="把高频问题前置到官网，提升移动端与桌面端的信息查找效率。" centered />
        <div className="mt-9 grid gap-4 md:grid-cols-2">
          {faqItems.map((item) => (
            <Card key={item.id} className="notion-card">
              <CardContent className="flex min-h-36 items-start gap-4 !p-6">
                <div className="notion-sticker grid h-9 w-9 shrink-0 place-items-center">
                  <HelpCircle className="h-5 w-5" />
                </div>
                <div className="min-w-0 pt-0.5">
                  <h3 className="heading-4 notion-card-title transition-colors duration-300">{item.title}</h3>
                  <p className="notion-card-body mt-3 text-sm leading-7 transition-colors duration-300">{item.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
