import { getPageContent, getSiteMeta } from '@/shared/content';
import { NewsTabs } from '@/features/news';
import { PageHero, ScrollReveal } from '@/shared/ui';
import { SiteFooter, SiteHeader } from '@/widgets/site-shell';

export async function generateMetadata() {
  return getSiteMeta('news', 'zh');
}

export default async function NewsPage() {
  const page = await getPageContent('news', 'zh');

  return (
    <main className="page-shell bg-white">
      <SiteHeader />
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

      <SiteFooter />
    </main>
  );
}
