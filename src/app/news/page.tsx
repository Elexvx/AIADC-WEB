import { getPageContent } from '@/lib/content';
import { getPageMetadata } from '@/lib/metadata';
import { NewsTabs } from '@/components/news';
import { PageHero, ScrollReveal } from '@/components/ui';

export async function generateMetadata() {
  return getPageMetadata('news', '/news');
}

export default async function NewsPage() {
  const page = await getPageContent('news', 'zh');

  return (
    <main className="bg-white">

      <PageHero
        eyebrow={page.hero?.eyebrow ?? '新闻中心'}
        title={page.hero?.title ?? ''}
        description={page.hero?.description ?? ''}
        backgroundImage={page.hero?.backgroundImage}
        dark={page.hero?.dark}
        fullBleedBackground
      />

      <ScrollReveal as="section" className="bg-white pt-8 pb-12 sm:pt-10 sm:pb-14" delay={40}>
        <div className="section-shell">
          <NewsTabs />
        </div>
      </ScrollReveal>

    </main>
  );
}
