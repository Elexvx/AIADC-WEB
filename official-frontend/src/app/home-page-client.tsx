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
      <ScrollReveal as="section" delay={80} {...reveal}>
        <HomeGroupsSection />
      </ScrollReveal>
      <ScrollReveal as="section" delay={100} {...reveal}>
        <HomeHighlightsSection />
      </ScrollReveal>
      <ScrollReveal as="section" delay={120} {...reveal}>
        <HomePartnersSection />
      </ScrollReveal>
      <ScrollReveal as="section" delay={140} {...reveal}>
        <HomeNewsSection />
      </ScrollReveal>
      <ScrollReveal as="section" delay={160} {...reveal}>
        <HomeFaqSection />
      </ScrollReveal>
      <ScrollReveal as="section" delay={180} {...reveal}>
        <HomeSignupSection />
      </ScrollReveal>
    </main>
  );
}
