import type { CmsPageContent, CmsSection, PageKey } from '@/lib/content/types';

export function getSection<TItem = any>(page: CmsPageContent, sectionCode: string) {
  return page.sections.find((section) => section.sectionCode === sectionCode) as CmsSection<TItem> | undefined;
}

export function getSectionItems<TItem = any>(page: CmsPageContent, sectionCode: string) {
  return getSection<TItem>(page, sectionCode)?.items ?? [];
}

export function isPageKey(value: string): value is PageKey {
  return [
    'home',
    'events',
    'materials',
    'about',
    'news',
  ].includes(value);
}
