import { NextResponse } from 'next/server';
import { getPageContent } from '@/lib/content';
import { isPageKey } from '@/lib/content/utils';

export const dynamic = 'force-dynamic';

type RouteContext = {
  params: Promise<{
    pageKey: string;
  }>;
};

export function generateStaticParams() {
  return [
    { pageKey: 'home' },
    { pageKey: 'intro' },
    { pageKey: 'events' },
    { pageKey: 'projects' },
    { pageKey: 'startup-base' },
    { pageKey: 'materials' },
    { pageKey: 'about' },
    { pageKey: 'privacy' },
    { pageKey: 'terms' },
    { pageKey: 'login' },
    { pageKey: 'news' },
  ];
}

export async function GET(request: Request, { params }: RouteContext) {
  const { pageKey } = await params;
  const { searchParams } = new URL(request.url);
  const locale = searchParams.get('locale') ?? undefined;

  if (!isPageKey(pageKey)) {
    return NextResponse.json({ message: 'Invalid pageKey.' }, { status: 400 });
  }

  return NextResponse.json(await getPageContent(pageKey, locale));
}
