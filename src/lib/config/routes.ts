export const ROUTES = {
  home: '/',
  intro: '/intro',
  events: '/events',
  projects: '/projects',
  materials: '/materials',
  news: '/news',
  login: '/login',
  registration: 'https://www.saikr.com/vse/aiadc',
  startupBase: '/startup-base',
  policies: '/policies',
  about: '/about',
  contact: '/contact',
  cookies: '/cookies',
  privacy: '/privacy',
  terms: '/terms',
} as const;

export type RouteKey = keyof typeof ROUTES;
