import { getPageContent, getSectionItems } from '@/lib/content';
import { getPageMetadata } from '@/lib/metadata';
import { PageHero, ScrollReveal } from '@/components/ui';
import { BaseCardGrid } from '@/components/startup-base';

export async function generateMetadata() {
  return getPageMetadata('startup-base', '/startup-base');
}

export default async function StartupBasePage() {
  const page = await getPageContent('startup-base', 'zh');
  const baseItems = getSectionItems(page, 'baseItems');

  return (
    <main className="bg-white">

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

    </main>
  );
}
