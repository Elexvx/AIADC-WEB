import { ArrowRight, Flame } from 'lucide-react';
import { ROUTES } from '@/shared/config/routes';
import { Badge, Button, Card, CardContent, InternalLink, SectionHeading } from '@/shared/ui';

export function HomeLatestActivitySection() {
  return (
    <section id="latest-activity" className="bg-white pt-10 pb-6 sm:pt-12 sm:pb-8">
      <div className="section-shell">
        <SectionHeading centered eyebrow="最新活动" title="当前最重要事项" description="只展示当前最紧急、最需要参赛团队关注的赛事动作。" />

        <div className="mx-auto mt-9 max-w-5xl">
          <Card className="overflow-hidden rounded-lg border-blue-100 bg-gradient-to-br from-blue-50 via-white to-cyan-50 shadow-[0_16px_42px_rgba(15,23,42,0.07)]">
            <CardContent className="grid gap-6 p-5 sm:p-7 lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:items-center">
              <div className="grid h-14 w-14 place-items-center rounded-lg bg-blue-600 text-white shadow-[0_14px_30px_rgba(37,99,235,0.24)]">
                <Flame className="h-7 w-7" />
              </div>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-3">
                  <Badge className="border border-blue-100 bg-white text-blue-700">火热报名</Badge>
                  <span className="text-sm font-semibold text-slate-500">06.10 - 07.15</span>
                </div>
                <h3 className="mt-4 text-2xl font-extrabold tracking-[-0.05em] text-slate-950 sm:text-3xl">报名通道开放中</h3>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
                  参赛团队可登录平台完成报名与作品提交，建议提前确认队伍信息、赛道方向和项目材料。
                </p>
              </div>
              <Button asChild className="w-fit rounded-md bg-blue-600 px-5 text-white hover:bg-blue-500 lg:justify-self-end">
                <InternalLink href={ROUTES.login} className="inline-flex items-center gap-2">
                  立即报名
                  <ArrowRight className="h-4 w-4" />
                </InternalLink>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
