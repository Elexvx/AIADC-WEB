import type { MetadataRoute } from 'next';
import { ROUTES } from '@/lib/config/routes';
import { getPublicSiteUrl } from '@/lib/config/site';
import { getCanonicalPath } from '@/lib/metadata';
import { getNewsArticles } from '@/lib/content';

export const dynamic = 'force-static';

const routePriorities: Partial<Record<keyof typeof ROUTES, number>> = {
  home: 1,
  about: 0.9,
  news: 0.8,
  materials: 0.8,
  login: 0.7,
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getPublicSiteUrl();
  const now = new Date();
  const routes = Object.entries(ROUTES)
    .filter(([key]) => key !== 'intro')
    .map(([key, route]) => ({
      url: new URL(getCanonicalPath(route), siteUrl).toString(),
      lastModified: now,
      changeFrequency: route === '/' ? 'weekly' : 'monthly',
      priority: routePriorities[key as keyof typeof ROUTES] ?? 0.6,
    })) satisfies MetadataRoute.Sitemap;

  const articles = await getNewsArticles('zh');
  const articleRoutes = articles.map((article) => ({
    url: new URL(getCanonicalPath(`/news/${article.slug}`), siteUrl).toString(),
    lastModified: new Date(article.date),
    changeFrequency: 'monthly',
    priority: 0.7,
  })) satisfies MetadataRoute.Sitemap;

  return [...routes, ...articleRoutes];
}
