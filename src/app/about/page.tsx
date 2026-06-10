import { Building2, Flag, Users2 } from 'lucide-react';
import { PageHero } from '@/shared/ui';
import { SiteFooter, SiteHeader } from '@/widgets/site-shell';

const aboutItems = [
  { icon: Flag, title: '赛事定位', description: '全国大学生智能应用开发大赛聚焦高校与青年团队的智能应用开发与真实场景验证。' },
  { icon: Users2, title: '组织协同', description: '围绕组委会、评审专家、院校团队与生态伙伴构建协同机制，保证赛事组织与展示质量。' },
  { icon: Building2, title: '生态连接', description: '通过赛事连接项目展示、资源对接与成果传播，推动优秀作品被更多合作方看见。' },
];

export const metadata = {
  title: '关于我们',
  description: '查看全国大学生智能应用开发大赛的定位、组织方式与生态连接。',
};

export default function AboutPage() {
  return (
    <main className="page-shell bg-white">
      <SiteHeader />
      <PageHero
        eyebrow="关于我们"
        title="了解赛事定位与组织方式"
        description="从赛事目标、组织结构与生态合作三个层面，帮助访问者快速理解这项比赛在高校创新场景中的角色。"
      />

      <section className="bg-white pb-12 sm:pb-14">
        <div className="section-shell grid gap-5 md:grid-cols-3">
          {aboutItems.map((item) => {
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
