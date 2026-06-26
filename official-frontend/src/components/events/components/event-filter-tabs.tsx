'use client';

import { useEffect, useMemo, useState } from 'react';
import { CalendarDays, ChevronRight, Clock3, MapPin } from 'lucide-react';
import { Badge, Button, InternalLink } from '@/components/ui';
import type { BadgeInfo, CmsRecordBase } from '@/lib/content/types';

export interface EventFilterTabsProps {
  filters: CmsRecordBase[];
  events: CmsRecordBase[];
}

type LumiraApiResponse<T> = {
  data?: T;
};

type LumiraPageResponse<T> = {
  records?: T[];
};

type LumiraActivityRecord = {
  id?: number | string;
  code?: string;
  locale?: string;
  title?: string;
  subtitle?: string | null;
  description?: string | null;
  imageUrl?: string | null;
  iconKey?: string | null;
  sort?: number | null;
  status?: string | null;
  tags?: string | null;
  ctaLabel?: string | null;
  ctaHref?: string | null;
  badgeText?: string | null;
  badgeTone?: BadgeInfo['tone'] | null;
  activityDate?: string | null;
  activityTime?: string | null;
  location?: string | null;
  featured?: boolean | null;
};

const DEFAULT_LUMIRA_API_BASE = 'http://localhost:8080';
const DEFAULT_ACTIVITIES_PATH = '/api/v2/aiadc/activities';

