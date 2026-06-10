import { PageHero } from '@/shared/ui';
import { SiteFooter, SiteHeader } from '@/widgets/site-shell';

export const metadata = {
  title: '服务条款',
  description: '全国大学生智能应用开发大赛服务条款说明。',
};

export default function TermsPage() {
  return (
    <main className="page-shell bg-white">
      <SiteHeader />
      <PageHero
        eyebrow="服务条款"
        title="站点使用与赛事服务条款"
        description="本页用于承接赛事官网相关的访问、报名、资料下载与信息展示说明，后续可按正式对外版本补充完整条款。"
      />

      <section className="bg-white pb-12 sm:pb-14">
        <div className="section-shell rounded-lg border border-white bg-white/96 p-6 shadow-[0_16px_42px_rgba(15,23,42,0.07)] sm:p-8">
          <p className="text-sm leading-8 text-slate-600 sm:text-base">
            当前版本为路由和页面骨架统一后的占位页，方便站内导航、页脚与法务入口保持一致，避免继续跳回无关页面或首页锚点。
          </p>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
