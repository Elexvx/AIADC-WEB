import { getNewsArticles, getNewsCategories, type ArticleItem } from '@/shared/content';

export const newsCategorySummaries = Object.fromEntries(
  getNewsCategories('zh').map((item) => [
    item.value,
    {
      label: item.label,
      description: item.description,
    },
  ]),
) as Record<ArticleItem['category'], { label: string; description: string }>;

export type NewsCategoryKey = keyof typeof newsCategorySummaries;

export function getNewsCategoryLabel(category: ArticleItem['category']) {
  return newsCategorySummaries[category]?.label ?? '新闻动态';
}

export function getArticlesByCategory(category: ArticleItem['category']) {
  return getNewsArticles('zh', category);
}

export function getNewsCategoryGroups() {
  return (Object.keys(newsCategorySummaries) as NewsCategoryKey[]).map((key) => {
    const articles = getArticlesByCategory(key);

    return {
      key,
      label: newsCategorySummaries[key].label,
      description: newsCategorySummaries[key].description,
      articles,
      count: articles.length,
      latestDate: articles[0]?.date ?? '',
    };
  });
}
