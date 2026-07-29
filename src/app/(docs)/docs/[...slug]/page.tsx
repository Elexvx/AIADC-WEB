import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
  MarkdownCopyButton,
  ViewOptionsPopover,
} from 'fumadocs-ui/layouts/docs/page';
import { getMDXComponents } from '../../../../../mdx-components';
import { docsSource } from '@/lib/docs/source';

type DocumentationPageProps = {
  params: Promise<{
    slug: string[];
  }>;
};

export function generateStaticParams() {
  return docsSource.generateParams().filter((entry) => entry.slug.length > 0);
}

export async function generateMetadata({ params }: DocumentationPageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = docsSource.getPage(slug);

  if (!page) {
    return {
      title: '赛事文档',
      robots: { index: false, follow: false },
    };
  }

  return {
    title: page.data.title,
    description: page.data.description,
    alternates: {
      canonical: page.url,
    },
  };
}

export default async function DocumentationPage({ params }: DocumentationPageProps) {
  const { slug } = await params;
  const page = docsSource.getPage(slug);

  if (!page) {
    notFound();
  }

  const MDXContent = page.data.body;
  const markdownUrl = `/api/docs/raw/${slug.join('/')}`;
  const isParticipationGuide = slug.length === 1 && slug[0] === 'participation';

  return (
    <DocsPage
      className={isParticipationGuide ? 'aiadc-doc-page' : undefined}
      toc={page.data.toc}
      breadcrumb={{ enabled: false }}
      tableOfContent={{ style: 'clerk' }}
      tableOfContentPopover={{ style: 'clerk' }}
    >
      <DocsTitle className={isParticipationGuide ? 'aiadc-doc-title' : undefined}>{page.data.title}</DocsTitle>
      <DocsDescription className={isParticipationGuide ? 'aiadc-doc-description mb-2' : 'mb-2'}>
        {page.data.description}
      </DocsDescription>
      <div
        className={[
          'mb-4 flex flex-row flex-wrap items-center gap-2 border-b pb-6',
          isParticipationGuide ? 'aiadc-doc-actions' : '',
        ].join(' ')}
      >
        <MarkdownCopyButton markdownUrl={markdownUrl} />
        <ViewOptionsPopover markdownUrl={markdownUrl} />
      </div>
      <DocsBody className={isParticipationGuide ? 'aiadc-doc-body text-fd-foreground/90' : 'text-fd-foreground/90'}>
        <MDXContent components={getMDXComponents()} />
      </DocsBody>
    </DocsPage>
  );
}
