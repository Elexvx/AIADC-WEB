import { ArrowRight, BriefcaseBusiness, CalendarDays, Search } from 'lucide-react';
import { getPageContent, getSectionItems, getSiteMeta } from '@/shared/content';
import { Badge, InternalLink, PageHero, ScrollReveal } from '@/shared/ui';
import { SiteFooter, SiteHeader } from '@/widgets/site-shell';

export const metadata = {
  ...getSiteMeta('projects', 'zh'),
};

export default function ProjectsPage() {
  const page = getPageContent('projects', 'zh');
  const projectFilters = getSectionItems(page, 'filters');
  const projects = getSectionItems(page, 'projects');

  if (projects.length === 0) {
    return null;
  }

  return (
    <main className="page-shell bg-white">
      <SiteHeader />
      <PageHero
        eyebrow={page.hero?.eyebrow ?? '优秀项目'}
        title={page.hero?.title ?? ''}
        description={page.hero?.description ?? ''}
        backgroundImage={page.hero?.backgroundImage}
        dark={page.hero?.dark}
        fullBleedBackground
      />

      <ScrollReveal as="section" className="bg-white pt-8 pb-3 sm:pt-10" delay={40}>
        <div className="section-shell">
          <div className="mx-auto flex max-w-3xl items-center gap-3 rounded-full border border-slate-200 bg-slate-50 px-5 py-4 text-slate-500 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]">
            <Search className="h-4 w-4 shrink-0 text-blue-600" />
            <span className="text-sm sm:text-base">搜索项目名称、应用方向或场景关键词</span>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            {projectFilters.map((filter, index) => (
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
          <ScrollReveal className="grid gap-5 md:grid-cols-2 xl:grid-cols-3" staggerChildren>
            {projects.map((project) => (
              <article
                key={project.id}
                className="flex h-full flex-col rounded-lg border border-white bg-white/96 p-6 shadow-[0_16px_42px_rgba(15,23,42,0.07)]"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <Badge className="border border-blue-100 bg-blue-50 text-blue-700">{project.subtitle}</Badge>
                  <Badge className="border border-slate-200 bg-white text-slate-600">{String(project.extra?.track ?? '')}</Badge>
                  {project.extra?.featured ? (
                    <Badge className="border border-slate-900 bg-slate-950 text-white">重点推荐</Badge>
                  ) : null}
                </div>

                <h3 className="mt-4 text-xl font-black tracking-[-0.04em] text-slate-950">{project.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{project.description}</p>

                <div className="mt-5 space-y-2 text-sm font-semibold text-slate-500">
                  <div className="inline-flex items-center gap-2">
                    <BriefcaseBusiness className="h-4 w-4 text-blue-600" />
                    {String(project.extra?.stage ?? '')}
                  </div>
                  <div className="inline-flex items-center gap-2">
                    <CalendarDays className="h-4 w-4 text-blue-600" />
                    {String(project.extra?.date ?? '')}
                  </div>
                </div>

                <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-600">
                  {String(project.extra?.highlight ?? '')}
                </div>

                <InternalLink
                  href={project.cta?.href ?? '/login'}
                  className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-bold text-blue-700 transition-colors hover:text-blue-800"
                >
                  查看详情
                  <ArrowRight className="h-4 w-4" />
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
