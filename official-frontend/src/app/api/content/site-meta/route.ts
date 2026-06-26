import { NextResponse } from 'next/server';
import { getSiteMeta } from '@/lib/content';
import { isPageKey } from '@/lib/content/utils';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const pageKey = searchParams.get('pageKey');
  const locale = searchParams.get('locale') ?? undefined;

  if (!pageKey || !isPageKey(pageKey)) {
    return NextResponse.json({ message: 'Invalid pageKey.' }, { status: 400 });
  }

  return NextResponse.json(await getSiteMeta(pageKey, locale));
}
