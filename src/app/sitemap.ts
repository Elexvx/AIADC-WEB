import type { MetadataRoute } from 'next';
import { ROUTES } from '@/lib/config/routes';
import { getPublicSiteUrl } from '@/lib/config/site';
import { getCanonicalPath } from '@/lib/metadata';
import { getNewsArticles } from '@/lib/content';
import { docsSource } from '@/lib/docs/source';

export const dynamic = 'force-static';

const staticRoutes = [
  { path: ROUTES.home, priority: 1 },
  { path: ROUTES.about, priority: 0.9 },
  { path: ROUTES.events, priority: 0.8 },
  { path: ROUTES.materials, priority: 0.8 },
  { path: ROUTES.news, priority: 0.8 },
  { path: ROUTES.cooperation, priority: 0.7 },
  { path: ROUTES.contact, priority: 0.7 },
] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getPublicSiteUrl();
  const now = new Date();
  const routes = staticRoutes.map(({ path, priority }) => ({
      url: new URL(getCanonicalPath(path), siteUrl).toString(),
      lastModified: now,
      changeFrequency: path === '/' ? 'weekly' : 'monthly',
      priority,
    })) satisfies MetadataRoute.Sitemap;

  const articles = await getNewsArticles('zh');
  const articleRoutes = articles.map((article) => ({
    url: new URL(getCanonicalPath(`/news/${article.slug}`), siteUrl).toString(),
    lastModified: new Date(article.date),
    changeFrequency: 'monthly',
    priority: 0.7,
  })) satisfies MetadataRoute.Sitemap;

  const documentationRoutes = docsSource.getPages().map((page) => ({
    url: new URL(getCanonicalPath(page.url), siteUrl).toString(),
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: page.url === ROUTES.docs ? 0.9 : 0.75,
  })) satisfies MetadataRoute.Sitemap;

  return [...routes, ...documentationRoutes, ...articleRoutes];
}
