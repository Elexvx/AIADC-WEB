import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import { DownloadAction, RegistrationAction } from '@/components/docs/doc-actions';
import { DocumentationColumns } from '@/components/docs/documentation-columns';

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    DocumentationColumns,
    DownloadAction,
    RegistrationAction,
    ...components,
  };
}
