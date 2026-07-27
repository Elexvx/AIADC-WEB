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
  'doc-action not-prose min-h-10 gap-2 rounded-md px-4 py-2 no-underline shadow-none',
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
