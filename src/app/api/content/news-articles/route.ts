import { NextResponse } from 'next/server';
import { getNewsArticles } from '@/shared/content';

export const dynamic = 'force-static';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const locale = searchParams.get('locale') ?? undefined;
  const category = searchParams.get('category') ?? undefined;

  return NextResponse.json(getNewsArticles(locale, category as 'news' | 'notice' | 'media' | undefined));
}
