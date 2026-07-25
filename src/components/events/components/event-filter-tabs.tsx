import { CalendarDays, ChevronRight, Clock3, MapPin } from 'lucide-react';
import { ROUTES } from '@/lib/config/routes';
import { Badge, Button } from '@/components/ui';
import type { CmsRecordBase } from '@/lib/content/types';

export interface EventFilterTabsProps {
  filters: CmsRecordBase[];
  events: CmsRecordBase[];
}

export function EventFilterTabs({ filters, events }: EventFilterTabsProps) {
  const runtimeFilters = buildActivityFilters(events, filters);
  const featuredEvent = events.find((item) => Boolean(item.extra?.featured)) ?? events[0];
  const regularEvents = events.filter((item) => item.id !== featuredEvent?.id);

  return (
    <div className="event-filter-shell">
      {runtimeFilters.map((filter, index) => (
        <input
          key={filter.id}
          id={`event-filter-${index}`}
          name="event-filter"
          type="radio"
          defaultChecked={filter.code === 'all'}
          className="sr-only"
        />
      ))}

      <style dangerouslySetInnerHTML={{ __html: buildFilterStyles(runtimeFilters) }} />

      <div className="event-filter-tabs mb-6 flex flex-wrap gap-3">
        {runtimeFilters.map((filter, index) => (
          <label
            key={filter.id}
            htmlFor={`event-filter-${index}`}
            className="cursor-pointer rounded-md border bg-secondary px-4 py-2.5 text-sm font-medium text-secondary-foreground transition-colors duration-100 hover:bg-accent hover:text-accent-foreground"
          >
            {filter.title}
          </label>
        ))}
      </div>

      <div className="event-filter-results">
        {featuredEvent && (
          <article
            data-event-category={featuredEvent.subtitle || featuredEvent.code}
            className="event-filter-card notion-card-elevated p-5 transition-colors duration-300 sm:p-6"
          >
            <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-3">
                  {featuredEvent.subtitle ? <Badge>{featuredEvent.subtitle}</Badge> : null}
                  <span className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-3 py-1 text-xs font-bold tracking-[0.12em] text-white">
                    当前重点活动
                  </span>
                </div>

                <h2 className="heading-2 notion-card-title mt-4 transition-colors duration-300">
                  {featuredEvent.title}
                </h2>
                {featuredEvent.description ? (
                  <p className="notion-card-body mt-3 max-w-4xl text-sm leading-7 transition-colors duration-300 sm:text-base sm:leading-8">
                    {featuredEvent.description}
                  </p>
                ) : null}

                <EventMeta event={featuredEvent} />
              </div>

              <Button asChild variant="outline" className="w-fit rounded-md lg:justify-self-end">
                <a href={featuredEvent.cta?.href ?? ROUTES.registration}>
                  {featuredEvent.cta?.label ?? '查看详情'}
                  <ChevronRight className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </article>
        )}

        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {regularEvents.map((event) => (
            <article
              key={event.id}
              data-event-category={event.subtitle || event.code}
              className="event-filter-card notion-card flex h-full min-h-72 flex-col p-5 transition-colors duration-300 hover:border-[#d4d4d4] sm:p-6"
            >
              <div className="mt-2 flex flex-wrap items-center gap-3">
                {event.subtitle ? <Badge>{event.subtitle}</Badge> : null}
                {event.extra?.date ? <span className="text-sm font-medium text-[#a39e98]">{String(event.extra.date)}</span> : null}
              </div>

              <h3 className="heading-3 notion-card-title mt-4 transition-colors duration-300">{event.title}</h3>
              {event.description ? (
                <p className="notion-card-body mt-3 line-clamp-2 text-sm leading-7 transition-colors duration-300">{event.description}</p>
              ) : null}

              <EventMeta event={event} compact />

              <Button asChild variant="outline" className="mt-4 w-fit rounded-md">
                <a href={event.cta?.href ?? ROUTES.registration}>
                  {event.cta?.label ?? '查看详情'}
                  <ChevronRight className="h-4 w-4" />
                </a>
              </Button>
            </article>
          ))}
        </div>

        {events.length === 0 && (
          <div className="rounded-lg border border-dashed border-slate-200 bg-slate-50 p-8 text-center text-sm text-slate-500 transition-colors duration-300 dark:border-white/12 dark:bg-slate-950/42 dark:text-slate-300">
            暂无活动。
          </div>
        )}
      </div>
    </div>
  );
}

function EventMeta({ event, compact = false }: { event: CmsRecordBase; compact?: boolean }) {
  return (
    <div className={`${compact ? 'mt-auto grid gap-2' : 'mt-4 flex flex-wrap gap-x-5 gap-y-2'} notion-card-body text-sm font-medium transition-colors duration-300`}>
      {event.extra?.date && !compact ? (
        <span className="inline-flex items-center gap-2">
          <CalendarDays className="h-4 w-4 text-[#0075de]" />
          {String(event.extra.date)}
        </span>
      ) : null}
      {event.extra?.time ? (
        <span className="inline-flex items-center gap-2">
          <Clock3 className="h-4 w-4 text-[#0075de]" />
          {String(event.extra.time)}
        </span>
      ) : null}
      {event.extra?.location ? (
        <span className="inline-flex items-start gap-2">
          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#0075de]" />
          <span>{String(event.extra.location)}</span>
        </span>
      ) : null}
    </div>
  );
}

function buildActivityFilters(events: CmsRecordBase[], fallbackFilters: CmsRecordBase[]): CmsRecordBase[] {
  const categories = Array.from(
    new Set(events.map((event) => event.subtitle).filter((subtitle): subtitle is string => Boolean(subtitle))),
  );

  if (!categories.length) {
    return fallbackFilters.length ? fallbackFilters : [allFilter()];
  }

  return [
    allFilter(),
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

function buildFilterStyles(filters: CmsRecordBase[]) {
  return filters
    .map((filter, index) => {
      const checkedSelector = `#event-filter-${index}:checked ~ .event-filter-tabs label[for="event-filter-${index}"]`;
      const activeStyle = `${checkedSelector}{border-color:#0075de;background:#0075de;color:#fff}`;

      if (filter.code === 'all') {
        return activeStyle;
      }

      return `${activeStyle}#event-filter-${index}:checked ~ .event-filter-results .event-filter-card:not([data-event-category="${cssEscape(filter.code)}"]){display:none}`;
    })
    .join('');
}

function cssEscape(value: string) {
  return value.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
}

function allFilter(): CmsRecordBase {
  return {
    id: 'activity-filter-all',
    code: 'all',
    locale: 'zh',
    title: '全部',
    sort: 0,
    status: 'published',
  };
}
