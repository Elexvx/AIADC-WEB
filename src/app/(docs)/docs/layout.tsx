import Image from 'next/image';
import { CalendarDays } from 'lucide-react';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { docsSource } from '@/lib/docs/source';
import { ROUTES } from '@/lib/config/routes';

export default function DocumentationLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="docs-shell">
      <DocsLayout
        tree={docsSource.pageTree}
        githubUrl="https://github.com/Elexvx/AIADC-WEB"
        tabs={[
          {
            title: '2026 赛季',
            description: 'AIADC 赛事文档',
            url: '/docs',
            icon: <CalendarDays aria-hidden="true" />,
          },
        ]}
        nav={{
          title: (
            <span className="flex min-w-0 items-center gap-2">
              <Image
                src="/assets/aiadc-logo.png"
                alt="AIADC 赛事文档"
                width={20}
                height={20}
                className="size-5 shrink-0 rounded-full object-contain"
              />
              <strong aria-hidden="true" className="hidden truncate text-[15px] font-medium md:block">
                AIADC 赛事文档
              </strong>
            </span>
          ),
          url: ROUTES.home,
          transparentMode: 'none',
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
