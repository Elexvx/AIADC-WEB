const defaultSiteUrl = 'https://www.aiadc.org.cn';

export function getPublicSiteUrl() {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL ?? process.env.VITE_PUBLIC_SITE_URL ?? defaultSiteUrl;

  try {
    const url = new URL(configuredUrl);
    return url.origin;
  } catch {
    return defaultSiteUrl;
  }
}
