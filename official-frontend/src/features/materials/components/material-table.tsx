import { Download } from 'lucide-react';
import { Button, Card, InternalLink, ScrollReveal } from '@/shared/ui';
import type { DownloadItem } from '@/shared/content';

interface MaterialTableProps {
  items: DownloadItem[];
}

export function MaterialTable({ items }: MaterialTableProps) {
  return (
    <Card className="overflow-hidden rounded-lg border-slate-200 bg-white">
      <div className="hidden md:block">
        <table className="w-full table-fixed">
          <colgroup>
            <col className="w-[38%]" />
            <col className="w-[44%]" />
            <col className="w-[18%]" />
          </colgroup>
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
                <td className="px-8 py-5 align-middle">
                  <div className="text-lg font-bold leading-7 text-slate-950">{item.title}</div>
                </td>
                <td className="px-6 py-5 align-middle text-sm font-medium leading-7 text-slate-600">
                  {item.description}
                </td>
                <td className="px-8 py-5 align-middle text-right">
                  <Button
                    asChild
                    variant="outline"
                    className="h-10 rounded-md border-blue-200 px-4 text-sm font-bold text-blue-700 hover:bg-blue-50"
                  >
                    <InternalLink href={item.fileUrl} className="inline-flex items-center gap-2">
                      <Download className="h-4 w-4" />
                      下载
                    </InternalLink>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ScrollReveal className="md:hidden" staggerChildren>
        {items.map((item, index) => (
          <div key={item.id} className={`px-5 py-5 ${index < items.length - 1 ? 'border-b border-slate-200' : ''}`}>
            <div className="min-w-0 flex-1">
              <h3 className="text-lg font-bold leading-7 text-slate-950">{item.title}</h3>
              <p className="mt-2 text-sm font-medium leading-7 text-slate-600">{item.description}</p>
              <Button
                asChild
                variant="outline"
                className="mt-4 h-10 rounded-md border-blue-200 px-4 text-sm font-bold text-blue-700 hover:bg-blue-50"
              >
                <InternalLink href={item.fileUrl} className="inline-flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  下载
                </InternalLink>
              </Button>
            </div>
          </div>
        ))}
      </ScrollReveal>
    </Card>
  );
}
