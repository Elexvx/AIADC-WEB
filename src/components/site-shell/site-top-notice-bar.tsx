import { ChevronRight, Megaphone } from 'lucide-react';
import { ROUTES } from '@/lib/config/routes';
import { InternalLink } from '@/components/ui';

export function SiteTopNoticeBar() {
  return (
    <InternalLink
      href={ROUTES.docsSchedule}
      aria-label="查看赛事公告与赛程：2026 年报名征集与材料提交进行中，2026年7月1日 - 2026年9月30日"
      className="site-top-notice group block transition-colors duration-200"
    >
      <div className="section-shell relative flex min-h-9 items-center justify-center gap-2.5 py-1.5">
        <span className="inline-flex shrink-0 items-center gap-1.5 text-xs font-semibold text-[#0075de]">
          <Megaphone aria-hidden="true" className="h-3.5 w-3.5" />
          赛事公告
        </span>
        <span aria-hidden="true" className="h-3.5 w-px shrink-0 bg-[#d8d8d8] dark:bg-white/20" />
        <p className="min-w-0 max-w-full truncate pr-7 text-center text-xs font-medium text-[#615d59] transition-colors dark:text-white/72 sm:text-sm">
          2026 年报名征集与材料提交进行中 · 2026年7月1日 - 2026年9月30日
        </p>

        <ChevronRight className="pointer-events-none absolute right-0 h-3.5 w-3.5 shrink-0 text-[#615d59] transition-colors duration-200 group-hover:text-[#0075de] dark:text-white/72 sm:right-1" />
      </div>
    </InternalLink>
  );
}
