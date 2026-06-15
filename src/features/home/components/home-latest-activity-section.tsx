import { ArrowRight } from 'lucide-react';
import { ROUTES } from '@/shared/config/routes';
import { Badge, Button, Card, CardContent, InternalLink, SectionHeading } from '@/shared/ui';

export function HomeLatestActivitySection() {
  return (
    <section id="latest-activity" className="bg-white pt-10 pb-6 sm:pt-12 sm:pb-8">
      <div className="section-shell">
        <SectionHeading centered eyebrow="最新活动" title="当前最重要事项" description="只展示当前最紧急、最需要参赛团队关注的赛事动作。" />

        <div className="mt-9">
          <Card className="overflow-hidden rounded-lg border-slate-200 bg-white">
            <CardContent className="grid gap-6 p-5 sm:p-7 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-3">
                  <Badge className="border border-blue-100 bg-white text-blue-700">火热报名</Badge>
                  <span className="text-sm font-semibold text-slate-500">06.10 - 07.15</span>
                </div>
                <h3 className="mt-4 heading-2 text-slate-950">报名通道开放中</h3>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
                  参赛团队可登录平台完成报名与作品提交，建议提前确认队伍信息、赛道方向和项目材料。
                </p>
              </div>
              <Button asChild className="w-fit rounded-md border border-blue-200 bg-white px-5 text-blue-700 hover:bg-blue-50 lg:justify-self-end">
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
