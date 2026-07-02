const DEFAULT_LOCAL_LUMIRA_API_BASE = 'http://localhost:8080';
const DEFAULT_PUBLIC_CONTENT_PATH = '/api/v1/public/aiadc/content';
const DEFAULT_ACTIVITIES_PATH = '/api/v1/public/aiadc/activities';
const DEFAULT_REQUEST_TIMEOUT_MS = 1500;

const trimTrailingSlash = (value: string) => value.replace(/\/+$/, '');
const withProtocol = (value: string) => (value.startsWith('http://') || value.startsWith('https://') ? value : `https://${value}`);

const parsePositiveInteger = (value: string | undefined, fallback: number) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
};

const resolveSiteOrigin = () => {
  const configuredOrigin = process.env.LUMIRA_SITE_ORIGIN || process.env.NEXT_PUBLIC_SITE_URL;
  if (configuredOrigin) {
    return trimTrailingSlash(withProtocol(configuredOrigin));
  }

  const vercelOrigin = process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;
  if (vercelOrigin) {
    return trimTrailingSlash(withProtocol(vercelOrigin));
  }

  return trimTrailingSlash(withProtocol(process.env.LUMIRA_LOCAL_API_BASE || DEFAULT_LOCAL_LUMIRA_API_BASE));
};

export const lumiraServiceConfig = {
  apiBase: process.env.LUMIRA_API_BASE || process.env.NEXT_PUBLIC_API_BASE
    ? trimTrailingSlash(withProtocol(process.env.LUMIRA_API_BASE || process.env.NEXT_PUBLIC_API_BASE || ''))
    : '',
  publicContentPath: process.env.LUMIRA_PUBLIC_CONTENT_PATH || DEFAULT_PUBLIC_CONTENT_PATH,
  activitiesPath: process.env.LUMIRA_ACTIVITIES_PATH || DEFAULT_ACTIVITIES_PATH,
  requestTimeoutMs: parsePositiveInteger(process.env.LUMIRA_REQUEST_TIMEOUT_MS, DEFAULT_REQUEST_TIMEOUT_MS),
};

export const createLumiraUrl = (path: string) => {
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return new URL(path);
  }

  const base = lumiraServiceConfig.apiBase || resolveSiteOrigin();
  return new URL(path, `${base}/`);
};
