import Link from 'next/link';
import { ChartNoAxesColumnIncreasing, ClipboardList } from 'lucide-react';
import type { ComponentType, SVGProps } from 'react';

type DocumentationLink = {
  title: string;
  description: string;
  href: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  eyebrow: string;
};

const documents: DocumentationLink[] = [
  {
    eyebrow: '文件一',
    title: '参赛说明',
    description: '查看参赛组别、三类赛道、报名与组队要求、项目方向、2026 赛程和评审方式。',
    href: '/docs/participation',
    icon: ClipboardList,
  },
  {
    eyebrow: '文件二',
    title: '评分标准',
    description: '查阅萌芽、创意、OPC 轻创三赛道的完整百分制评分指标和扣分规则。',
    href: '/docs/review',
    icon: ChartNoAxesColumnIncreasing,
  },
];

function DocumentationCard({ item }: { item: DocumentationLink }) {
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      className="group flex min-h-52 flex-col rounded-xl border border-fd-border bg-fd-card p-5 text-fd-card-foreground transition-colors hover:border-fd-primary/35 hover:bg-fd-accent/55 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fd-ring"
      data-doc-card
    >
      <span className="flex items-center justify-between gap-4">
        <span className="text-xs font-medium uppercase tracking-[0.16em] text-fd-muted-foreground">
          {item.eyebrow}
        </span>
        <span className="grid size-9 place-items-center rounded-lg bg-fd-primary text-fd-primary-foreground">
          <Icon aria-hidden="true" className="size-5" strokeWidth={2} />
        </span>
      </span>
      <span className="mt-8 text-xl font-medium tracking-tight">{item.title}</span>
      <span className="mt-3 text-sm leading-6 text-fd-muted-foreground">{item.description}</span>
    </Link>
  );
}

export function DocumentationColumns() {
  return (
    <section className="not-prose my-8" aria-labelledby="core-documentation-title" data-documentation-columns>
      <div className="mb-4">
        <h2 id="core-documentation-title" className="text-xl font-semibold tracking-tight text-fd-foreground">
          两份核心参赛文件
        </h2>
        <p className="mt-1 text-sm leading-6 text-fd-muted-foreground">
          先了解参赛资格与赛程，再核对评分规则。
        </p>
      </div>

      <div className="grid gap-3 lg:grid-cols-2">
        {documents.map((item) => (
          <DocumentationCard key={item.href} item={item} />
        ))}
      </div>
    </section>
  );
}
