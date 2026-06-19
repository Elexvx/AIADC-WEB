const DEFAULT_LUMIRA_API_BASE = 'http://localhost:8080';
const DEFAULT_PUBLIC_CONTENT_PATH = '/api/v1/public/aiadc/content';
const DEFAULT_REQUEST_TIMEOUT_MS = 8000;

const trimTrailingSlash = (value: string) => value.replace(/\/+$/, '');

const parsePositiveInteger = (value: string | undefined, fallback: number) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
};

export const lumiraServiceConfig = {
  apiBase: trimTrailingSlash(process.env.LUMIRA_API_BASE || process.env.NEXT_PUBLIC_API_BASE || DEFAULT_LUMIRA_API_BASE),
  publicContentPath: process.env.LUMIRA_PUBLIC_CONTENT_PATH || DEFAULT_PUBLIC_CONTENT_PATH,
  requestTimeoutMs: parsePositiveInteger(process.env.LUMIRA_REQUEST_TIMEOUT_MS, DEFAULT_REQUEST_TIMEOUT_MS),
};

export const createLumiraUrl = (path: string) => new URL(path, `${lumiraServiceConfig.apiBase}/`);
