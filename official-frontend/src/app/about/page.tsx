import { getPageContent, getSectionItems, getSiteMeta } from '@/shared/content';
import { PageHero } from '@/shared/ui';
import { SiteFooter, SiteHeader } from '@/widgets/site-shell';
import { AboutCardsGrid } from '@/features/about';

export async function generateMetadata() {
  return getSiteMeta('about', 'zh');
}

export default async function AboutPage() {
  const page = await getPageContent('about', 'zh');
  const aboutItems = getSectionItems(page, 'aboutItems');

  return (
    <main className="page-shell bg-white">
      <SiteHeader />
      <PageHero
        eyebrow={page.hero?.eyebrow ?? '关于我们'}
        title={page.hero?.title ?? ''}
        description={page.hero?.description ?? ''}
        backgroundImage={page.hero?.backgroundImage}
        dark={page.hero?.dark}
        fullBleedBackground
      />

      <AboutCardsGrid items={aboutItems} />

      <SiteFooter />
    </main>
  );
}
