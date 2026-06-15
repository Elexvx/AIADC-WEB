import { NextResponse } from 'next/server';
import { getSiteMeta } from '@/shared/content';
import { isPageKey } from '@/shared/content/utils';

export const dynamic = 'force-static';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const pageKey = searchParams.get('pageKey');
  const locale = searchParams.get('locale') ?? undefined;

  if (!pageKey || !isPageKey(pageKey)) {
    return NextResponse.json({ message: 'Invalid pageKey.' }, { status: 400 });
  }

  return NextResponse.json(getSiteMeta(pageKey, locale));
}
