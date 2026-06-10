import { Code2, Rocket, Sparkles } from 'lucide-react';
import { eventPageItems, siteContent } from '@/entities/site';
import { Badge, Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui';
import { SiteFooter, SiteHeader } from '@/widgets/site-shell';

const trackIcons = [Sparkles, Code2, Rocket];

export const metadata = {
  title: '赛区设置',
  description: '全国大学生智能应用开发大赛赛区与赛道设置。',
};

export default function TracksPage() {
  return (
    <main className="page-shell bg-white">
      <SiteHeader />
      <section className="section-shell py-10 sm:py-14">
        <div className="mb-8 flex gap-3 overflow-x-auto pb-2 hide-scrollbar">
          {eventPageItems.map((item) => (
            <a key={item.href} href={item.href} className={`shrink-0 rounded-full px-5 py-2 text-sm font-bold ${item.href === '/tracks' ? 'bg-blue-600 text-white' : 'bg-white text-slate-600'}`}>
              {item.label}
            </a>
          ))}
        </div>
        <div className="mx-auto max-w-4xl text-center">
          <div className="section-kicker mx-auto text-blue-600">赛区设置</div>
          <h1 className="mt-4 text-balance text-4xl font-black tracking-[-0.06em] text-slate-950 sm:text-6xl">三大赛道同步开放</h1>
          <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">从概念孵化、原型构建到敏捷开发，覆盖智能应用开发的完整生命周期。</p>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {siteContent.tracks.map((track, index) => {
            const Icon = trackIcons[index] ?? Sparkles;
            return (
              <Card key={track.title} className="flex h-full flex-col rounded-lg border-white bg-white/96 shadow-[0_16px_42px_rgba(15,23,42,0.07)]">
                <CardHeader className="space-y-5 p-6">
                  <div className="flex items-center justify-between gap-4">
                    <div className="grid h-12 w-12 place-items-center rounded-lg bg-gradient-to-br from-blue-50 to-cyan-50 text-blue-600 ring-1 ring-blue-100">
                      <Icon className="h-6 w-6" />
                    </div>
                    <Badge className="border border-blue-100 bg-blue-50 text-blue-700">{track.code}</Badge>
                  </div>
                  <div>
                    <CardTitle className="text-xl font-black tracking-[-0.05em] text-slate-950">{track.title}</CardTitle>
                    <CardDescription className="mt-3 text-sm leading-7 text-slate-600">{track.description}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="mt-auto px-6 pb-6 pt-0">
                  <Button asChild variant="outline" className="w-full rounded-md border-blue-200 text-blue-700 hover:bg-blue-50">
                    <a href="/#signup" className="inline-flex items-center gap-2">
                      {track.cta}
                    </a>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
