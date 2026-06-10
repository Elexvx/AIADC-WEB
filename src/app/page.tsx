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
} from '@/features/home';
import { SiteFooter, SiteHeader } from '@/widgets/site-shell';

export default function HomePage() {
  return (
    <main className="page-shell bg-white">
      <SiteHeader />
      <HomeHero />
      <HomeStatsGrid />
      <HomeGroupsSection />
      <HomeHighlightsSection />
      <HomePartnersSection />
      <HomeNewsSection />
      <HomeFaqSection />
      <HomeSignupSection />

      <SiteFooter />
    </main>
  );
}
