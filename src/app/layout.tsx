import type { Metadata } from 'next';
import { siteContent } from '@/entities/site';
import { FloatingActions } from '@/widgets/site-shell';
import './globals.css';

const siteUrl = process.env.VITE_PUBLIC_SITE_URL ?? 'https://your-domain.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: '全国大学生智能应用开发大赛官网',
    template: '%s | 全国大学生智能应用开发大赛',
  },
  description:
    '全国大学生智能应用开发大赛面向职业院校、普通高校与青年创新团队，覆盖萌芽、创意与 OPC 轻创赛道，支持静态部署与公开信息检索。',
  keywords: ['AI 大赛', '智能应用开发', '大学生竞赛', '职业院校竞赛', 'OPC 轻创赛道'],
  applicationName: siteContent.brand.name,
  openGraph: {
    title: '全国大学生智能应用开发大赛',
    description: siteContent.hero.description,
    url: siteUrl,
    siteName: siteContent.brand.cnName,
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
        {children}
        <FloatingActions />
      </body>
    </html>
  );
}
