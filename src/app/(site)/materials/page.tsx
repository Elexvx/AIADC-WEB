import { getPageContent, getSectionItems } from '@/lib/content';
import { getPageMetadata } from '@/lib/metadata';
import { PageHero, ScrollReveal } from '@/components/ui';
import { MaterialTable } from '@/components/materials';

export async function generateMetadata() {
  return getPageMetadata('materials', '/materials');
}

export default async function MaterialsPage() {
  const page = await getPageContent('materials', 'zh');
  const materialItems = getSectionItems(page, 'materials');

  return (
    <main className="bg-background">

      <PageHero
        eyebrow={page.hero?.eyebrow ?? '材料下载'}
        title={page.hero?.title ?? ''}
        description={page.hero?.description ?? ''}
        backgroundImage={page.hero?.backgroundImage}
        backgroundLoading="lazy"
        dark={page.hero?.dark}
        fullBleedBackground
      />

      <ScrollReveal as="section" className="relative z-10 bg-[#f6f5f4] pt-8 pb-14 sm:pt-10 sm:pb-18" delay={40}>
        <div className="section-shell">
          <MaterialTable items={materialItems} />
        </div>
      </ScrollReveal>

    </main>
  );
}
