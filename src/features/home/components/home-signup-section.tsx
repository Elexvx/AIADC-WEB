'use client';

import { ArrowRight } from 'lucide-react';
import { usePageContent } from '@/shared/i18n/locale-provider';
import { Button, InternalLink } from '@/shared/ui';

export function HomeSignupSection() {
  const page = usePageContent('home');
  const signup = page.ctaBanner;

  if (!signup?.action) {
    return null;
  }

  return (
    <section id="signup" className="bg-white py-10 sm:py-12">
      <div className="section-shell rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_16px_42px_rgba(15,23,42,0.07)] sm:p-8 lg:p-10">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <div className="section-kicker text-blue-600">{signup.kicker}</div>
          <h2 className="mt-4 max-w-3xl text-balance text-3xl font-black tracking-[-0.06em] text-slate-950 sm:text-4xl lg:text-5xl">
            {signup.title}
          </h2>
          <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg sm:leading-9">
            {signup.description}
          </p>
          <div className="mt-8">
            <Button
              asChild
              size="lg"
              className="h-12 rounded-xl bg-[#155dfc] px-8 font-semibold !text-white shadow-[0_14px_30px_rgba(21,93,252,0.22)] hover:bg-[#1447e6]"
            >
              <InternalLink href={signup.action.href} className="inline-flex items-center justify-center gap-2 !text-white">
                {signup.action.label}
                <ArrowRight className="h-4 w-4 shrink-0 !text-white" />
              </InternalLink>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
