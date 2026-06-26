import type { MetadataRoute } from 'next';
import { getPublicSiteUrl } from '@/lib/config/site';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getPublicSiteUrl();

  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
