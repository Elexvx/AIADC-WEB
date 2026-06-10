import { Building2, Compass, Rocket } from 'lucide-react';
import { PageHero } from '@/shared/ui';
import { SiteFooter, SiteHeader } from '@/widgets/site-shell';

const baseItems = [
  { icon: Rocket, title: '项目孵化支持', description: '围绕参赛项目的产品打磨、路演准备与后续验证，提供更连续的成长支持。' },
  { icon: Building2, title: '资源对接场景', description: '连接院校、导师、企业伙伴与展示机会，让优秀作品在赛后继续沉淀与转化。' },
  { icon: Compass, title: '发展路径建议', description: '帮助团队从竞赛作品走向应用试点、成果展示与后续申报，形成更清晰的发展路径。' },
];

export const metadata = {
  title: '创业基地',
  description: '查看赛事关联的创业基地支持与项目孵化方向。',
};

export default function StartupBasePage() {
  return (
    <main className="page-shell bg-white">
      <SiteHeader />
      <PageHero
        eyebrow="创业基地"
        title="竞赛之外的项目成长支持"
        description="为具备延展潜力的团队和作品提供展示、孵化与资源衔接场景，让优秀项目在比赛之后继续前进。"
      />

      <section className="bg-white pb-12 sm:pb-14">
        <div className="section-shell grid gap-5 md:grid-cols-3">
          {baseItems.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="rounded-lg border border-white bg-white/96 p-6 shadow-[0_16px_42px_rgba(15,23,42,0.07)]">
                <Icon className="h-6 w-6 text-blue-600" />
                <h2 className="mt-4 text-xl font-black tracking-[-0.04em] text-slate-950">{item.title}</h2>
                <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">{item.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
