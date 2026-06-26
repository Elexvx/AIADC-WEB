import { NextResponse } from 'next/server';
import { getNewsArticleBySlug } from '@/lib/content';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const locale = searchParams.get('locale') ?? undefined;
  const slug = searchParams.get('slug');

  if (!slug) {
    return NextResponse.json({ message: 'Missing slug.' }, { status: 400 });
  }

  const article = await getNewsArticleBySlug(slug, locale);

  if (!article) {
    return NextResponse.json({ message: 'Article not found.' }, { status: 404 });
  }

  return NextResponse.json(article);
}
