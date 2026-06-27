import { ArrowRight, BriefcaseBusiness, CalendarDays } from 'lucide-react';
import { Badge, InternalLink, ScrollReveal } from '@/components/ui';
import type { CmsRecordBase } from '@/lib/content/types';

interface ProjectCardGridProps {
  projects: CmsRecordBase[];
}

export function ProjectCardGrid({ projects }: ProjectCardGridProps) {
  return (
    <ScrollReveal className="grid gap-5 md:grid-cols-2 xl:grid-cols-3" staggerChildren>
      {projects.map((project) => (
        <article
          key={project.id}
          className="notion-card flex h-full flex-col p-6 transition-colors duration-300 hover:border-[#d4d4d4]"
        >
          <div className="flex flex-wrap items-center gap-2">
            <Badge>{project.subtitle}</Badge>
            <Badge className="border border-[#e6e6e6] bg-white text-[#615d59]">{String(project.extra?.track ?? '')}</Badge>
            {project.extra?.featured ? (
              <Badge className="border border-[#213183] bg-[#213183] text-white">重点推荐</Badge>
            ) : null}
          </div>

          <h3 className="heading-3 notion-card-title mt-4 transition-colors duration-300">{project.title}</h3>
          <p className="notion-card-body mt-3 text-sm leading-7 transition-colors duration-300">{project.description}</p>

          <div className="notion-card-body mt-5 flex flex-wrap gap-x-4 gap-y-2 text-sm font-medium transition-colors duration-300">
            <div className="inline-flex items-center gap-2 whitespace-nowrap">
              <BriefcaseBusiness className="h-4 w-4 text-[#0075de]" />
              {String(project.extra?.stage ?? '')}
            </div>
            <div className="inline-flex items-center gap-2 whitespace-nowrap">
              <CalendarDays className="h-4 w-4 text-[#0075de]" />
              {String(project.extra?.date ?? '')}
            </div>
          </div>

          <InternalLink
            href={project.cta?.href ?? '/login'}
            className="mt-4 inline-flex h-9 w-fit items-center gap-2 self-start rounded-md border border-[#e6e6e6] bg-white px-4 text-sm font-semibold text-[#0075de] transition-colors hover:bg-[#f6f5f4] hover:text-[#005bab]"
          >
            查看详情
            <ArrowRight className="h-4 w-4" />
          </InternalLink>
        </article>
      ))}
    </ScrollReveal>
  );
}
