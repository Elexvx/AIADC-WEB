import { NextResponse } from 'next/server';
import { getSiteShellContent } from '@/shared/content';

export const dynamic = 'force-static';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const locale = searchParams.get('locale') ?? undefined;

  return NextResponse.json(getSiteShellContent(locale));
}
