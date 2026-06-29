'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

type InternalLinkProps = {
  href: string;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  'aria-label'?: string;
};

function isHashOnlyLink(href: string) {
  return href.startsWith('#');
}

function isInternalRoute(href: string) {
  return href.startsWith('/') && !href.startsWith('//');
}

export function InternalLink({ href, children, ...props }: InternalLinkProps) {
  const pathname = usePathname();

  if (isHashOnlyLink(href)) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  }

  if (href.startsWith('/#')) {
    const targetId = href.slice(2);
    const resolvedHref = pathname === '/' ? `#${targetId}` : href;

    if (pathname === '/') {
      return (
        <a href={resolvedHref} {...props}>
          {children}
        </a>
      );
    }

    return (
      <Link href={resolvedHref} {...props}>
        {children}
      </Link>
    );
  }

  if (isInternalRoute(href)) {
    return (
      <Link href={href} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} {...props}>
      {children}
    </a>
  );
}
