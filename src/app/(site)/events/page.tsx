import { getActivities, getPageContent } from '@/lib/content';
import { getPageMetadata } from '@/lib/metadata';
import { PageHero, ScrollReveal } from '@/components/ui';
import { EventFilterTabs } from '@/components/events/components/event-filter-tabs';

export async function generateMetadata() {
  return getPageMetadata('events', '/events');
}

export default async function EventsPage() {
  const [page, activityItems] = await Promise.all([
    getPageContent('events', 'zh'),
    getActivities('zh'),
  ]);

  return (
    <main className="bg-background">

      <PageHero
        eyebrow={page.hero?.eyebrow ?? '活动中心'}
        title={page.hero?.title ?? ''}
        description={page.hero?.description ?? ''}
        backgroundImage={page.hero?.backgroundImage}
      />

      <ScrollReveal as="section" className="bg-white pt-8 pb-3 sm:pt-10" delay={40}>
        <div className="section-shell">
          <EventFilterTabs events={activityItems} />
        </div>
      </ScrollReveal>

    </main>
  );
}
