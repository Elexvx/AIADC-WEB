'use client';

import { ArrowRight } from 'lucide-react';
import { usePageContent } from '@/shared/i18n/locale-provider';
import { Button, InternalLink, SectionHeading } from '@/shared/ui';

export function HomeSignupSection() {
  const page = usePageContent('home');
  const signup = page.ctaBanner;

  if (!signup?.action) {
    return null;
  }

  return (
    <section id="signup" className="bg-slate-50 py-10 sm:py-12">
      <div className="section-shell">
        <div className="mx-auto max-w-4xl text-center">
          <SectionHeading
            centered
            eyebrow={signup.kicker}
            title={signup.title}
            description={signup.description}
          />
          <div className="mt-8">
            <Button asChild size="lg" className="!rounded-md !bg-blue-600 !px-8 !text-base !text-white hover:!bg-blue-500 sm:!px-9">
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
