import type { Metadata } from 'next';
import { getPageContent, getSiteMeta, getSiteShellContent } from '@/shared/content';
import { LocaleProvider } from '@/shared/i18n/locale-provider';
import { PageTransition } from '@/shared/ui';
import { FloatingActions } from '@/widgets/site-shell';
import './globals.css';

const siteUrl = process.env.VITE_PUBLIC_SITE_URL ?? 'https://your-domain.vercel.app';
const siteShell = getSiteShellContent('zh');
const homePage = getPageContent('home', 'zh');
const homeMeta = getSiteMeta('home', 'zh');
const homeHeroSlide = homePage.sections.find((section) => section.sectionCode === 'heroSlides')?.items[0];

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: homeMeta.title,
    template: `%s | ${siteShell.brand.applicationName}`,
  },
  description: homeMeta.description,
  keywords: ['AI 大赛', '智能应用开发', '大学生竞赛', '职业院校竞赛', 'OPC 轻创赛道'],
  applicationName: siteShell.brand.applicationName,
  openGraph: {
    title: siteShell.brand.applicationName,
    description: homeHeroSlide?.description ?? homeMeta.description,
    url: siteUrl,
    siteName: siteShell.brand.applicationName,
    locale: 'zh_CN',
    type: 'website',
  },
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body className="bg-background text-foreground antialiased">
        <LocaleProvider>
          <PageTransition>{children}</PageTransition>
          <FloatingActions />
        </LocaleProvider>
      </body>
    </html>
  );
}
