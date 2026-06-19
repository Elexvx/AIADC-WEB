import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { getContentBundle, getPageContent, getSiteMeta, getSiteShellContent } from '@/shared/content';
import { LocaleProvider } from '@/shared/i18n/locale-provider';
import { PageTransition } from '@/shared/ui';
import { FloatingActions } from '@/widgets/site-shell';
import './globals.css';

const alibabaPuHuiTi = localFont({
  src: [
    {
      path: '../../public/fonts/alibaba-puhuiti/AlibabaPuHuiTi-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/alibaba-puhuiti/AlibabaPuHuiTi-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/alibaba-puhuiti/AlibabaPuHuiTi-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-alibaba-puhuiti',
});

const siteUrl = process.env.VITE_PUBLIC_SITE_URL ?? 'https://your-domain.vercel.app';

export async function generateMetadata(): Promise<Metadata> {
  const siteShell = await getSiteShellContent('zh');
  const homePage = await getPageContent('home', 'zh');
  const homeMeta = await getSiteMeta('home', 'zh');
  const homeHeroSlide = homePage.sections.find((section) => section.sectionCode === 'heroSlides')?.items[0];

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: homeMeta.title,
      template: `%s | ${siteShell.brand.applicationName}`,
    },
    description: homeMeta.description,
    keywords: ['AI competition', 'AI app development', 'college competition', 'OPC track'],
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
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const initialContent = {
    zh: await getContentBundle('zh'),
    en: await getContentBundle('en'),
  };

  return (
    <html lang="zh-CN">
      <body className={`${alibabaPuHuiTi.className} bg-background text-foreground antialiased`}>
        <LocaleProvider initialContent={initialContent}>
          <PageTransition>{children}</PageTransition>
          <FloatingActions />
        </LocaleProvider>
      </body>
    </html>
  );
}
