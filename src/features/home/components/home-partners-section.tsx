import { homePartnerLogos } from '@/features/home/config/home-content';
import { Card, CardContent, SectionHeading } from '@/shared/ui';

export function HomePartnersSection() {
  return (
    <section id="partners" className="bg-white pb-10 sm:pb-12">
      <div className="section-shell">
        <div className="mx-auto max-w-4xl text-center">
          <SectionHeading centered eyebrow="合作伙伴" title="共建智能应用创新生态" description="联合高校、产业机构与技术平台，为参赛团队提供命题、评审、资源与生态支持。" />
        </div>
        <div className="mt-9 grid grid-cols-2 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-[0_16px_42px_rgba(15,23,42,0.06)] sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {homePartnerLogos.map((partner) => (
            <Card key={partner} className="rounded-none border-0 border-r border-b border-slate-200 bg-white shadow-none">
              <CardContent className="grid min-h-24 place-items-center !p-5 text-center">
                <span className="text-balance text-sm font-black tracking-[-0.03em] text-slate-500 sm:text-base">{partner}</span>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
