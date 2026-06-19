import { ArrowRight } from 'lucide-react';
import { InternalLink } from '@/shared/ui';

interface CtaBannerData {
  title?: string;
  description?: string;
  link?: { href?: string; label?: string };
}

interface MaterialCtaBannerProps {
  banner: CtaBannerData;
}

export function MaterialCtaBanner({ banner }: MaterialCtaBannerProps) {
  return (
    <div className="mt-8 flex items-center justify-between gap-4 rounded-2xl bg-slate-50 px-6 py-5 ring-1 ring-slate-200/80 sm:px-8">
      <div>
        <div className="heading-4 text-slate-950">{banner.title}</div>
        <p className="mt-1 text-sm leading-7 text-slate-600 sm:text-base">{banner.description}</p>
      </div>
      <InternalLink href={banner.link?.href ?? '/intro'} className="inline-flex shrink-0 items-center gap-2 text-sm font-bold text-blue-700">
        {banner.link?.label ?? '查看赛事介绍'}
        <ArrowRight className="h-4 w-4" />
      </InternalLink>
    </div>
  );
}
