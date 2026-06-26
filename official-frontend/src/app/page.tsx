import { getPageMetadata } from '@/lib/metadata';
import { HomePageClient } from './home-page-client';

export async function generateMetadata() {
  return getPageMetadata('home', '/');
}

export default function HomePage() {
  return <HomePageClient />;
}
