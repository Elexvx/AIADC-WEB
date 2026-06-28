import fs from 'node:fs';
import path from 'node:path';
import type { DownloadItem } from '@/lib/content/types';
import { defaultLocale, type Locale } from '@/lib/i18n/config';

type FrontMatter = Record<string, unknown>;

const markdownExtensions = new Set(['.md', '.markdown']);

function resolveContentDir() {
  const contentDir = path.join(process.cwd(), 'content', 'materials');
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

function markdownToDescription(markdown: string) {
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
    .filter(Boolean)[0] ?? '';
}

function normalizeMaterial(filePath: string, fileName: string, frontMatter: FrontMatter, markdown: string): DownloadItem {
  const code = toStringValue(frontMatter.code, path.basename(fileName, path.extname(fileName)));
  const title = toStringValue(frontMatter.title, code);
  const description = toStringValue(frontMatter.description, markdownToDescription(markdown));

  return {
    id: `material-${code}`,
    code,
    locale: toStringValue(frontMatter.locale, defaultLocale) as Locale,
    title,
    description,
    sort: Number(frontMatter.sort ?? 100),
    status: toStringValue(frontMatter.status, 'published') === 'draft' ? 'draft' : 'published',
    format: toStringValue(frontMatter.format, 'DOCX'),
    audience: toStringValue(frontMatter.audience, '参赛团队'),
    actionLabel: toStringValue(frontMatter.actionLabel, '下载'),
    fileUrl: toStringValue(frontMatter.fileUrl, '/materials'),
    extra: {
      sourceType: 'markdown',
      sourcePath: filePath.replaceAll('\\', '/'),
    },
  };
}

export function getMarkdownMaterials(locale?: string): DownloadItem[] {
  const contentDir = resolveContentDir();
  if (!contentDir) {
    return [];
  }

  const resolvedLocale = locale === 'en' ? 'en' : defaultLocale;
  return fs
    .readdirSync(contentDir)
    .filter((fileName) => markdownExtensions.has(path.extname(fileName).toLowerCase()))
    .filter((fileName) => fileName.toLowerCase() !== 'readme.md' && !fileName.startsWith('_'))
    .map((fileName) => {
      const filePath = path.join(contentDir, fileName);
      const raw = fs.readFileSync(filePath, 'utf8');
      const { frontMatter, markdown } = parseFrontMatter(raw);
      return normalizeMaterial(path.relative(process.cwd(), filePath), fileName, frontMatter, markdown);
    })
    .filter((material) => material.locale === resolvedLocale && material.status === 'published')
    .sort((left, right) => left.sort - right.sort || left.title.localeCompare(right.title));
}
