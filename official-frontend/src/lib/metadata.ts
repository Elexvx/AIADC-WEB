import type { Metadata } from 'next';
import { getSiteMeta } from '@/lib/content';
import { getPublicSiteUrl } from '@/lib/config/site';
import type { PageKey } from '@/lib/content/types';

export function getCanonicalPath(path: string) {
  if (path === '/') {
    return '/';
  }

  return `${path.replace(/\/+$/, '')}/`;
}

export function getAbsoluteSiteUrl(path: string) {
  return new URL(getCanonicalPath(path), getPublicSiteUrl()).toString();
}

export async function getPageMetadata(pageKey: PageKey, path: string): Promise<Metadata> {
  const meta = await getSiteMeta(pageKey, 'zh');
  const canonical = getCanonicalPath(path);

  return {
    ...meta,
    alternates: {
      canonical,
      languages: {
        'zh-CN': canonical,
      },
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: canonical,
    },
    twitter: {
      title: meta.title,
      description: meta.description,
    },
  };
}
