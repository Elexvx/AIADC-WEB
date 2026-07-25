'use client';

import { ArrowRight } from 'lucide-react';
import type { CmsPageContent } from '@/lib/content/types';
import { Button, InternalLink } from '@/components/ui';

export function HomeSignupSection({ page }: { page: CmsPageContent }) {
  const signup = page.ctaBanner;

  if (!signup?.action) {
    return null;
  }

  return (
    <section id="signup" className="bg-background py-14 transition-colors duration-300 sm:py-18">
      <div className="section-shell">
        <div className="overflow-hidden rounded-[24px] bg-[#213183] px-7 py-8 text-white transition-colors duration-300 sm:px-10 sm:py-11">
          <div className="max-w-3xl">
            <h2 className="notion-cta-title max-w-[16ch] text-white transition-colors duration-300 sm:max-w-none">
              {signup.title}
            </h2>
            {signup.description ? (
              <p className="notion-cta-body mt-5 max-w-2xl text-white/88 transition-colors duration-300">
                {signup.description}
              </p>
            ) : null}

            <Button
              asChild
              size="lg"
              className="mt-9 h-12 px-7 text-base !text-white"
            >
              <InternalLink href={signup.action.href} className="inline-flex items-center gap-3 !text-white">
                {signup.action.label}
                <ArrowRight className="h-5 w-5" />
              </InternalLink>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
