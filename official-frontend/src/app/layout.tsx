import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import Script from 'next/script';
import { getPublicSiteUrl } from '@/lib/config/site';
import { getContentBundle, getSiteMeta, getSiteShellContent } from '@/lib/content';
import { LocaleProvider } from '@/lib/i18n/locale-provider';
import { PageTransition } from '@/components/ui';
import { FloatingActions, SiteFooter, SiteHeader } from '@/components/site-shell';
import { ThemeProvider } from '@/components/theme/theme-provider';
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

const siteUrl = getPublicSiteUrl();
const siteLogo = '/assets/aiadc-logo.png';
const siteOgImage = '/assets/aiadc-hero-visual.png';
const themeBootstrapScript = `
  (function () {
    try {
      var storageKey = 'aiadc-theme';
      var storedTheme = window.localStorage.getItem(storageKey);
      var resolvedTheme = storedTheme === 'dark' || storedTheme === 'light'
        ? storedTheme
        : window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light';
      var root = document.documentElement;
      root.classList.toggle('dark', resolvedTheme === 'dark');
      root.dataset.theme = resolvedTheme;
    } catch (error) {
      document.documentElement.classList.remove('dark');
      document.documentElement.dataset.theme = 'light';
    }
  })();
`;

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: '#0b2a8f',
};

export async function generateMetadata(): Promise<Metadata> {
  const siteShell = await getSiteShellContent('zh');
  const homeMeta = await getSiteMeta('home', 'zh');
  const siteName = siteShell.brand.applicationName;
  const title = homeMeta.title;
  const description = homeMeta.description;

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: title,
      template: `%s | ${siteName}`,
    },
    description,
    keywords: [
      '全国大学生智能应用开发大赛',
      'AIADC',
      '智能应用开发',
      '大学生竞赛',
      '人工智能竞赛',
      'AI应用开发',
      'OPC轻创赛道',
      '项目孵化',
      'AI competition',
      'AI app development',
      'college competition',
    ],
    applicationName: siteName,
    creator: siteName,
    publisher: siteName,
    category: 'education',
    referrer: 'origin-when-cross-origin',
    formatDetection: {
      telephone: false,
      address: false,
      email: false,
    },
    icons: {
      icon: [
        { url: '/favicon.ico', sizes: 'any' },
        { url: '/icons/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
        { url: '/icons/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
        { url: '/icons/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
      ],
      shortcut: ['/favicon.ico'],
      apple: [{ url: '/icons/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
    },
    manifest: '/site.webmanifest',
    openGraph: {
      title,
      description,
      url: siteUrl,
      siteName,
      locale: 'zh_CN',
      type: 'website',
      images: [
        {
          url: siteOgImage,
          width: 1635,
          height: 962,
          alt: siteName,
        },
        {
          url: siteLogo,
          width: 1254,
          height: 1254,
          alt: `${siteName} logo`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [siteOgImage],
    },
    alternates: {
      canonical: '/',
      languages: {
        'zh-CN': '/',
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
  };
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const initialContent = {
    zh: await getContentBundle('zh'),
    en: await getContentBundle('en'),
  };

  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <Script id="theme-bootstrap" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: themeBootstrapScript }} />
      </head>
      <body className={`${alibabaPuHuiTi.variable} ${alibabaPuHuiTi.className} bg-background text-foreground antialiased transition-colors duration-300`}>
        <ThemeProvider>
          <LocaleProvider initialContent={initialContent}>
            <div className="page-shell bg-background text-foreground transition-colors duration-300">
              <SiteHeader />
              <PageTransition>{children}</PageTransition>
              <SiteFooter />
            </div>
            <FloatingActions />
          </LocaleProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
