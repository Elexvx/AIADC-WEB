'use client';

import { ArrowRight } from 'lucide-react';
import { usePageContent } from '@/lib/i18n/locale-provider';
import { Button, InternalLink } from '@/components/ui';

export function HomeSignupSection() {
  const page = usePageContent('home');
  const signup = page.ctaBanner;

  if (!signup?.action) {
    return null;
  }

  return (
    <section id="signup" className="py-16 transition-colors duration-300 sm:py-20">
      <div className="section-shell">
        <div className="relative overflow-hidden rounded-xl bg-[#213183] px-7 py-8 text-white transition-colors duration-300 sm:px-10 sm:py-11">
          <div className="relative max-w-3xl">
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
              className="mt-9 h-12 rounded-full bg-[#0075de] px-7 text-base font-medium !text-white hover:bg-[#005bab]"
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
