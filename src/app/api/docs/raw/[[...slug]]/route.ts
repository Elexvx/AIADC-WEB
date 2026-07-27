import { docsSource } from '@/lib/docs/source';

type RawDocumentRouteProps = {
  params: Promise<{
    slug?: string[];
  }>;
};

export async function GET(_request: Request, { params }: RawDocumentRouteProps) {
  const { slug } = await params;
  const page = docsSource.getPage(slug);

  if (!page) {
    return new Response('Document not found.', {
      status: 404,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
      },
    });
  }

  const markdown = await page.data.getText('raw');

  return new Response(markdown, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=300, stale-while-revalidate=86400',
    },
  });
}
