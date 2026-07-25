'use client';

import {
  HomeFaqSection,
  HomeGroupsSection,
  HomeHero,
  HomeHighlightsSection,
  HomeNewsSection,
  HomePartnersSection,
  HomeSignupSection,
  HomeStatsGrid,
} from '@/components/home';
import { ScrollReveal } from '@/components/ui';
import type { ArticleItem, CmsPageContent, NewsCategorySummary } from '@/lib/content/types';

type HomePageClientProps = {
  page: CmsPageContent;
  news: {
    categories: NewsCategorySummary[];
    articles: ArticleItem[];
  };
};

export function HomePageClient({ page, news }: HomePageClientProps) {
  const reveal = {
    distance: 16,
    threshold: 0.12,
  };

  return (
    <main className="bg-background">
      <ScrollReveal as="section" distance={10} threshold={0.08}>
        <HomeHero page={page} />
      </ScrollReveal>
      <ScrollReveal as="section" delay={40} {...reveal}>
        <HomeStatsGrid page={page} />
      </ScrollReveal>
      <ScrollReveal as="section" delay={80} lazyRender {...reveal}>
        <HomeGroupsSection page={page} />
      </ScrollReveal>
      <ScrollReveal as="section" delay={100} lazyRender {...reveal}>
        <HomeHighlightsSection page={page} />
      </ScrollReveal>
      <ScrollReveal as="section" delay={120} lazyRender {...reveal}>
        <HomePartnersSection page={page} />
      </ScrollReveal>
      <ScrollReveal as="section" delay={140} lazyRender {...reveal}>
        <HomeNewsSection news={news} />
      </ScrollReveal>
      <ScrollReveal as="section" delay={160} lazyRender {...reveal}>
        <HomeFaqSection page={page} />
      </ScrollReveal>
      <ScrollReveal as="section" delay={180} lazyRender {...reveal}>
        <HomeSignupSection page={page} />
      </ScrollReveal>
    </main>
  );
}
