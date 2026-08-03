export const ROUTES = {
  home: '/',
  events: '/events',
  materials: '/materials',
  docs: '/docs',
  docsOverview: '/docs/overview',
  docsParticipation: '/docs/participation',
  docsSchedule: '/docs/schedule',
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
  { label: '参赛说明', href: ROUTES.docsParticipation },
  { label: '评分标准', href: ROUTES.docsReview },
] as const;

export const SITE_NAV_ITEMS = [
  { label: '活动中心', href: ROUTES.events },
  { label: '参赛指南', href: ROUTES.docsParticipation },
  { label: '通知公告', href: ROUTES.news },
  { label: '关于大赛', href: ROUTES.about },
  { label: '商务合作', href: ROUTES.cooperation },
  { label: '联系方式', href: ROUTES.contact },
] as const;

export type RouteKey = keyof typeof ROUTES;
