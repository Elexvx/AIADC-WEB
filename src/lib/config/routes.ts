export const ROUTES = {
  home: '/',
  events: '/events',
  materials: '/materials',
  docs: '/docs',
  docsOverview: '/docs/overview',
  docsParticipation: '/docs/participation',
  docsSchedule: '/docs/schedule',
  docsMaterials: '/docs/materials',
  docsReview: '/docs/review',
  docsFaq: '/docs/faq',
  docsContact: '/docs/contact',
  news: '/news',
  registration: 'https://bm.aiadc.org.cn',
  about: '/about',
  cooperation: '/cooperation',
  contact: '/contact',
} as const;

export const DOCS_NAV_ITEMS = [
  { label: '文档首页', href: ROUTES.docs },
  { label: '大赛概览', href: ROUTES.docsOverview },
  { label: '参赛指南', href: ROUTES.docsParticipation },
  { label: '赛程安排', href: ROUTES.docsSchedule },
  { label: '参赛材料', href: ROUTES.docsMaterials },
  { label: '评审规则', href: ROUTES.docsReview },
  { label: '常见问题', href: ROUTES.docsFaq },
  { label: '联系咨询', href: ROUTES.docsContact },
] as const;

export const DOCS_PRIMARY_NAV_ITEMS = DOCS_NAV_ITEMS.slice(0, 6);

export type RouteKey = keyof typeof ROUTES;
