import { BookOpen, CalendarDays, CircleHelp, FileText, Home, Scale, ScrollText } from 'lucide-react';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { docsSource } from '@/lib/docs/source';
import { ROUTES } from '@/lib/config/routes';
import { ThemeToggle } from '@/components/theme/theme-toggle';

export default function DocumentationLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="docs-shell">
      <DocsLayout
        tree={docsSource.pageTree}
        nav={{
          title: (
            <span className="flex min-w-0 items-center gap-2.5">
              <span className="grid h-9 w-9 shrink-0 place-items-center overflow-hidden rounded-xl border border-fd-border bg-white">
                <img src="/assets/aiadc-logo.png" alt="" width={32} height={32} className="h-8 w-8 object-contain" />
              </span>
              <span className="min-w-0">
                <strong className="block truncate text-[15px] font-semibold">智能应用开发大赛-AIADC</strong>
                <span className="hidden text-[11px] text-fd-muted-foreground xl:block">返回官网首页</span>
              </span>
            </span>
          ),
          url: ROUTES.home,
          transparentMode: 'none',
        }}
        links={[
          { type: 'main', text: '官网首页', url: ROUTES.home, icon: <Home className="h-4 w-4" /> },
          { type: 'main', text: '文档首页', url: ROUTES.docs, icon: <BookOpen className="h-4 w-4" />, active: 'url' },
          { type: 'main', text: '大赛概览', url: ROUTES.docsOverview, icon: <ScrollText className="h-4 w-4" /> },
          { type: 'main', text: '参赛指南', url: ROUTES.docsParticipation, icon: <FileText className="h-4 w-4" />, active: 'nested-url' },
          { type: 'main', text: '赛程安排', url: ROUTES.docsSchedule, icon: <CalendarDays className="h-4 w-4" /> },
          { type: 'main', text: '评审规则', url: ROUTES.docsReview, icon: <Scale className="h-4 w-4" /> },
          { type: 'main', text: '常见问题', url: ROUTES.docsFaq, icon: <CircleHelp className="h-4 w-4" /> },
          { type: 'button', text: '报名参赛', url: ROUTES.registration, external: true },
        ]}
        slots={{
          themeSwitch: ThemeToggle,
        }}
        sidebar={{
          defaultOpenLevel: 2,
        }}
      >
        {children}
      </DocsLayout>
    </div>
  );
}
