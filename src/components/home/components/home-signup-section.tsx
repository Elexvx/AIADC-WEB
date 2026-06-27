'use client';

import { ArrowRight } from 'lucide-react';
import { usePageContent } from '@/lib/i18n/locale-provider';
import { Button, InternalLink } from '@/components/ui';
import { HomeSectionTitle } from './home-section-title';

export function HomeSignupSection() {
  const page = usePageContent('home');
  const signup = page.ctaBanner;
  const signupItems = signup?.items?.filter((item) => item?.title && item?.action?.href) ?? [];

  if (!signup?.action) {
    return null;
  }

  if (signupItems.length > 0) {
    return (
      <section id="signup" className="py-16 transition-colors duration-300 sm:py-20">
        <div className="section-shell">
          <div className="grid gap-5 lg:grid-cols-[minmax(0,1.06fr)_minmax(0,1.74fr)]">
            <div className="relative overflow-hidden rounded-xl bg-[#213183] px-7 py-8 text-white transition-colors duration-300 sm:px-10 sm:py-11">
              <div className="relative max-w-lg">
                <h2 className="notion-cta-title max-w-[15ch] text-white transition-colors duration-300">
                  {signup.title}
                </h2>
                {signup.description ? (
                  <p className="notion-cta-body mt-5 max-w-xl text-white/88 transition-colors duration-300">
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

            <div className="grid gap-5 sm:grid-cols-2">
              {signupItems.map((item) => (
                <InternalLink
                  key={item.title}
                  href={item.action.href}
                  className="notion-card group relative flex min-h-[150px] flex-col justify-between overflow-hidden px-7 py-7 transition-colors duration-200 hover:border-[#d4d4d4]"
                >
                  <span className="absolute right-7 top-7 grid h-10 w-10 place-items-center text-[#0075de] transition-colors duration-200 group-hover:text-[#005bab]">
                    <ArrowRight className="h-5 w-5" />
                  </span>

                  <div className="pr-14">
                    <h3 className="notion-cta-card-title text-black transition-colors duration-300">
                      {item.title}
                    </h3>
                    {item.description ? (
                      <p className="notion-cta-card-body mt-3 text-[#615d59] transition-colors duration-300">
                        {item.description}
                      </p>
                    ) : null}
                  </div>
                </InternalLink>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="signup" className="py-16 transition-colors duration-300 sm:py-20">
      <div className="section-shell">
        <div className="max-w-4xl">
          <HomeSectionTitle title={signup.title} description={signup.description} />
          <div className="mt-8 pl-4">
            <Button asChild size="lg" className="!rounded-md !px-8 !text-base !text-white sm:!px-9">
              <InternalLink href={signup.action.href} className="inline-flex items-center gap-3">
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
