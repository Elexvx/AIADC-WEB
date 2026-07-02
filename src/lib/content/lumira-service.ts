import type { ArticleItem, BadgeInfo, CmsContentBundle, CmsPageContent, CmsRecordBase, NewsCategorySummary, PageKey, SeoContent, SiteShellContent } from '@/lib/content/types';
import { unstable_cache } from 'next/cache';
import { ROUTES } from '@/lib/config/routes';
import { createLumiraUrl, lumiraServiceConfig } from '@/lib/config/lumira';
import { defaultLocale, type Locale } from '@/lib/i18n/config';
import { getDefaultContentBundle } from './default-content';

const CONTENT_REVALIDATE_SECONDS = 300;

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

type LumiraPageResponse<T> = {
  records?: T[];
  total?: number;
  pageNo?: number;
  pageSize?: number;
  hasMore?: boolean;
};

type LumiraActivityRecord = {
  id?: number | string;
  code?: string;
  locale?: string;
  title?: string;
  subtitle?: string | null;
  description?: string | null;
  imageUrl?: string | null;
  iconKey?: string | null;
  sort?: number | null;
  status?: string | null;
  tags?: string | null;
  ctaLabel?: string | null;
  ctaHref?: string | null;
  badgeText?: string | null;
  badgeTone?: BadgeInfo['tone'] | null;
  activityDate?: string | null;
  activityTime?: string | null;
  location?: string | null;
  featured?: boolean | null;
};

const pageKeys: PageKey[] = ['home', 'events', 'materials', 'about', 'news'];

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

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

function asString(value: unknown, fallback = '') {
  return typeof value === 'string' && value.trim() ? value.trim() : fallback;
}

function asNumber(value: unknown, fallback = 0) {
  return typeof value === 'number' && Number.isFinite(value) ? value : fallback;
}

function asTags(value: unknown) {
  if (Array.isArray(value)) {
    return value.map((item) => String(item).trim()).filter(Boolean);
  }
  if (typeof value === 'string') {
    return value.split(',').map((item) => item.trim()).filter(Boolean);
  }
  return [];
}

function normalizeRemoteArticle(item: unknown, index: number): ArticleItem | null {
  if (!isRecord(item)) {
    return null;
  }

  const slug = asString(item.slug, asString(item.code));
  const title = asString(item.title);
  if (!slug || !title) {
    return null;
  }

  const image = isRecord(item.image) ? item.image : {};
  const body = Array.isArray(item.body)
    ? item.body.map((paragraph) => String(paragraph).trim()).filter(Boolean)
    : typeof item.body === 'string'
      ? item.body.split(/\n{2,}/).map((paragraph) => paragraph.trim()).filter(Boolean)
      : [];
  const bodyMarkdown = asString(item.bodyMarkdown, asString(item.markdown));

  return {
    id: asString(item.id, `cms-${slug}`),
    code: asString(item.code, slug),
    locale: resolveLocale(asString(item.locale)),
    title,
    subtitle: asString(item.subtitle) || undefined,
    description: asString(item.description) || undefined,
    imageUrl: asString(item.imageUrl) || undefined,
    iconKey: asString(item.iconKey) || undefined,
    sort: asNumber(item.sort, 200 + index),
    status: asString(item.status, 'published') === 'draft' ? 'draft' : 'published',
    tags: asTags(item.tags),
    cta: isRecord(item.cta) ? item.cta as ArticleItem['cta'] : undefined,
    badge: isRecord(item.badge) ? item.badge as ArticleItem['badge'] : undefined,
    extra: item.extra,
    category: asString(item.category, 'news'),
    slug,
    href: asString(item.href, `/news/${slug}`),
    excerpt: asString(item.excerpt, body[0] ?? ''),
    date: asString(item.date, new Date().toISOString().slice(0, 10)),
    image: {
      url: asString(image.url, asString(item.imageUrl, '/assets/official-notice-cover.png')),
      alt: asString(image.alt, title),
    },
    body,
    bodyMarkdown: bodyMarkdown || undefined,
    contentFormat: bodyMarkdown ? 'markdown' : 'paragraphs',
    sourceType: 'cms',
  };
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

  if (field.collectionKey === 'newsCategories') {
    if ((path === 'items' || path === 'categories') && Array.isArray(value) && value.length > 0) {
      bundle.news.categories = value
        .filter(isRecord)
        .map((item, index) => ({
          label: asString(item.label, asString(item.value)),
          value: asString(item.value),
          description: asString(item.description),
          sort: asNumber(item.sort, index + 1),
          status: asString(item.status, 'published') === 'draft' ? ('draft' as const) : ('published' as const),
        }))
        .filter((item) => item.value && item.status === 'published')
        .sort((left, right) => (left.sort ?? 0) - (right.sort ?? 0));
    }
    return;
  }

  if (field.collectionKey === 'newsArticles') {
    if ((path === 'items' || path === 'articles') && Array.isArray(value) && value.length > 0) {
      bundle.news.articles = value
        .map((item, index) => normalizeRemoteArticle(item, index))
        .filter((item): item is ArticleItem => Boolean(item));
    }
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
      next: { revalidate: CONTENT_REVALIDATE_SECONDS },
      signal: AbortSignal.timeout(lumiraServiceConfig.requestTimeoutMs),
    });
    if (!response.ok) {
      return null;
    }
    const payload = (await response.json()) as LumiraApiResponse<LumiraPublicContent>;
    const fields = payload.data?.fields || [];
    const bundle = cloneBundle(getDefaultContentBundle(locale));
    fields.forEach((field) => applyField(bundle, field));
    return finalizeNewsBundle(bundle);
  } catch {
    return null;
  }
}

