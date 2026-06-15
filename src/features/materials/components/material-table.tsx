import { Download } from 'lucide-react';
import { Button, Card, InternalLink, ScrollReveal } from '@/shared/ui';
import type { DownloadItem } from '@/shared/content';

interface MaterialTableProps {
  items: DownloadItem[];
}

export function MaterialTable({ items }: MaterialTableProps) {
  return (
    <Card className="overflow-hidden rounded-2xl border-slate-200 bg-white">
      {/* 桌面端表格视图 */}
      <div className="hidden md:block">
        <table className="w-full table-fixed">
          <thead className="bg-slate-50">
            <tr className="text-left text-sm font-bold text-slate-500">
              <th className="px-8 py-4">文件名称</th>
              <th className="px-6 py-4">内容说明</th>
              <th className="px-8 py-4 text-right">操作</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={item.id} className={index < items.length - 1 ? 'border-b border-slate-200' : ''}>
                <td className="px-8 py-6 align-top">
                  <div className="heading-3 text-slate-950">{item.title}</div>
                </td>
                <td className="px-6 py-6 align-top text-sm leading-7 text-slate-600 sm:text-base">{item.description}</td>
                <td className="px-8 py-6 align-top text-right">
                  <Button asChild variant="outline" className="rounded-md border-blue-200 text-blue-700 hover:bg-blue-50">
                    <InternalLink href={item.fileUrl} className="inline-flex items-center gap-2">
                      <Download className="h-4 w-4" />
                      {item.actionLabel}
                    </InternalLink>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 移动端卡片视图 */}
      <ScrollReveal className="md:hidden" staggerChildren>
        {items.map((item, index) => (
          <div key={item.id} className={`px-6 py-6 ${index < items.length - 1 ? 'border-b border-slate-200' : ''}`}>
            <div className="min-w-0 flex-1">
              <h3 className="heading-3 text-slate-950">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
              <Button asChild variant="outline" className="mt-5 rounded-md border-blue-200 text-blue-700 hover:bg-blue-50">
                <InternalLink href={item.fileUrl} className="inline-flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  {item.actionLabel}
                </InternalLink>
              </Button>
            </div>
          </div>
        ))}
      </ScrollReveal>
    </Card>
  );
}
