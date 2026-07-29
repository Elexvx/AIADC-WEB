import { ChevronRight } from 'lucide-react';
import { Banner } from 'fumadocs-ui/components/banner';
import { ROUTES } from '@/lib/config/routes';
import { InternalLink } from '@/components/ui';

export function SiteTopNoticeBar() {
  return (
    <Banner
      variant="rainbow"
      changeLayout={false}
      height="3rem"
      className="site-top-notice overflow-hidden p-0"
    >
      <InternalLink
        href={ROUTES.news}
        aria-label="查看最新通知：2026 年报名征集与材料提交进行中，2026年7月1日 - 2026年9月30日"
        className="group block h-full w-full"
      >
        <div className="section-shell relative flex h-full items-center justify-center gap-3">
          <span className="shrink-0 rounded-full border border-fd-border bg-fd-background/70 px-2.5 py-0.5 text-xs font-semibold leading-5 text-fd-foreground shadow-sm backdrop-blur-sm">
            通知
          </span>
          <p className="min-w-0 max-w-full truncate pr-8 text-center text-sm font-medium tracking-[0] text-fd-foreground/85 transition-colors sm:pr-12 sm:text-[15px]">
            2026 年报名征集与材料提交进行中 · 2026年7月1日 - 2026年9月30日
          </p>

          <ChevronRight className="pointer-events-none absolute right-4 h-4 w-4 shrink-0 text-fd-muted-foreground transition-colors duration-200 group-hover:text-fd-foreground" />
        </div>
      </InternalLink>
    </Banner>
  );
}
