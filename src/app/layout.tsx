import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import { GeistSans } from 'geist/font/sans';
import { RootProvider } from 'fumadocs-ui/provider/next';
import { getPublicSiteUrl } from '@/lib/config/site';
import { getSiteMeta, getSiteShellContent } from '@/lib/content';
import { LocaleProvider } from '@/lib/i18n/locale-provider';
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
const fumadocsTranslations = {
  'Search(search trigger)': '搜索',
  'Search(search dialog)': '搜索赛事文档',
  'Open Search(search trigger)(aria-label)': '打开搜索',
  'Close Search(search dialog)(aria-label)': '关闭搜索',
  'No results found(search dialog)': '未找到相关内容',
  'On this page(table of contents)': '目录',
  'No Headings(table of contents)': '暂无目录',
  'Table of Contents(inline table of contents)': '目录',
  'Open Sidebar(sidebar)(aria-label)': '打开文档目录',
  'Close Sidebar(sidebar)(aria-label)': '关闭文档目录',
  'Collapse Sidebar(sidebar)(aria-label)': '收起文档目录',
  'Show Sidebar(sidebar)': '显示文档目录',
  'Hide Sidebar(sidebar)': '隐藏文档目录',
  'Next Page(pagination)': '下一页',
  'Previous Page(pagination)': '上一页',
  'Copy Anchor Link(heading anchor)(aria-label)': '复制章节链接',
  'Copy Text(code block)(aria-label)': '复制代码',
  'Copied Text(code block)(aria-label)': '已复制',
  'Copy Markdown(page actions)': '复制 Markdown',
  'Open(page actions)': '打开',
  'View as Markdown(page actions)': '查看 Markdown',
  'Open in Scira AI(page actions)': '在 Scira AI 中打开',
  'Open in ChatGPT(page actions)': '在 ChatGPT 中打开',
  'Open in Claude(page actions)': '在 Claude 中打开',
  'Open in Cursor(page actions)': '在 Cursor 中打开',
  'Toggle Menu(mobile menu)(aria-label)': '切换菜单',
  'Toggle Theme(theme switcher)(aria-label)': '切换日间或夜间模式',
  'Light(theme switcher)(aria-label)': '日间模式',
  'Dark(theme switcher)(aria-label)': '夜间模式',
  'System(theme switcher)(aria-label)': '跟随系统',
};
export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: '#0b2a8f',
};

export async function generateMetadata(): Promise<Metadata> {
  const [siteShell, homeMeta] = await Promise.all([
    getSiteShellContent('zh'),
    getSiteMeta('home', 'zh'),
  ]);
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
      'National College Student AI Application Development Competition',
      'AI Application Development Competition',
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
  const siteShell = await getSiteShellContent('zh');

  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className={`${GeistSans.variable} ${alibabaPuHuiTi.variable} ${alibabaPuHuiTi.className} bg-background text-foreground antialiased transition-colors duration-300`}>
        <RootProvider
          theme={{
            attribute: 'class',
            storageKey: 'aiadc-theme',
            defaultTheme: 'system',
            enableSystem: true,
            themes: ['light', 'dark'],
            disableTransitionOnChange: true,
          }}
          search={{ options: { api: '/api/search' } }}
          i18n={{ locale: 'zh-CN', translations: fumadocsTranslations }}
        >
          <LocaleProvider siteShell={siteShell}>{children}</LocaleProvider>
        </RootProvider>
      </body>
    </html>
  );
}
