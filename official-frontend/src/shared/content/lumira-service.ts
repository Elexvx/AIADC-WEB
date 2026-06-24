import type { ArticleItem, CmsContentBundle, CmsPageContent, NewsCategorySummary, PageKey, SeoContent, SiteShellContent } from '@/shared/content/types';
import { createLumiraUrl, lumiraServiceConfig } from '@/shared/config/lumira';
import { defaultLocale, type Locale } from '@/shared/i18n/config';
import { getDefaultContentBundle } from './default-content';

type LumiraFieldRecord = {
  sectionKey?: string;
  pageKey?: string;
  collectionKey?: string;
  areaKey?: string;
  sectionCode?: string;
  fieldPath?: string;
  publishedValue?: string | null;
};

type LumiraPublicContent = {
  locale?: string;
  fields?: LumiraFieldRecord[];
};

type LumiraApiResponse<T> = {
  data?: T;
};

const pageKeys: PageKey[] = ['home', 'intro', 'events', 'projects', 'startup-base', 'materials', 'policies', 'about', 'privacy', 'terms', 'login', 'news'];

function resolveLocale(locale?: string): Locale {
  return locale === 'en' ? 'en' : defaultLocale;
}

function emptyPage(pageKey: PageKey, locale: Locale): CmsPageContent {
  return {
    pageKey,
    locale,
    hero: {
      eyebrow: '',
      title: '',
      description: '',
    },
    sections: [],
    seo: {
      title: '',
      description: '',
    },
  };
}

function emptyBundle(locale?: string): CmsContentBundle {
  const resolvedLocale = resolveLocale(locale);
  const siteMeta = Object.fromEntries(pageKeys.map((pageKey) => [pageKey, { title: '', description: '' }])) as Record<PageKey, SeoContent>;
  const pages = Object.fromEntries(pageKeys.map((pageKey) => [pageKey, emptyPage(pageKey, resolvedLocale)])) as Record<PageKey, CmsPageContent>;

  return {
    siteShell: {
      brand: {
        primary: '',
        secondary: '',
        homeAria: 'Home',
        applicationName: '',
      },
      header: {
        languageAria: 'Language',
        loginLabel: 'Login',
        mainNavItems: [],
        pageSwitchItems: [],
        eventPageItems: [],
      },
      footer: {
        description: '',
        columns: [],
        legalLinks: [],
        filings: [],
        copyright: '',
      },
    },
    siteMeta,
    pages,
    news: {
      categories: [],
      articles: [],
    },
  };
}

function parseValue(value: string | null | undefined) {
  if (value == null || value === '') {
    return undefined;
  }
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
}

function cloneBundle(bundle: CmsContentBundle): CmsContentBundle {
  return structuredClone(bundle);
}

function setDeepValue(target: unknown, path: string, value: unknown) {
  if (!target || typeof target !== 'object' || value === undefined) {
    return;
  }

  const segments = path.split('.').filter(Boolean);
  let cursor = target as Record<string, unknown>;
  for (const segment of segments.slice(0, -1)) {
    const current = cursor[segment];
    if (!current || typeof current !== 'object' || Array.isArray(current)) {
      cursor[segment] = {};
    }
    cursor = cursor[segment] as Record<string, unknown>;
  }
  const last = segments.at(-1);
  if (last) {
    cursor[last] = value;
  }
}

function applyField(bundle: CmsContentBundle, field: LumiraFieldRecord) {
  const path = field.fieldPath;
  if (!path) {
    return;
  }
  const value = parseValue(field.publishedValue);
  const pageKey = field.pageKey as PageKey | undefined;

  if (field.collectionKey === 'siteShell') {
    setDeepValue(bundle.siteShell, path, value);
    return;
  }

  if (field.collectionKey === 'siteMeta') {
    if (path.startsWith('seo.') && pageKey && bundle.siteMeta[pageKey]) {
      setDeepValue(bundle.siteMeta[pageKey], path.slice('seo.'.length), value);
    }
    return;
  }

  if (field.collectionKey === 'newsCategories' || field.collectionKey === 'newsArticles') {
    return;
  }

  if (!pageKey || !bundle.pages[pageKey]) {
    return;
  }

  const page = bundle.pages[pageKey];
  if (path.startsWith('hero.')) {
    page.hero ||= { eyebrow: '', title: '', description: '' };
    setDeepValue(page.hero, path.slice('hero.'.length), value);
    return;
  }
  if (path.startsWith('seo.')) {
    setDeepValue(page.seo, path.slice('seo.'.length), value);
    setDeepValue(bundle.siteMeta[pageKey], path.slice('seo.'.length), value);
    return;
  }
  if (field.areaKey === 'ctaBanner' || field.areaKey === 'primaryAction' || field.areaKey === 'page') {
    setDeepValue(page, `${field.areaKey}.${path}`, value);
  }
}

async function fetchLumiraBundle(locale?: string): Promise<CmsContentBundle | null> {
  const url = createLumiraUrl(lumiraServiceConfig.publicContentPath);
  url.searchParams.set('locale', resolveLocale(locale));

  try {
    const response = await fetch(url, {
      cache: 'no-store',
      signal: AbortSignal.timeout(lumiraServiceConfig.requestTimeoutMs),
    });
    if (!response.ok) {
      return null;
    }
    const payload = (await response.json()) as LumiraApiResponse<LumiraPublicContent>;
    const fields = payload.data?.fields || [];
    const bundle = cloneBundle(getDefaultContentBundle(locale));
    fields.forEach((field) => applyField(bundle, field));
    return bundle;
  } catch {
    return null;
  }
}

export async function getResolvedContentBundle(locale?: string): Promise<CmsContentBundle> {
  return (await fetchLumiraBundle(locale)) || getDefaultContentBundle(locale);
}

export async function getResolvedSiteShellContent(locale?: string): Promise<SiteShellContent> {
  return (await getResolvedContentBundle(locale)).siteShell;
}

export async function getResolvedSiteMeta(pageKey: PageKey, locale?: string): Promise<SeoContent> {
  return (await getResolvedContentBundle(locale)).siteMeta[pageKey];
}

export async function getResolvedPageContent(pageKey: PageKey, locale?: string): Promise<CmsPageContent> {
  return (await getResolvedContentBundle(locale)).pages[pageKey];
}

export async function getResolvedNewsCategories(locale?: string): Promise<NewsCategorySummary[]> {
  return (await getResolvedContentBundle(locale)).news.categories;
}

export async function getResolvedNewsArticles(locale?: string, category?: ArticleItem['category']): Promise<ArticleItem[]> {
  const items = (await getResolvedContentBundle(locale)).news.articles
    .filter((item) => item.status === 'published')
    .sort((left, right) => left.sort - right.sort);

  return category ? items.filter((item) => item.category === category) : items;
}

export async function getResolvedNewsArticleBySlug(slug: string, locale?: string): Promise<ArticleItem | undefined> {
  return (await getResolvedNewsArticles(locale)).find((item) => item.slug === slug);
}
