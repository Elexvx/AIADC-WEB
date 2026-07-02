export const ROUTES = {
  home: '/',
  events: '/events',
  materials: '/materials',
  news: '/news',
  registration: 'https://www.saikr.com/vse/aiadc',
  about: '/about',
  contact: '/contact',
} as const;

export type RouteKey = keyof typeof ROUTES;
