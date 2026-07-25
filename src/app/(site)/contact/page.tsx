import type { Metadata } from 'next';
import { Mail, MapPin, MessageCircle } from 'lucide-react';
import { PageHero, ScrollReveal, SectionHeading } from '@/components/ui';

export const metadata: Metadata = {
  title: '联系方式',
  description: '全国大学生智能应用开发大赛地址、邮箱与官方通知群信息。',
  alternates: {
    canonical: '/contact/',
    languages: {
      'zh-CN': '/contact/',
    },
  },
};

const contactCards = [
  {
    title: '官网',
    value: 'aiadc.org.cn',
    description: '大赛官网地址，下载中心、通知公告与赛事服务信息以官网发布为准。',
    icon: MapPin,
  },
  {
    title: '邮箱',
    value: 'aiadc@aiadc.org.cn',
    description: '用于院校组织、赛事合作、媒体沟通及材料相关事项咨询。',
    icon: Mail,
  },
  {
    title: '通知群',
    value: 'QQ群：871465293（1群）',
    description: '报名参赛的选手务必添加官方通知群，以免错过赛事重要通知信息。',
    icon: MessageCircle,
  },
];

export default function ContactPage() {
  return (
    <main className="bg-background text-slate-950">
      <PageHero
        eyebrow="联系方式"
        title="组委会咨询与赛事服务"
        description="通过地址、邮箱与官方通知群获取赛事服务信息。"
        backgroundImage="/assets/hero/aiadc-hero-registration.png"
        dark
        fullBleedBackground
      />

      <ScrollReveal as="section" className="bg-white py-12 sm:py-16" delay={40}>
        <div className="section-shell">
          <SectionHeading
            eyebrow="联系我们"
            title="地址、邮箱与官方通知群"
            description="赛事咨询、院校组织、媒体合作与后续通知统一通过以下渠道对接。"
            centered
            className="mx-auto max-w-4xl"
          />
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {contactCards.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="notion-card flex h-full flex-col p-6">
                  <div className="notion-sticker grid h-12 w-12 place-items-center">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h2 className="heading-3 notion-card-title mt-5">{item.title}</h2>
                  <p className="mt-3 text-xl font-bold leading-8 text-[#0075de]">{item.value}</p>
                  <p className="mt-3 text-sm leading-8 text-[#615d59]">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </ScrollReveal>
    </main>
  );
}
