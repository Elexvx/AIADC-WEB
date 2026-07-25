import { ArrowRight, Download } from 'lucide-react';
import { buttonVariants } from 'fumadocs-ui/components/ui/button';
import type { ReactNode } from 'react';
import { ROUTES } from '@/lib/config/routes';
import { cn } from '@/lib/utils';

type DocActionProps = {
  children?: ReactNode;
  href?: string;
  download?: boolean;
};

const actionClassName = cn(
  buttonVariants({ variant: 'primary' }),
  'doc-action not-prose min-h-10 gap-2 rounded-md bg-[#0075de] px-4 py-2 !text-white no-underline shadow-none',
  'hover:bg-[#0075de]/80 focus-visible:ring-[#0075de]',
);

export function RegistrationAction({ children = '进入报名系统' }: Pick<DocActionProps, 'children'>) {
  return (
    <a href={ROUTES.registration} className={actionClassName}>
      {children}
      <ArrowRight aria-hidden="true" className="h-4 w-4" />
    </a>
  );
}

export function DownloadAction({ children = '下载文件', href = '/materials', download }: DocActionProps) {
  return (
    <a href={href} download={download} className={actionClassName}>
      <Download aria-hidden="true" className="h-4 w-4" />
      {children}
    </a>
  );
}
