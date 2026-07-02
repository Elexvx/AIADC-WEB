export const ROUTES = {
  home: '/',
  events: '/events',
  materials: '/materials',
  news: '/news',
  registration: 'https://bm.aiadc.org.cn',
  about: '/about',
  contact: '/contact',
} as const;

export type RouteKey = keyof typeof ROUTES;