function parseTags(tags: string | null | undefined): string[] | undefined {
  if (!tags) {
    return undefined;
  }
  const parsedTags = tags
    .split(/[,，、\s]+/)
    .map((tag) => tag.trim())
    .filter(Boolean);
  return parsedTags.length ? parsedTags : undefined;
}

function toActivityItem(activity: LumiraActivityRecord, locale?: string): CmsRecordBase | null {
  const title = activity.title?.trim();
  if (!title) {
    return null;
  }

  return {
    id: String(activity.id ?? activity.code ?? title),
    code: activity.code || String(activity.id ?? title),
    locale: resolveLocale(activity.locale || locale),
    title,
    subtitle: activity.subtitle || undefined,
    description: activity.description || undefined,
    imageUrl: activity.imageUrl || undefined,
    iconKey: activity.iconKey || undefined,
    sort: activity.sort ?? 0,
    status: activity.status === 'draft' ? 'draft' : 'published',
    tags: parseTags(activity.tags),
    cta: activity.ctaLabel || activity.ctaHref
      ? {
          label: activity.ctaLabel || '查看详情',
          href: activity.ctaHref || ROUTES.registration,
        }
      : undefined,
    badge: activity.badgeText
      ? {
          text: activity.badgeText,
          tone: activity.badgeTone || undefined,
        }
      : undefined,
    extra: {
      date: activity.activityDate || '',
      time: activity.activityTime || '',
      location: activity.location || '',
      featured: Boolean(activity.featured),
    },
  };
}

async function fetchLumiraActivities(locale?: string): Promise<CmsRecordBase[] | null> {
  const url = createLumiraUrl(lumiraServiceConfig.activitiesPath);
  url.searchParams.set('locale', resolveLocale(locale));
  url.searchParams.set('status', 'published');
  url.searchParams.set('pageNo', '1');
  url.searchParams.set('pageSize', '100');

  try {
    const response = await fetch(url, {
      next: { revalidate: CONTENT_REVALIDATE_SECONDS },
      signal: AbortSignal.timeout(lumiraServiceConfig.requestTimeoutMs),
    });
    if (!response.ok) {
      return null;
    }
    const payload = (await response.json()) as LumiraApiResponse<LumiraPageResponse<LumiraActivityRecord>>;
    const records = payload.data?.records || [];
    return records
      .map((activity) => toActivityItem(activity, locale))
      .filter((activity): activity is CmsRecordBase => Boolean(activity))
      .filter((activity) => activity.status === 'published')
      .sort((left, right) => left.sort - right.sort);
  } catch {
    return null;
  }
}

const getCachedContentBundle = unstable_cache(
  async (locale: Locale): Promise<CmsContentBundle> => {
    return (await fetchLumiraBundle(locale)) || finalizeNewsBundle(getDefaultContentBundle(locale));
  },
  ['lumira-content-bundle'],
  {
    revalidate: CONTENT_REVALIDATE_SECONDS,
    tags: ['lumira-content-bundle'],
  },
);

const getCachedActivities = unstable_cache(
  async (locale: Locale): Promise<CmsRecordBase[]> => {
    return (await fetchLumiraActivities(locale)) || [];
  },
  ['lumira-activities'],
  {
    revalidate: CONTENT_REVALIDATE_SECONDS,
    tags: ['lumira-activities'],
  },
);

function finalizeNewsBundle(bundle: CmsContentBundle): CmsContentBundle {
  const categoryValues = new Set(bundle.news.categories.map((category) => category.value));
  const missingCategories = Array.from(new Set(bundle.news.articles.map((article) => article.category)))
    .filter((category) => category && !categoryValues.has(category))
    .map((category, index) => ({
      label: category,
      value: category,
      description: `${category} 分类文章。`,
      sort: 100 + index,
      status: 'published' as const,
    }));

  bundle.news.categories = [...bundle.news.categories, ...missingCategories]
    .filter((category) => category.status !== 'draft')
    .sort((left, right) => (left.sort ?? 0) - (right.sort ?? 0));
  bundle.news.articles = bundle.news.articles.sort((left, right) => left.sort - right.sort || right.date.localeCompare(left.date));
  return bundle;
}

export async function getResolvedContentBundle(locale?: string): Promise<CmsContentBundle> {
  return getCachedContentBundle(resolveLocale(locale));
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

export async function getResolvedActivities(locale?: string): Promise<CmsRecordBase[]> {
  return getCachedActivities(resolveLocale(locale));
}
