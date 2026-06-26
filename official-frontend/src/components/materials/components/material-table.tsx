import { Download } from 'lucide-react';
import { Button, InternalLink, ScrollReveal } from '@/components/ui';
import type { DownloadItem } from '@/lib/content/types';

interface MaterialTableProps {
  items: DownloadItem[];
}

function MaterialMeta({ item }: { item: DownloadItem }) {
  return (
    <div className="flex flex-wrap gap-2">
      <span className="rounded-full bg-[#f6f5f4] px-2.5 py-1 text-xs font-semibold leading-5 text-[#31302e]">{item.format}</span>
      <span className="rounded-full bg-[#eef6ff] px-2.5 py-1 text-xs font-semibold leading-5 text-[#0075de]">{item.audience}</span>
    </div>
  );
}

function DownloadButton({ item }: { item: DownloadItem }) {
  return (
    <Button asChild variant="outline" className="h-9 rounded-md px-3 text-sm font-semibold">
      <InternalLink href={item.fileUrl} className="inline-flex items-center gap-2">
        <Download className="h-4 w-4" />
        下载
      </InternalLink>
    </Button>
  );
}

export function MaterialTable({ items }: MaterialTableProps) {
  return (
    <div className="overflow-hidden rounded-lg border border-[#e6e6e6] bg-white shadow-[rgba(0,0,0,0.02)_0_1px_2px,rgba(0,0,0,0.04)_0_8px_24px]">
      <div className="hidden md:block">
        <table className="w-full table-fixed border-collapse">
          <colgroup>
            <col className="w-[5.5rem]" />
            <col className="w-[30%]" />
            <col className="w-[16%]" />
            <col />
            <col className="w-[8.5rem]" />
          </colgroup>
          <thead>
            <tr className="border-b border-[#e6e6e6] bg-[#f6f5f4] text-left text-xs font-semibold uppercase tracking-[0.06em] text-[#615d59]">
              <th className="px-5 py-3">序号</th>
              <th className="px-5 py-3">文件名称</th>
              <th className="px-5 py-3">类型 / 对象</th>
              <th className="px-5 py-3">内容说明</th>
              <th className="px-5 py-3 text-left">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#ececec]">
            {items.map((item, index) => (
              <tr key={item.id} className="transition-colors duration-200 hover:bg-[#fafafa]">
                <td className="px-5 py-5 align-top">
                  <span className="inline-flex h-8 w-8 items-center justify-center text-sm font-bold text-[#0075de]">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </td>
                <td className="px-5 py-5 align-top">
                  <div className="text-base font-bold leading-7 tracking-[0] text-black">{item.title}</div>
                </td>
                <td className="px-5 py-5 align-top">
                  <MaterialMeta item={item} />
                </td>
                <td className="px-5 py-5 align-top text-sm leading-7 text-[#615d59]">
                  {item.description}
                </td>
                <td className="px-5 py-5 align-top text-left">
                  <DownloadButton item={item} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ScrollReveal className="md:hidden" staggerChildren>
        {items.map((item, index) => (
          <article key={item.id} className={`px-5 py-5 ${index < items.length - 1 ? 'border-b border-[#e6e6e6]' : ''}`}>
            <div className="flex items-start justify-between gap-4">
              <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center text-sm font-bold text-[#0075de]">
                {String(index + 1).padStart(2, '0')}
              </span>
              <MaterialMeta item={item} />
            </div>
            <h3 className="mt-4 text-lg font-bold leading-7 tracking-[0] text-black">{item.title}</h3>
            <p className="mt-2 text-sm leading-7 text-[#615d59]">{item.description}</p>
            <div className="mt-4">
              <DownloadButton item={item} />
            </div>
          </article>
        ))}
      </ScrollReveal>
    </div>
  );
}
