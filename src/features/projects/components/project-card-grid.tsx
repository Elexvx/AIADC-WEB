import { ArrowRight, BriefcaseBusiness, CalendarDays } from 'lucide-react';
import { Badge, InternalLink, ScrollReveal } from '@/shared/ui';
import type { CmsRecordBase } from '@/shared/content';

interface ProjectCardGridProps {
  projects: CmsRecordBase[];
}

export function ProjectCardGrid({ projects }: ProjectCardGridProps) {
  return (
    <ScrollReveal className="grid gap-5 md:grid-cols-2 xl:grid-cols-3" staggerChildren>
      {projects.map((project) => (
        <article
          key={project.id}
          className="flex h-full flex-col rounded-lg border border-slate-200 bg-white p-6"
        >
          <div className="flex flex-wrap items-center gap-2">
            <Badge className="border border-blue-100 bg-blue-50 text-blue-700">{project.subtitle}</Badge>
            <Badge className="border border-slate-200 bg-white text-slate-600">{String(project.extra?.track ?? '')}</Badge>
            {project.extra?.featured ? (
              <Badge className="border border-slate-900 bg-slate-950 text-white">重点推荐</Badge>
            ) : null}
          </div>

          <h3 className="mt-4 heading-3 text-slate-950">{project.title}</h3>
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
            className="mt-auto inline-flex h-9 items-center gap-2 rounded-md border border-blue-200 bg-white px-4 text-sm font-bold text-blue-700 transition-colors hover:bg-blue-50"
          >
            查看详情
            <ArrowRight className="h-4 w-4" />
          </InternalLink>
        </article>
      ))}
    </ScrollReveal>
  );
}
