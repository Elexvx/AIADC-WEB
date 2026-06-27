import { getPageContent, getSectionItems } from '@/lib/content';
import { getPageMetadata } from '@/lib/metadata';
import { PageHero, ScrollReveal } from '@/components/ui';
import {
  IntroValueCards,
  IntroScheduleTimeline,
  IntroTracksSection,
  IntroContactSection,
} from '@/components/intro';

export async function generateMetadata() {
  return getPageMetadata('intro', '/intro');
}

export default async function IntroPage() {
  const page = await getPageContent('intro', 'zh');
  const valueCards = getSectionItems(page, 'valueCards');
  const schedule = getSectionItems(page, 'schedule');
  const tracks = getSectionItems(page, 'tracks');
  const contacts = getSectionItems(page, 'contacts');

  return (
    <main className="bg-white text-slate-950">

      <PageHero
        eyebrow={page.hero?.eyebrow ?? '大赛简介'}
        title={page.hero?.title ?? ''}
        description={page.hero?.description ?? ''}
        backgroundImage={page.hero?.backgroundImage}
        dark={page.hero?.dark}
        fullBleedBackground
        titleAs="h2"
      />

      <ScrollReveal as="section" delay={40}>
        <IntroValueCards items={valueCards} />
      </ScrollReveal>

      <ScrollReveal as="section" delay={60}>
        <IntroScheduleTimeline items={schedule} />
      </ScrollReveal>

      <ScrollReveal as="section" delay={100}>
        <IntroTracksSection items={tracks} />
      </ScrollReveal>

      <ScrollReveal as="section" delay={120}>
        <IntroContactSection items={contacts} />
      </ScrollReveal>

    </main>
  );
}
