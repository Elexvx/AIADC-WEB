import { ArrowRight } from 'lucide-react';
import { ROUTES } from '@/lib/config/routes';
import { Button, InternalLink } from '@/components/ui';

export default function NotFoundPage() {
  return (
    <main className="flex min-h-[calc(100svh-8rem)] flex-1 items-center justify-center bg-background px-6 py-20 text-foreground">
      <section aria-labelledby="not-found-title" className="w-full max-w-md text-center">
        <h1 id="not-found-title" className="text-[5rem] font-bold leading-none tracking-[0] text-[#0075de] sm:text-[6.5rem]">
          404
        </h1>
        <div className="mt-8 flex justify-center">
          <Button asChild size="lg" className="px-7">
            <InternalLink href={ROUTES.home}>
              返回首页
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </InternalLink>
          </Button>
        </div>
      </section>
    </main>
  );
}
