import { getPageContent, getSectionItems } from '@/lib/content';
import { getPageMetadata } from '@/lib/metadata';
import { PageHero } from '@/components/ui';
import { AboutCardsGrid } from '@/components/about';

export async function generateMetadata() {
  return getPageMetadata('about', '/about');
}

export default async function AboutPage() {
  const page = await getPageContent('about', 'zh');
  const aboutItems = getSectionItems(page, 'aboutItems');

  return (
    <main className="bg-white">

      <PageHero
        eyebrow={page.hero?.eyebrow ?? '关于我们'}
        title={page.hero?.title ?? ''}
        description={page.hero?.description ?? ''}
        backgroundImage={page.hero?.backgroundImage}
        dark={page.hero?.dark}
        fullBleedBackground
      />

      <AboutCardsGrid items={aboutItems} />

    </main>
  );
}
