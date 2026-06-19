import type { ArticleItem } from '@/shared/content';

export type NewsCategoryKey = ArticleItem['category'];

const fallbackNewsCategoryLabels: Record<NewsCategoryKey, string> = {
  news: '新闻动态',
  notice: '通知公告',
  media: '媒体报道',
};

export function getNewsCategoryLabel(category: ArticleItem['category']) {
  return fallbackNewsCategoryLabels[category] ?? fallbackNewsCategoryLabels.news;
}
