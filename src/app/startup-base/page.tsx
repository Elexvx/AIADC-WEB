import { MapPin, Sparkles } from 'lucide-react';
import { getPageContent, getSectionItems, getSiteMeta, resolveIcon } from '@/shared/content';
import { ContentCard, PageHero, ScrollReveal } from '@/shared/ui';
import { SiteFooter, SiteHeader } from '@/widgets/site-shell';

export const metadata = {
  ...getSiteMeta('startup-base', 'zh'),
};

export default function StartupBasePage() {
  const page = getPageContent('startup-base', 'zh');
  const baseItems = getSectionItems(page, 'baseItems');

  return (
    <main className="page-shell bg-white">
      <SiteHeader />
      <PageHero
        eyebrow={page.hero?.eyebrow ?? '创业基地'}
        title={page.hero?.title ?? ''}
        description={page.hero?.description ?? ''}
        backgroundImage={page.hero?.backgroundImage}
        dark={page.hero?.dark}
        fullBleedBackground
      />

      <ScrollReveal as="section" className="bg-white pt-8 pb-12 sm:pt-10 sm:pb-14" delay={40}>
        <ScrollReveal className="section-shell grid gap-5 md:grid-cols-3" staggerChildren>
          {baseItems.map((item) => {
            const Icon = resolveIcon(item.iconKey, Sparkles);
            return (
              <ContentCard
                key={item.id}
                title={item.title}
                description={item.description}
                imageUrl={item.imageUrl}
                imageAlt={item.title}
                icon={Icon}
                meta={
                  <span className="inline-flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-blue-600" />
                    {String(item.extra?.location ?? '')}
                  </span>
                }
                actionLabel="查看空间详情"
              />
            );
          })}
        </ScrollReveal>
      </ScrollReveal>

      <SiteFooter />
    </main>
  );
}
