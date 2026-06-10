import { ArrowRight } from 'lucide-react';
import { Button, PageHero } from '@/shared/ui';
import { ROUTES } from '@/shared/config/routes';
import { SiteFooter, SiteHeader } from '@/widgets/site-shell';

export const metadata = {
  title: '登录入口',
  description: '全国大学生智能应用开发大赛登录入口。',
};

export default function LoginPage() {
  return (
    <main className="page-shell bg-white">
      <SiteHeader />
      <PageHero
        eyebrow="登录入口"
        title="进入赛事系统"
        description="这里将承接正式登录流程。当前版本可先通过报名系统入口继续后续操作。"
      />

      <section className="bg-white pb-12 sm:pb-16">
        <div className="section-shell text-center">
          <Button
            asChild
            size="lg"
            className="h-12 rounded-xl bg-[#0f5ae5] px-8 font-semibold text-white shadow-[0_14px_30px_rgba(15,90,229,0.24)] hover:bg-[#0b4fd0]"
          >
            <a href={ROUTES.home} className="inline-flex items-center justify-center gap-2 text-white">
              进入报名系统
              <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
