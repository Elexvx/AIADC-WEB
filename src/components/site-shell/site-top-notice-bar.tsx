import { ChevronRight } from 'lucide-react';
import { ROUTES } from '@/lib/config/routes';
import { InternalLink } from '@/components/ui';

export function SiteTopNoticeBar() {
  return (
    <InternalLink
      href={ROUTES.news}
      aria-label="查看最新通知：2026 年报名征集与材料提交进行中，2026年7月1日 - 2026年9月30日"
      className="site-top-notice group relative block overflow-hidden transition-colors duration-300"
    >
      <div className="section-shell relative flex items-center justify-center gap-2 py-2 sm:py-2.5">
        <span className="shrink-0 rounded-full bg-[#0075de] px-2.5 py-0.5 text-xs font-semibold leading-5 text-white">
          通知
        </span>
        <p className="min-w-0 max-w-full truncate pr-8 text-center text-sm font-medium tracking-[0] transition-colors sm:pr-12 sm:text-[15px]">
          2026 年报名征集与材料提交进行中 · 2026年7月1日 - 2026年9月30日
        </p>

        <ChevronRight className="pointer-events-none absolute right-0 h-4 w-4 shrink-0 text-[#0075de] transition-colors duration-200 group-hover:text-[#005bab] dark:text-white/82 sm:right-1" />
      </div>
    </InternalLink>
  );
}
