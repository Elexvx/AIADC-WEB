import { FloatingActions, SiteFooter, SiteHeader } from '@/components/site-shell';
import { PageTransition } from '@/components/ui';

export default function SiteLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <div className="page-shell bg-background text-foreground transition-colors duration-300">
        <SiteHeader />
        <PageTransition>{children}</PageTransition>
        <SiteFooter />
      </div>
      <FloatingActions />
    </>
  );
}
