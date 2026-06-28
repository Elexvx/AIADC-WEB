import { ArrowRight } from 'lucide-react';
import { InternalLink } from '@/components/ui';

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
    <div className="notion-card mt-8 flex items-center justify-between gap-4 px-6 py-5 sm:px-8">
      <div>
        <div className="heading-4 notion-card-title">{banner.title}</div>
        <p className="notion-card-body mt-1 text-sm leading-7 sm:text-base">{banner.description}</p>
      </div>
      <InternalLink href={banner.link?.href ?? '/about/#tracks'} className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-[#0075de]">
        {banner.link?.label ?? '查看赛事介绍'}
        <ArrowRight className="h-4 w-4" />
      </InternalLink>
    </div>
  );
}
