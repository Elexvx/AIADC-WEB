import { ArrowRight } from 'lucide-react';
import { getPageContent, getSiteMeta } from '@/shared/content';
import { Button, PageHero } from '@/shared/ui';
import { SiteFooter, SiteHeader } from '@/widgets/site-shell';

export const metadata = {
  ...getSiteMeta('login', 'zh'),
};

export default function LoginPage() {
  const page = getPageContent('login', 'zh');

  return (
    <main className="page-shell bg-white">
      <SiteHeader />
      <PageHero
        eyebrow={page.hero?.eyebrow ?? '登录入口'}
        title={page.hero?.title ?? ''}
        description={page.hero?.description ?? ''}
      />

      <section className="bg-white pb-12 sm:pb-16">
        <div className="section-shell text-center">
          <Button
            asChild
            size="lg"
            className="h-12 rounded-xl bg-[#0f5ae5] px-8 font-semibold text-white shadow-[0_14px_30px_rgba(15,90,229,0.24)] hover:bg-[#0b4fd0]"
          >
            <a href={page.primaryAction?.href ?? '/'} className="inline-flex items-center justify-center gap-2 text-white">
              {page.primaryAction?.label ?? '进入报名系统'}
              <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
