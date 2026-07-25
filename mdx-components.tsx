import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import { DownloadAction, RegistrationAction } from '@/components/docs/doc-actions';

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    DownloadAction,
    RegistrationAction,
    ...components,
  };
}
