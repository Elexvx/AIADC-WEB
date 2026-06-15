'use client';

import {
  HomeFaqSection,
  HomeGroupsSection,
  HomeHero,
  HomeHighlightsSection,
  HomeLatestActivitySection,
  HomeNewsSection,
  HomePartnersSection,
  HomeSignupSection,
  HomeStatsGrid,
} from '@/features/home';
import { ScrollReveal } from '@/shared/ui';
import { SiteFooter, SiteHeader } from '@/widgets/site-shell';

export default function HomePage() {
  const reveal = {
    distance: 16,
    threshold: 0.12,
  };

  return (
    <main className="page-shell bg-white">
      <SiteHeader />
      <ScrollReveal as="section" distance={10} threshold={0.08}>
        <HomeHero />
      </ScrollReveal>
      <ScrollReveal as="section" delay={40} {...reveal}>
        <HomeStatsGrid />
      </ScrollReveal>
      <ScrollReveal as="section" delay={60} {...reveal}>
        <HomeLatestActivitySection />
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

      <SiteFooter />
    </main>
  );
}
