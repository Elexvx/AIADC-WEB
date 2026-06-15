import { CalendarDays, ChevronRight, Clock3, MapPin, Sparkles, Ticket } from 'lucide-react';
import { getPageContent, getSectionItems, getSiteMeta } from '@/shared/content';
import { Badge, Button, InternalLink, PageHero, ScrollReveal } from '@/shared/ui';
import { SiteFooter, SiteHeader } from '@/widgets/site-shell';

export const metadata = {
  ...getSiteMeta('events', 'zh'),
};

export default function EventsPage() {
  const page = getPageContent('events', 'zh');
  const eventFilters = getSectionItems(page, 'filters');
  const eventItems = getSectionItems(page, 'events');
  const featuredEvent = eventItems.find((item) => Boolean(item.extra?.featured)) ?? eventItems[0];
  const regularEvents = eventItems.filter((item) => item.id !== featuredEvent?.id);

  if (!featuredEvent) {
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
          <div className="flex flex-wrap items-center justify-center gap-3">
            {eventFilters.map((filter, index) => (
              <button
                key={filter.id}
                type="button"
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  index === 0
                    ? 'bg-blue-600 text-white shadow-[0_10px_24px_rgba(37,99,235,0.22)]'
                    : 'bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50'
                }`}
              >
                {filter.title}
              </button>
            ))}
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal as="section" className="bg-white pb-12 sm:pb-14" delay={60}>
        <div className="section-shell">
          <article className="rounded-lg border border-white bg-white/96 p-5 shadow-[0_16px_42px_rgba(15,23,42,0.07)] sm:p-6">
            <div className="grid gap-5 lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:items-center">
              <div className="grid h-12 w-12 place-items-center rounded-lg bg-blue-600 text-white shadow-[0_14px_30px_rgba(37,99,235,0.24)]">
                <Sparkles className="h-6 w-6" />
              </div>

              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-3">
                  <Badge className="border border-blue-100 bg-blue-50 text-blue-700">{featuredEvent.subtitle}</Badge>
                  <span className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-3 py-1 text-xs font-bold tracking-[0.12em] text-white">
                    当前重点活动
                  </span>
                </div>

                <h2 className="mt-4 text-2xl font-black tracking-[-0.05em] text-slate-950 sm:text-3xl">
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

              <Button asChild className="w-fit rounded-md bg-blue-600 text-white hover:bg-blue-700 lg:justify-self-end">
                <InternalLink href={featuredEvent.cta?.href ?? '/login'}>
                  查看详情
                  <ChevronRight className="h-4 w-4" />
                </InternalLink>
              </Button>
            </div>
          </article>

          <ScrollReveal className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3" staggerChildren>
            {regularEvents.map((event) => (
              <article
                key={event.id}
                className="flex h-full min-h-72 flex-col rounded-lg border border-white bg-white/96 p-5 shadow-[0_16px_42px_rgba(15,23,42,0.07)] sm:p-6"
              >
                <div className="grid h-12 w-12 place-items-center rounded-lg bg-gradient-to-br from-blue-50 to-cyan-50 text-blue-600 ring-1 ring-blue-100">
                  <Ticket className="h-6 w-6" />
                </div>

                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <Badge className="border border-blue-100 bg-blue-50 text-blue-700">{event.subtitle}</Badge>
                  <span className="text-sm font-semibold text-slate-400">{String(event.extra?.date ?? '')}</span>
                </div>

                <h3 className="mt-4 text-lg font-bold tracking-[-0.04em] text-slate-950">{event.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{event.description}</p>

                <div className="mt-5 grid gap-2 text-sm font-semibold text-slate-500">
                  <div className="flex items-center gap-2">
                    <Clock3 className="h-4 w-4 text-blue-600" />
                    {String(event.extra?.time ?? '')}
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" />
                    <span>{String(event.extra?.location ?? '')}</span>
                  </div>
                </div>

                <InternalLink
                  href={event.cta?.href ?? '/login'}
                  className="mt-auto inline-flex h-9 w-fit shrink-0 items-center gap-2 rounded-md bg-blue-50 px-3 text-sm font-semibold text-blue-700 transition-colors hover:bg-blue-100"
                >
                  查看详情
                  <ChevronRight className="h-4 w-4" />
                </InternalLink>
              </article>
            ))}
          </ScrollReveal>
        </div>
      </ScrollReveal>

      <SiteFooter />
    </main>
  );
}
