import { PageHero } from '@/shared/ui';
import { SiteFooter, SiteHeader } from '@/widgets/site-shell';

export const metadata = {
  title: '隐私政策',
  description: '全国大学生智能应用开发大赛隐私政策说明。',
};

export default function PrivacyPage() {
  return (
    <main className="page-shell bg-white">
      <SiteHeader />
      <PageHero
        eyebrow="隐私政策"
        title="隐私与信息使用说明"
        description="本页用于展示报名、资讯浏览与赛事服务过程中涉及的基础信息采集与使用说明，后续可根据正式规则继续完善。"
      />

      <section className="bg-white pb-12 sm:pb-14">
        <div className="section-shell rounded-lg border border-white bg-white/96 p-6 shadow-[0_16px_42px_rgba(15,23,42,0.07)] sm:p-8">
          <p className="text-sm leading-8 text-slate-600 sm:text-base">
            当前版本为站点结构整理阶段示意页，后续可接入正式隐私条款、数据使用说明与第三方服务声明。
          </p>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
