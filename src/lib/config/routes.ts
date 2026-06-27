export const ROUTES = {
  home: '/',
  intro: '/intro',
  events: '/events',
  projects: '/projects',
  materials: '/materials',
  news: '/news',
  login: '/login',
  startupBase: '/startup-base',
  policies: '/policies',
  about: '/about',
  privacy: '/privacy',
  terms: '/terms',
} as const;

export type RouteKey = keyof typeof ROUTES;
