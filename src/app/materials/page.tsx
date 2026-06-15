import { getPageContent, getSectionItems, getSiteMeta } from '@/shared/content';
import { PageHero, ScrollReveal } from '@/shared/ui';
import { SiteFooter, SiteHeader } from '@/widgets/site-shell';
import { MaterialTable, MaterialCtaBanner } from '@/features/materials';

export const metadata = {
  ...getSiteMeta('materials', 'zh'),
};

export default function MaterialsPage() {
  const page = getPageContent('materials', 'zh');
  const materialItems = getSectionItems(page, 'materials');

  return (
    <main className="page-shell bg-white">
      <SiteHeader />
      <PageHero
        eyebrow={page.hero?.eyebrow ?? '材料下载'}
        title={page.hero?.title ?? ''}
        description={page.hero?.description ?? ''}
        backgroundImage={page.hero?.backgroundImage}
        dark={page.hero?.dark}
        fullBleedBackground
      />

      <ScrollReveal as="section" className="relative z-10 bg-white pt-8 pb-14 sm:pt-10 sm:pb-16" delay={40}>
        <div className="section-shell">
          <MaterialTable items={materialItems} />
          <MaterialCtaBanner banner={page.ctaBanner ?? {}} />
        </div>
      </ScrollReveal>

      <SiteFooter />
    </main>
  );
}
