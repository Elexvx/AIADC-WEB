import { getPageContent, getSectionItems, getSiteMeta } from '@/shared/content';
import { PageHero, ScrollReveal } from '@/shared/ui';
import { SiteFooter, SiteHeader } from '@/widgets/site-shell';
import {
  IntroValueCards,
  IntroScheduleTimeline,
  IntroAwardsSection,
  IntroTracksSection,
  IntroContactSection,
} from '@/features/intro';

export async function generateMetadata() {
  return getSiteMeta('intro', 'zh');
}

export default async function IntroPage() {
  const page = await getPageContent('intro', 'zh');
  const valueCards = getSectionItems(page, 'valueCards');
  const schedule = getSectionItems(page, 'schedule');
  const awards = getSectionItems(page, 'awards');
  const tracks = getSectionItems(page, 'tracks');
  const contacts = getSectionItems(page, 'contacts');

  return (
    <main className="page-shell bg-white text-slate-950">
      <SiteHeader />
      <PageHero
        eyebrow={page.hero?.eyebrow ?? '大赛简介'}
        title={page.hero?.title ?? ''}
        description={page.hero?.description ?? ''}
        backgroundImage={page.hero?.backgroundImage}
        dark={page.hero?.dark}
        fullBleedBackground
      />

      <ScrollReveal as="section" delay={40}>
        <IntroValueCards items={valueCards} />
      </ScrollReveal>

      <ScrollReveal as="section" delay={60}>
        <IntroScheduleTimeline items={schedule} />
      </ScrollReveal>

      <ScrollReveal as="section" delay={80}>
        <IntroAwardsSection items={awards} />
      </ScrollReveal>

      <ScrollReveal as="section" delay={100}>
        <IntroTracksSection items={tracks} />
      </ScrollReveal>

      <ScrollReveal as="section" delay={120}>
        <IntroContactSection items={contacts} />
      </ScrollReveal>

      <SiteFooter />
    </main>
  );
}
