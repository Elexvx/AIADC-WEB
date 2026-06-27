import { getActivities, getPageContent } from '@/lib/content';
import { getPageMetadata } from '@/lib/metadata';
import { PageHero, ScrollReveal } from '@/components/ui';
import { EventFilterTabs } from '@/components/events/components/event-filter-tabs';
import type { CmsRecordBase } from '@/lib/content/types';

export async function generateMetadata() {
  return getPageMetadata('events', '/events');
}

export default async function EventsPage() {
  const page = await getPageContent('events', 'zh');
  const activityItems = await getActivities('zh');
  const eventFilters = buildActivityFilters(activityItems);

  return (
    <main className="bg-white">

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
          <EventFilterTabs filters={eventFilters} events={activityItems} />
        </div>
      </ScrollReveal>

      <ScrollReveal as="section" className="bg-white pb-12 sm:pb-14" delay={60}>
        <div className="section-shell">
        </div>
      </ScrollReveal>

    </main>
  );
}

function buildActivityFilters(events: CmsRecordBase[]): CmsRecordBase[] {
  const categories = Array.from(
    new Set(events.map((event) => event.subtitle).filter((subtitle): subtitle is string => Boolean(subtitle))),
  );

  return [
    {
      id: 'activity-filter-all',
      code: 'all',
      locale: 'zh',
      title: '全部',
      sort: 0,
      status: 'published',
    },
    ...categories.map((category, index) => ({
      id: `activity-filter-${index + 1}`,
      code: category,
      locale: 'zh' as const,
      title: category,
      sort: index + 1,
      status: 'published' as const,
    })),
  ];
}
