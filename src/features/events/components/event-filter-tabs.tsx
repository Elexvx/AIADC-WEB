'use client';

import { useState } from 'react';
import { CalendarDays, ChevronRight, Clock3, MapPin } from 'lucide-react';
import { Badge, Button, InternalLink } from '@/shared/ui';
import type { CmsRecordBase } from '@/shared/content/types';

export interface EventFilterTabsProps {
  filters: CmsRecordBase[];
  events: CmsRecordBase[];
}

export function EventFilterTabs({ filters, events }: EventFilterTabsProps) {
  const [activeFilter, setActiveFilter] = useState(filters[0]?.code ?? 'all');

  const filteredEvents = activeFilter === 'all'
    ? events
    : events.filter((event) => {
        const filterMap: Record<string, string> = {
          roadshow: '路演活动',
          salon: '创业沙龙',
          policy: '政策宣讲',
          summit: '行业峰会',
        };
        return event.subtitle === filterMap[activeFilter];
      });

  const featuredEvent = filteredEvents.find((item) => Boolean(item.extra?.featured)) ?? filteredEvents[0];
  const regularEvents = filteredEvents.filter((item) => item.id !== featuredEvent?.id);

  return (
    <>
      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-3 mb-6">
        {filters.map((filter) => (
          <button
            key={filter.id}
            type="button"
            onClick={() => setActiveFilter(filter.code)}
            className={`rounded-full px-5 py-2.5 text-sm font-bold transition-colors ${
              activeFilter === filter.code
                ? 'bg-blue-600 text-white'
                : 'bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-blue-50'
            }`}
          >
            {filter.title}
          </button>
        ))}
      </div>

      {/* Featured Event */}
      {featuredEvent && (
        <article className="rounded-lg border border-slate-200 bg-white p-5 sm:p-6">
          <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-3">
                <Badge className="border border-blue-100 bg-blue-50 text-blue-700">{featuredEvent.subtitle}</Badge>
                <span className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-3 py-1 text-xs font-bold tracking-[0.12em] text-white">
                  当前重点活动
                </span>
              </div>

              <h2 className="mt-4 heading-2 text-slate-950">
                {featuredEvent.title}
              </h2>
              <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">{featuredEvent.description}</p>

              <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold text-slate-500">
                <span className="inline-flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 text-blue-600" />
                  {String(featuredEvent.extra?.date ?? '')}
                </span>
                <span className="inline-flex items-center gap-2">
                  <Clock3 className="h-4 w-4 text-blue-600" />
                  {String(featuredEvent.extra?.time ?? '')}
                </span>
                <span className="inline-flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-blue-600" />
                  {String(featuredEvent.extra?.location ?? '')}
                </span>
              </div>
            </div>

            <Button asChild className="w-fit rounded-md border border-blue-200 bg-white text-blue-700 hover:bg-blue-50 lg:justify-self-end">
              <InternalLink href={featuredEvent.cta?.href ?? '/login'}>
                查看详情
                <ChevronRight className="h-4 w-4" />
              </InternalLink>
            </Button>
          </div>
        </article>
      )}

      {/* Regular Events Grid */}
      <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {regularEvents.map((event) => (
          <article
            key={event.id}
            className="flex h-full min-h-72 flex-col rounded-lg border border-slate-200 bg-white p-5 sm:p-6"
          >
            <div className="mt-2 flex flex-wrap items-center gap-3">
              <Badge className="border border-blue-100 bg-blue-50 text-blue-700">{event.subtitle}</Badge>
              <span className="text-sm font-semibold text-slate-400">{String(event.extra?.date ?? '')}</span>
            </div>

            <h3 className="mt-4 heading-3 text-slate-950">{event.title}</h3>
            <p className="mt-3 line-clamp-2 text-sm leading-7 text-slate-600">{event.description}</p>

            <div className="mt-auto grid gap-2 text-sm font-semibold text-slate-500">
              <div className="flex items-center gap-2">
                <Clock3 className="h-4 w-4 text-blue-600" />
                {String(event.extra?.time ?? '')}
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" />
                <span>{String(event.extra?.location ?? '')}</span>
              </div>
            </div>

            <Button asChild className="mt-4 w-fit rounded-md border border-blue-200 bg-white text-blue-700 hover:bg-blue-50">
              <InternalLink href={event.cta?.href ?? '/login'}>
                查看详情
                <ChevronRight className="h-4 w-4" />
              </InternalLink>
            </Button>
          </article>
        ))}
      </div>

      {/* Empty State */}
      {filteredEvents.length === 0 && (
        <div className="rounded-lg border border-dashed border-slate-200 bg-slate-50 p-8 text-center text-sm text-slate-500">
          该分类下暂无活动。
        </div>
      )}
    </>
  );
}
