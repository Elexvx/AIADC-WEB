import fs from 'node:fs';
import path from 'node:path';
import type { CmsPageContent, PageKey, SeoContent } from '@/lib/content/types';
import { defaultLocale } from '@/lib/i18n/config';

type FrontMatter = Record<string, unknown>;

const privacyPolicyPath = path.join(process.cwd(), 'content', 'legal', 'privacy-policy.md');
const userAgreementPath = path.join(process.cwd(), 'content', 'legal', 'user-agreement.md');
const cookiesPolicyPath = path.join(process.cwd(), 'content', 'legal', 'cookies-policy.md');

function parseScalar(value: string) {
  const trimmed = value.trim();
  if ((trimmed.startsWith('"') && trimmed.endsWith('"')) || (trimmed.startsWith("'") && trimmed.endsWith("'"))) {
    return trimmed.slice(1, -1);
  }
  if (trimmed === 'true') {
    return true;
  }
  if (trimmed === 'false') {
    return false;
  }
  if (/^-?\d+(\.\d+)?$/.test(trimmed)) {
    return Number(trimmed);
  }
  return trimmed;
}

function parseFrontMatter(raw: string): { frontMatter: FrontMatter; markdown: string } {
  const normalized = raw.replace(/\r\n/g, '\n');
  if (!normalized.startsWith('---\n')) {
    return { frontMatter: {}, markdown: normalized.trim() };
  }

  const end = normalized.indexOf('\n---', 4);
  if (end < 0) {
    return { frontMatter: {}, markdown: normalized.trim() };
  }

  const frontMatter: FrontMatter = {};
  const header = normalized.slice(4, end).trim();
  for (const line of header.split('\n')) {
    const match = line.match(/^([A-Za-z0-9_.-]+):\s*(.*)$/);
    if (!match) {
      continue;
    }
    frontMatter[match[1]] = parseScalar(match[2]);
  }

  return {
    frontMatter,
    markdown: normalized.slice(end + 4).trim(),
  };
}

function toStringValue(value: unknown, fallback = '') {
  return typeof value === 'string' && value.trim() ? value.trim() : fallback;
}

function getLegalPagePath(pageKey: Extract<PageKey, 'cookies' | 'privacy' | 'terms'>) {
  if (pageKey === 'cookies') {
    return cookiesPolicyPath;
  }
  return pageKey === 'privacy' ? privacyPolicyPath : userAgreementPath;
}

export function getMarkdownLegalPage(
  pageKey: Extract<PageKey, 'cookies' | 'privacy' | 'terms'>,
  locale: string | undefined,
  fallbackPage: CmsPageContent,
  fallbackSeo: SeoContent,
): CmsPageContent {
  const filePath = getLegalPagePath(pageKey);
  if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
    return fallbackPage;
  }

  const raw = fs.readFileSync(filePath, 'utf8');
  const { frontMatter, markdown } = parseFrontMatter(raw);
  const resolvedLocale = locale === 'en' ? 'en' : defaultLocale;
  const documentLocale = toStringValue(frontMatter.locale, defaultLocale);
  const status = toStringValue(frontMatter.status, 'published');
  if (documentLocale !== resolvedLocale || status === 'draft' || !markdown) {
    return fallbackPage;
  }

  const title = toStringValue(frontMatter.title, fallbackPage.hero?.title || fallbackSeo.title);
  const description = toStringValue(frontMatter.description, fallbackPage.hero?.description || fallbackSeo.description);

  return {
    ...fallbackPage,
    seo: {
      title: toStringValue(frontMatter.seoTitle, title),
      description,
    },
    hero: {
      eyebrow: toStringValue(frontMatter.eyebrow, fallbackPage.hero?.eyebrow ?? title),
      title,
      description,
      backgroundImage: fallbackPage.hero?.backgroundImage,
      dark: fallbackPage.hero?.dark,
    },
    richTextBlocks: [
      {
        id: `legal-${pageKey}`,
        code: pageKey,
        type: 'markdown',
        content: markdown,
      },
    ],
  };
}
