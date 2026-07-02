import { getContentBundle } from '@/lib/content';
import { getPageMetadata } from '@/lib/metadata';
import { HomePageClient } from './home-page-client';

export async function generateMetadata() {
  return getPageMetadata('home', '/');
}

export default async function HomePage() {
  const content = await getContentBundle('zh');
  return <HomePageClient page={content.pages.home} news={content.news} />;
}
