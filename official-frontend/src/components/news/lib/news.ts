import type { ArticleItem } from '@/lib/content/types';

export type NewsCategoryKey = ArticleItem['category'];

const fallbackNewsCategoryLabels: Record<string, string> = {
  news: '新闻动态',
  notice: '通知公告',
  media: '媒体报道',
};

export function getNewsCategoryLabel(category: ArticleItem['category'], categories?: Array<{ value: string; label: string }>) {
  return categories?.find((item) => item.value === category)?.label ?? fallbackNewsCategoryLabels[category] ?? category;
}
