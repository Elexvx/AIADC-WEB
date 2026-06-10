import { siteContent, type NewsArticleItem } from '@/entities/site';

export const newsCategorySummaries = {
  news: {
    label: '新闻动态',
    description: '关注赛事进展、赛道发布与评审节奏，快速掌握关键动态。',
  },
  notice: {
    label: '通知公告',
    description: '集中查看报名要求、材料规范、时间节点与规则更新。',
  },
  media: {
    label: '媒体报道',
    description: '汇总产业伙伴、媒体观察与赛事生态合作相关内容。',
  },
} as const;

export type NewsCategoryKey = keyof typeof newsCategorySummaries;

export function getNewsCategoryLabel(category: NewsArticleItem['category']) {
  return newsCategorySummaries[category]?.label ?? '新闻动态';
}

export function getArticlesByCategory(category: NewsArticleItem['category']) {
  return siteContent.newsArticles.filter((article) => article.category === category);
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
