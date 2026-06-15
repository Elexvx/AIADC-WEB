import { getPageContent, getSectionItems, getSiteMeta } from '@/shared/content';
import { PageHero, ScrollReveal } from '@/shared/ui';
import { SiteFooter, SiteHeader } from '@/widgets/site-shell';
import { BaseCardGrid } from '@/features/startup-base';

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
        <BaseCardGrid items={baseItems} />
      </ScrollReveal>

      <SiteFooter />
    </main>
  );
}
