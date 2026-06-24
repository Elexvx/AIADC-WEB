import { Bell, ChevronRight } from 'lucide-react';
import { ROUTES } from '@/shared/config/routes';
import { Button, Card, CardContent, InternalLink } from '@/shared/ui';

export function HomeLatestActivitySection() {
  return (
    <section id="latest-activity" className="bg-white pt-12 pb-7 sm:pt-14 sm:pb-8">
      <div className="section-shell">
        <Card className="overflow-hidden rounded-md border-blue-100 bg-white shadow-none">
          <CardContent className="grid gap-5 p-5 sm:p-7 lg:grid-cols-[11rem_minmax(0,1fr)_auto] lg:items-center">
            <div className="flex items-center gap-3 text-[#0b55b7]">
              <Bell className="h-7 w-7 stroke-[1.8]" />
              <span className="text-xl font-semibold">最新通知</span>
            </div>

            <div className="min-w-0">
              <h3 className="text-lg font-semibold tracking-wide text-[#082656]">2026年报名征集与材料提交进行中</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                报名时间：2026年7月1日 - 2026年10月31日
                <span className="mx-3 hidden text-slate-300 sm:inline">|</span>
                <span className="block sm:inline">材料提交截止：2026年10月31日 17:00</span>
              </p>
            </div>

            <Button asChild className="h-12 w-fit rounded-md bg-[#0b55b7] px-7 text-sm font-bold !text-white hover:bg-[#08458f] lg:justify-self-end">
              <InternalLink href={ROUTES.news} className="inline-flex items-center gap-2 !text-white">
                查看通知
                <ChevronRight className="h-4 w-4 !text-white" />
              </InternalLink>
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