export function EventFilterTabs({ filters, events }: EventFilterTabsProps) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [runtimeEvents, setRuntimeEvents] = useState<CmsRecordBase[]>(events);
  const runtimeFilters = useMemo(() => buildActivityFilters(runtimeEvents, filters), [filters, runtimeEvents]);

  useEffect(() => {
    let ignore = false;

    fetchRuntimeActivities()
      .then((items) => {
        if (!ignore && items.length) {
          setRuntimeEvents(items);
          setActiveFilter('all');
        }
      })
      .catch(() => {
        // The static site must remain usable when Lumira is offline or requires auth.
      });

    return () => {
      ignore = true;
    };
  }, []);

  const filteredEvents = activeFilter === 'all'
    ? runtimeEvents
    : runtimeEvents.filter((event) => event.subtitle === activeFilter || event.code === activeFilter);

  const featuredEvent = filteredEvents.find((item) => Boolean(item.extra?.featured)) ?? filteredEvents[0];
  const regularEvents = filteredEvents.filter((item) => item.id !== featuredEvent?.id);

  return (
    <>
      <div className="mb-6 flex flex-wrap gap-3">
        {runtimeFilters.map((filter) => (
          <button
            key={filter.id}
            type="button"
            onClick={() => setActiveFilter(filter.code)}
            className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-200 ${
              activeFilter === filter.code
                ? 'bg-[#0075de] text-white'
                : 'bg-white text-[#615d59] ring-1 ring-[#e6e6e6] hover:bg-[#f6f5f4]'
            }`}
          >
            {filter.title}
          </button>
        ))}
      </div>

      {featuredEvent && (
        <article className="notion-card-elevated p-5 transition-colors duration-300 sm:p-6">
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

              <div className="notion-card-body mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium transition-colors duration-300">
                {featuredEvent.extra?.date ? (
                  <span className="inline-flex items-center gap-2">
                    <CalendarDays className="h-4 w-4 text-[#0075de]" />
                    {String(featuredEvent.extra.date)}
                  </span>
                ) : null}
                {featuredEvent.extra?.time ? (
                  <span className="inline-flex items-center gap-2">
                    <Clock3 className="h-4 w-4 text-[#0075de]" />
                    {String(featuredEvent.extra.time)}
                  </span>
                ) : null}
                {featuredEvent.extra?.location ? (
                  <span className="inline-flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-[#0075de]" />
                    {String(featuredEvent.extra.location)}
                  </span>
                ) : null}
              </div>
            </div>

            <Button asChild variant="outline" className="w-fit rounded-md lg:justify-self-end">
              <InternalLink href={featuredEvent.cta?.href ?? '/login'}>
                {featuredEvent.cta?.label ?? '查看详情'}
                <ChevronRight className="h-4 w-4" />
              </InternalLink>
            </Button>
          </div>
        </article>
      )}

      <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {regularEvents.map((event) => (
          <article
            key={event.id}
            className="notion-card flex h-full min-h-72 flex-col p-5 transition-colors duration-300 hover:border-[#d4d4d4] sm:p-6"
          >
            <div className="mt-2 flex flex-wrap items-center gap-3">
              {event.subtitle ? <Badge>{event.subtitle}</Badge> : null}
              {event.extra?.date ? <span className="text-sm font-medium text-[#a39e98]">{String(event.extra.date)}</span> : null}
            </div>

            <h3 className="heading-3 notion-card-title mt-4 transition-colors duration-300">{event.title}</h3>
            {event.description ? (
              <p className="notion-card-body mt-3 line-clamp-2 text-sm leading-7 transition-colors duration-300">{event.description}</p>
            ) : null}

            <div className="notion-card-body mt-auto grid gap-2 text-sm font-medium transition-colors duration-300">
              {event.extra?.time ? (
                <div className="flex items-center gap-2">
                  <Clock3 className="h-4 w-4 text-[#0075de]" />
                  {String(event.extra.time)}
                </div>
              ) : null}
              {event.extra?.location ? (
                <div className="flex items-start gap-2">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#0075de]" />
                  <span>{String(event.extra.location)}</span>
                </div>
              ) : null}
            </div>

            <Button asChild variant="outline" className="mt-4 w-fit rounded-md">
              <InternalLink href={event.cta?.href ?? '/login'}>
                {event.cta?.label ?? '查看详情'}
                <ChevronRight className="h-4 w-4" />
              </InternalLink>
            </Button>
          </article>
        ))}
      </div>

      {filteredEvents.length === 0 && (
        <div className="rounded-lg border border-dashed border-slate-200 bg-slate-50 p-8 text-center text-sm text-slate-500 transition-colors duration-300 dark:border-white/12 dark:bg-slate-950/42 dark:text-slate-300">
          该分类下暂无活动。
        </div>
      )}
    </>
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

async function fetchRuntimeActivities(): Promise<CmsRecordBase[]> {
  const url = createActivitiesUrl();
  const response = await fetch(url.toString(), { cache: 'no-store' });
  if (!response.ok) {
    return [];
  }

  const payload = (await response.json()) as LumiraApiResponse<LumiraPageResponse<LumiraActivityRecord>>;
  return (payload.data?.records || [])
    .map(toActivityItem)
    .filter((activity): activity is CmsRecordBase => Boolean(activity))
    .filter((activity) => activity.status === 'published')
    .sort((left, right) => left.sort - right.sort);
}

function createActivitiesUrl() {
  const apiBase = trimTrailingSlash(process.env.NEXT_PUBLIC_LUMIRA_API_BASE || process.env.NEXT_PUBLIC_API_BASE || DEFAULT_LUMIRA_API_BASE);
  const path = process.env.NEXT_PUBLIC_LUMIRA_ACTIVITIES_PATH || DEFAULT_ACTIVITIES_PATH;
  const url = new URL(path, `${apiBase}/`);
  url.searchParams.set('locale', 'zh');
  url.searchParams.set('status', 'published');
  url.searchParams.set('pageNo', '1');
  url.searchParams.set('pageSize', '100');
  return url;
}

function trimTrailingSlash(value: string) {
  return value.replace(/\/+$/, '');
}

function toActivityItem(activity: LumiraActivityRecord): CmsRecordBase | null {
  const title = activity.title?.trim();
  if (!title) {
    return null;
  }

  return {
    id: String(activity.id ?? activity.code ?? title),
    code: activity.code || String(activity.id ?? title),
    locale: activity.locale === 'en' ? 'en' : 'zh',
    title,
    subtitle: activity.subtitle || undefined,
    description: activity.description || undefined,
    imageUrl: activity.imageUrl || undefined,
    iconKey: activity.iconKey || undefined,
    sort: activity.sort ?? 0,
    status: activity.status === 'draft' ? 'draft' : 'published',
    tags: parseTags(activity.tags),
    cta: activity.ctaLabel || activity.ctaHref
      ? {
          label: activity.ctaLabel || '查看详情',
          href: activity.ctaHref || '/login',
        }
      : undefined,
    badge: activity.badgeText
      ? {
          text: activity.badgeText,
          tone: activity.badgeTone || undefined,
        }
      : undefined,
    extra: {
      date: activity.activityDate || '',
      time: activity.activityTime || '',
      location: activity.location || '',
      featured: Boolean(activity.featured),
    },
  };
}

function parseTags(tags: string | null | undefined): string[] | undefined {
  if (!tags) {
    return undefined;
  }
  const parsedTags = tags
    .split(/[,，、\s]+/)
    .map((tag) => tag.trim())
    .filter(Boolean);
  return parsedTags.length ? parsedTags : undefined;
}
