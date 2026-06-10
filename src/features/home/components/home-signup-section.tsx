import { ArrowRight, Download } from 'lucide-react';
import { siteContent } from '@/entities/site';
import { Button } from '@/shared/ui';

export function HomeSignupSection() {
  return (
    <section id="signup" className="bg-white py-10 sm:py-12">
      <div className="section-shell grid gap-8 rounded-lg border border-white bg-white/96 p-6 shadow-[0_16px_42px_rgba(15,23,42,0.07)] sm:p-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <div className="section-kicker text-blue-600">报名参赛</div>
          <h2 className="mt-4 max-w-2xl text-balance text-4xl font-black tracking-[-0.06em] text-slate-950 sm:text-5xl">{siteContent.cta.title}</h2>
          <p className="mt-5 max-w-2xl text-lg leading-9 text-slate-600">{siteContent.cta.description}</p>
        </div>
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Button asChild size="lg" className="rounded-md bg-blue-600 text-white hover:bg-blue-500">
              <a href="#top" className="inline-flex items-center gap-2">
                {siteContent.cta.action}
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-md border-blue-200 bg-white text-blue-700 hover:bg-blue-50">
              <a href="/materials" className="inline-flex items-center gap-2">
                <Download className="h-4 w-4" />
                下载执行方案
              </a>
            </Button>
          </div>
          <p className="text-sm leading-7 text-slate-600">报名材料、赛道说明、作品模板与评审规则将在报名系统中同步开放。</p>
        </div>
      </div>
    </section>
  );
}
