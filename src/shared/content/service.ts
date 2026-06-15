import { defaultLocale, type Locale } from '@/shared/i18n/config';
import { cmsContent } from '@/shared/content/data';
import type { ArticleItem, CmsPageContent, NewsCategorySummary, PageKey, SeoContent, SiteShellContent } from '@/shared/content/types';

function resolveLocale(locale?: string): Locale {
  if (locale === 'en') {
    return 'en';
  }
  return defaultLocale;
}

export function getContentBundle(locale?: string) {
  return cmsContent[resolveLocale(locale)];
}

export function getSiteShellContent(locale?: string): SiteShellContent {
  return getContentBundle(locale).siteShell;
}

export function getSiteMeta(pageKey: PageKey, locale?: string): SeoContent {
  return getContentBundle(locale).siteMeta[pageKey];
}

export function getPageContent(pageKey: PageKey, locale?: string): CmsPageContent {
  return getContentBundle(locale).pages[pageKey];
}

export function getNewsCategories(locale?: string): NewsCategorySummary[] {
  return getContentBundle(locale).news.categories;
}

export function getNewsArticles(locale?: string, category?: ArticleItem['category']): ArticleItem[] {
  const items = getContentBundle(locale).news.articles
    .filter((item) => item.status === 'published')
    .sort((left, right) => left.sort - right.sort);

  if (!category) {
    return items;
  }

  return items.filter((item) => item.category === category);
}

export function getNewsArticleBySlug(slug: string, locale?: string) {
  return getNewsArticles(locale).find((item) => item.slug === slug);
}
