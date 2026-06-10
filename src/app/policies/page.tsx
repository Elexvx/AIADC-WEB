import { FileText, Landmark, ShieldCheck } from 'lucide-react';
import { PageHero } from '@/shared/ui';
import { SiteFooter, SiteHeader } from '@/widgets/site-shell';

const policyItems = [
  { icon: Landmark, title: '政策导向', description: '聚焦人工智能应用、青年创新创业与数字经济方向，帮助团队理解赛事所连接的政策背景。' },
  { icon: FileText, title: '申报参考', description: '整理与项目成长相关的公开信息、申报思路与资源线索，为后续发展做准备。' },
  { icon: ShieldCheck, title: '规范说明', description: '强调材料提交、知识产权、成果展示与项目说明等环节中的基本规范要求。' },
];

export const metadata = {
  title: '政策支持',
  description: '查看赛事相关政策背景与支持说明。',
};

export default function PoliciesPage() {
  return (
    <main className="page-shell bg-white">
      <SiteHeader />
      <PageHero
        eyebrow="政策支持"
        title="围绕项目成长的政策信息整理"
        description="从赛事场景出发，帮助参赛团队理解与智能应用、青年创新和成果转化相关的支持方向与规范要求。"
      />

      <section className="bg-white pb-12 sm:pb-14">
        <div className="section-shell grid gap-5 md:grid-cols-3">
          {policyItems.map((item) => {
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
