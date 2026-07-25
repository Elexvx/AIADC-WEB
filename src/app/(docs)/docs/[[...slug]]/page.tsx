import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { DocsBody, DocsDescription, DocsPage, DocsTitle } from 'fumadocs-ui/layouts/docs/page';
import { getMDXComponents } from '../../../../../mdx-components';
import { docsSource } from '@/lib/docs/source';

type DocumentationPageProps = {
  params: Promise<{
    slug?: string[];
  }>;
};

export function generateStaticParams() {
  return docsSource.generateParams();
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

  return (
    <DocsPage toc={page.data.toc}>
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody>
        <MDXContent components={getMDXComponents()} />
      </DocsBody>
    </DocsPage>
  );
}
