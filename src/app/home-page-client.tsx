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

export function HomePageClient() {
  const reveal = {
    distance: 16,
    threshold: 0.12,
  };

  return (
    <main className="bg-white">
      <ScrollReveal as="section" distance={10} threshold={0.08}>
        <HomeHero />
      </ScrollReveal>
      <ScrollReveal as="section" delay={40} {...reveal}>
        <HomeStatsGrid />
      </ScrollReveal>
      <ScrollReveal as="section" delay={80} lazyRender {...reveal}>
        <HomeGroupsSection />
      </ScrollReveal>
      <ScrollReveal as="section" delay={100} lazyRender {...reveal}>
        <HomeHighlightsSection />
      </ScrollReveal>
      <ScrollReveal as="section" delay={120} lazyRender {...reveal}>
        <HomePartnersSection />
      </ScrollReveal>
      <ScrollReveal as="section" delay={140} lazyRender {...reveal}>
        <HomeNewsSection />
      </ScrollReveal>
      <ScrollReveal as="section" delay={160} lazyRender {...reveal}>
        <HomeFaqSection />
      </ScrollReveal>
      <ScrollReveal as="section" delay={180} lazyRender {...reveal}>
        <HomeSignupSection />
      </ScrollReveal>
    </main>
  );
}
