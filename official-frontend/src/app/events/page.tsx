import { getPageContent, getSectionItems, getSiteMeta } from '@/shared/content';
import { PageHero, ScrollReveal } from '@/shared/ui';
import { SiteFooter, SiteHeader } from '@/widgets/site-shell';
import { EventFilterTabs } from '@/features/events/components/event-filter-tabs';

export async function generateMetadata() {
  return getSiteMeta('events', 'zh');
}

export default async function EventsPage() {
  const page = await getPageContent('events', 'zh');
  const eventFilters = getSectionItems(page, 'filters');
  const eventItems = getSectionItems(page, 'events');

  if (!eventItems.length) {
    return null;
  }

  return (
    <main className="page-shell bg-white">
      <SiteHeader />
      <PageHero
        eyebrow={page.hero?.eyebrow ?? '活动中心'}
        title={page.hero?.title ?? ''}
        description={page.hero?.description ?? ''}
        backgroundImage={page.hero?.backgroundImage}
        dark={page.hero?.dark}
        fullBleedBackground
      />

      <ScrollReveal as="section" className="bg-white pt-8 pb-3 sm:pt-10" delay={40}>
        <div className="section-shell">
          <EventFilterTabs filters={eventFilters} events={eventItems} />
        </div>
      </ScrollReveal>

      <ScrollReveal as="section" className="bg-white pb-12 sm:pb-14" delay={60}>
        <div className="section-shell">
        </div>
      </ScrollReveal>

      <SiteFooter />
    </main>
  );
}
