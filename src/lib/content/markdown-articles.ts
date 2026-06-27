import fs from 'node:fs';
import path from 'node:path';
import type { ArticleItem } from '@/lib/content/types';
import { defaultLocale, type Locale } from '@/lib/i18n/config';

type FrontMatter = Record<string, unknown>;

const markdownExtensions = new Set(['.md', '.markdown']);

function resolveContentDir() {
  const contentDir = path.join(process.cwd(), 'content', 'news');
  return fs.existsSync(contentDir) && fs.statSync(contentDir).isDirectory() ? contentDir : undefined;
}

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

function parseValue(value: string) {
  const trimmed = value.trim();
  if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
    return trimmed
      .slice(1, -1)
      .split(',')
      .map((item) => parseScalar(item))
      .filter((item) => item !== '');
  }
  return parseScalar(trimmed);
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
    frontMatter[match[1]] = parseValue(match[2]);
  }

  return {
    frontMatter,
    markdown: normalized.slice(end + 4).trim(),
  };
}

function toStringValue(value: unknown, fallback = '') {
  return typeof value === 'string' && value.trim() ? value.trim() : fallback;
}

function toStringArray(value: unknown) {
  if (Array.isArray(value)) {
    return value.map((item) => String(item).trim()).filter(Boolean);
  }
  if (typeof value === 'string') {
    return value
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);
  }
  return [];
}

function markdownToPlainParagraphs(markdown: string) {
  return markdown
    .split(/\n{2,}/)
    .map((block) =>
      block
        .replace(/^#{1,6}\s+/gm, '')
        .replace(/^>\s?/gm, '')
        .replace(/^[-*+]\s+/gm, '')
        .replace(/^\d+\.\s+/gm, '')
        .replace(/`{1,3}/g, '')
        .replace(/\*\*([^*]+)\*\*/g, '$1')
        .replace(/\*([^*]+)\*/g, '$1')
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
        .trim(),
    )
    .filter(Boolean);
}

function normalizeArticle(filePath: string, fileName: string, frontMatter: FrontMatter, markdown: string): ArticleItem {
  const slug = toStringValue(frontMatter.slug, path.basename(fileName, path.extname(fileName)));
  const title = toStringValue(frontMatter.title, slug);
  const category = toStringValue(frontMatter.category, 'news');
  const imageUrl = toStringValue(frontMatter.image, toStringValue(frontMatter.imageUrl, '/assets/official-notice-cover.png'));
  const imageAlt = toStringValue(frontMatter.imageAlt, title);
  const body = markdownToPlainParagraphs(markdown);

  return {
    id: `markdown-${slug}`,
    code: slug,
    locale: toStringValue(frontMatter.locale, defaultLocale) as Locale,
    title,
    subtitle: toStringValue(frontMatter.subtitle),
    description: toStringValue(frontMatter.description),
    sort: Number(frontMatter.sort ?? 100),
    status: toStringValue(frontMatter.status, 'published') === 'draft' ? 'draft' : 'published',
    tags: toStringArray(frontMatter.tags),
    category,
    slug,
    href: toStringValue(frontMatter.href, `/news/${slug}`),
    excerpt: toStringValue(frontMatter.excerpt, body[0] ?? ''),
    date: toStringValue(frontMatter.date, new Date().toISOString().slice(0, 10)),
    image: {
      url: imageUrl,
      alt: imageAlt,
    },
    body,
    bodyMarkdown: markdown,
    contentFormat: 'markdown',
    sourceType: 'markdown',
    sourcePath: filePath.replaceAll('\\', '/'),
  };
}

export function getMarkdownNewsArticles(locale?: string): ArticleItem[] {
  const contentDir = resolveContentDir();
  if (!contentDir) {
    return [];
  }

  const resolvedLocale = locale === 'en' ? 'en' : defaultLocale;
  return fs
    .readdirSync(contentDir)
    .filter((fileName) => markdownExtensions.has(path.extname(fileName).toLowerCase()))
    .map((fileName) => {
      const filePath = path.join(contentDir, fileName);
      const raw = fs.readFileSync(filePath, 'utf8');
      const { frontMatter, markdown } = parseFrontMatter(raw);
      return normalizeArticle(path.relative(process.cwd(), filePath), fileName, frontMatter, markdown);
    })
    .filter((article) => article.locale === resolvedLocale)
    .sort((left, right) => left.sort - right.sort || right.date.localeCompare(left.date));
}
