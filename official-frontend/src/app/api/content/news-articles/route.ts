import { NextResponse } from 'next/server';
import { getNewsArticles } from '@/lib/content';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const locale = searchParams.get('locale') ?? undefined;
  const category = searchParams.get('category') ?? undefined;

  return NextResponse.json(await getNewsArticles(locale, category as 'news' | 'notice' | 'media' | undefined));
}
