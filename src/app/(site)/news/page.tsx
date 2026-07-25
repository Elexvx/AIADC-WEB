import { getContentBundle } from '@/lib/content';
import { getPageMetadata } from '@/lib/metadata';
import { NewsTabs } from '@/components/news';
import { PageHero, ScrollReveal } from '@/components/ui';

export async function generateMetadata() {
  return getPageMetadata('news', '/news');
}

export default async function NewsPage() {
  const content = await getContentBundle('zh');
  const page = content.pages.news;

  return (
    <main className="bg-background">

      <PageHero
        eyebrow={page.hero?.eyebrow ?? '新闻中心'}
        title={page.hero?.title ?? ''}
        description={page.hero?.description ?? ''}
        backgroundImage={page.hero?.backgroundImage}
        dark={page.hero?.dark}
        fullBleedBackground
        overlayClassName="bg-[linear-gradient(120deg,rgba(33,49,131,0.78),rgba(33,49,131,0.64),rgba(33,49,131,0.72))]"
      />

      <ScrollReveal as="section" className="bg-white pt-8 pb-12 sm:pt-10 sm:pb-14" delay={40}>
        <div className="section-shell">
          <NewsTabs news={content.news} />
        </div>
      </ScrollReveal>

    </main>
  );
}
