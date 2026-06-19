import { getPageContent, getSectionItems, getSiteMeta } from '@/shared/content';
import { PageHero, ScrollReveal } from '@/shared/ui';
import { SiteFooter, SiteHeader } from '@/widgets/site-shell';
import { ProjectSearchBar, ProjectFilterTabs, ProjectCardGrid } from '@/features/projects';

export async function generateMetadata() {
  return getSiteMeta('projects', 'zh');
}

export default async function ProjectsPage() {
  const page = await getPageContent('projects', 'zh');
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
          <ProjectSearchBar />
          <ProjectFilterTabs filters={projectFilters} />
        </div>
      </ScrollReveal>

      <ScrollReveal as="section" className="bg-white pb-12 sm:pb-14" delay={60}>
        <div className="section-shell">
          <ProjectCardGrid projects={projects} />
        </div>
      </ScrollReveal>

      <SiteFooter />
    </main>
  );
}
