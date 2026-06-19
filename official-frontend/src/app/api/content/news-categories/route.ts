import { NextResponse } from 'next/server';
import { getNewsCategories } from '@/shared/content';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const locale = searchParams.get('locale') ?? undefined;

  return NextResponse.json(await getNewsCategories(locale));
}
