'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { type ReactNode, useState } from 'react';
import { Button, InternalLink } from '@/components/ui';
import type { DownloadItem } from '@/lib/content/types';

interface MaterialTableProps {
  items: DownloadItem[];
}

const PAGE_SIZE = 5;

function formatOrder(index: number) {
  return String(index + 1).padStart(2, '0');
}

function getFormatTone(item: DownloadItem) {
  const isPending = item.format.includes('待') || item.actionLabel.includes('说明');

  if (isPending) {
    return 'bg-[#f6efe8] text-[#793400]';
  }

  return 'bg-[#f1efeb] text-[#615d59]';
}

function getAudienceTone(audience: string) {
  if (audience.includes('组织')) {
    return 'bg-[#eef7f1] text-[#4f6e5c]';
  }

  if (audience.includes('参赛')) {
    return 'bg-[#e9f3ff] text-[#53626e]';
  }

  return 'bg-[#f1efeb] text-[#615d59]';
}

function buildVisiblePages(currentPage: number, pageCount: number) {
  if (pageCount <= 5) {
    return Array.from({ length: pageCount }, (_, index) => index + 1);
  }

  if (currentPage <= 3) {
    return [1, 2, 3, 4, 5];
  }

  if (currentPage >= pageCount - 2) {
    return [pageCount - 4, pageCount - 3, pageCount - 2, pageCount - 1, pageCount];
  }

  return [currentPage - 2, currentPage - 1, currentPage, currentPage + 1, currentPage + 2];
}

function MaterialMeta({ item }: { item: DownloadItem }) {
  return (
    <div className="flex flex-wrap gap-2">
      <span
        className={[
          'inline-flex rounded-full px-3 py-1.5 text-[12px] font-medium leading-4 tracking-[0.04em]',
          getFormatTone(item),
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {item.format}
      </span>
      <span
        className={[
          'inline-flex rounded-full px-3 py-1.5 text-[12px] font-medium leading-4',
          getAudienceTone(item.audience),
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {item.audience}
      </span>
    </div>
  );
}

function ActionButton({ item, block = false }: { item: DownloadItem; block?: boolean }) {
  return (
    <Button asChild variant="outline" className={block ? 'min-h-11 w-full sm:w-auto' : 'min-h-11'}>
      <InternalLink href={item.fileUrl}>{item.actionLabel || '下载'}</InternalLink>
    </Button>
  );
}

function PagerButton({
  label,
  disabled = false,
  active = false,
  onClick,
}: {
  label: ReactNode;
  disabled?: boolean;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <Button
      type="button"
      disabled={disabled}
      onClick={onClick}
      variant={active ? 'default' : 'outline'}
      size="icon"
      className="h-11 w-11 text-base"
      aria-current={active ? 'page' : undefined}
    >
      {label}
    </Button>
  );
}

export function MaterialTable({ items }: MaterialTableProps) {
  const [page, setPage] = useState(1);
  const pageCount = Math.max(1, Math.ceil(items.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = Math.min(startIndex + PAGE_SIZE, items.length);
  const visibleItems = items.slice(startIndex, endIndex);
  const visiblePages = buildVisiblePages(currentPage, pageCount);

  return (
    <div className="overflow-hidden rounded-[16px] border border-[#e6e6e6] bg-white">
      <div className="hidden md:block">
        <table className="w-full border-collapse">
          <colgroup>
            <col className="w-[7rem]" />
            <col className="w-[31%]" />
            <col className="w-[17%]" />
            <col />
            <col className="w-[9.75rem]" />
          </colgroup>
          <thead>
            <tr className="border-b border-[#e6e6e6] bg-[#f6f5f4] text-left text-[12px] font-semibold tracking-[0.125em] text-[#615d59]">
              <th className="px-8 py-5">序号</th>
              <th className="px-8 py-5">文件名称</th>
              <th className="px-8 py-5">类型 / 对象</th>
              <th className="px-8 py-5">内容说明</th>
              <th className="px-8 py-5">操作</th>
            </tr>
          </thead>
          <tbody>
            {visibleItems.map((item, index) => {
              const absoluteIndex = startIndex + index;

              return (
                <tr
                  key={item.id}
                  className={[
                    'border-b border-[#e6e6e6] last:border-b-0',
                    absoluteIndex % 2 === 0 ? 'bg-white' : 'bg-[#f6f5f4]',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                >
                  <td className="px-8 py-7 align-middle">
                    <span className="inline-flex text-[17px] font-semibold tracking-[-0.02em] text-[#111111]">
                      {formatOrder(absoluteIndex)}
                    </span>
                  </td>
                  <td className="px-8 py-7 align-middle">
                    <div className="max-w-[28rem] text-[16px] font-medium leading-7 tracking-[0] text-[#000000]">
                      {item.title}
                    </div>
                  </td>
                  <td className="px-8 py-7 align-middle">
                    <MaterialMeta item={item} />
                  </td>
                  <td className="px-8 py-7 align-middle">
                    <p className="max-w-[37rem] text-[15px] leading-8 text-[#615d59]">{item.description}</p>
                  </td>
                  <td className="px-8 py-7 align-middle">
                    <ActionButton item={item} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="md:hidden">
        {visibleItems.map((item, index) => {
          const absoluteIndex = startIndex + index;

          return (
            <article
              key={item.id}
              className={[
                'border-b border-[#e6e6e6] px-5 py-5 last:border-b-0',
                absoluteIndex % 2 === 0 ? 'bg-white' : 'bg-[#f6f5f4]',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              <div className="flex items-start gap-4">
                <span className="inline-flex min-w-[2.75rem] shrink-0 text-[16px] font-semibold tracking-[-0.02em] text-[#111111]">
                  {formatOrder(absoluteIndex)}
                </span>

                <div className="min-w-0 flex-1">
                  <h3 className="text-[16px] font-medium leading-7 tracking-[0] text-[#000000]">
                    {item.title}
                  </h3>

                  <div className="mt-3">
                    <MaterialMeta item={item} />
                  </div>

                  <div className="mt-4">
                    <p className="text-[12px] font-semibold tracking-[0.125em] text-[#a39e98]">内容说明</p>
                    <p className="mt-2 text-[15px] leading-7 text-[#615d59]">{item.description}</p>
                  </div>

                  <div className="mt-5">
                    <ActionButton item={item} block />
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <div className="flex flex-col gap-4 border-t border-[#e6e6e6] bg-[#f6f5f4] px-6 py-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[15px] leading-6 text-[#615d59]">
          {items.length === 0 ? '0 / 0' : `${startIndex + 1}-${endIndex} / ${items.length}`}
        </p>

        <nav aria-label="分页" className="flex items-center gap-3 self-end sm:self-auto">
          <PagerButton
            label={<ChevronLeft className="h-4 w-4" />}
            disabled={currentPage === 1}
            onClick={() => setPage((value) => Math.max(1, value - 1))}
          />

          {visiblePages.map((pageNumber) => (
            <PagerButton
              key={pageNumber}
              label={pageNumber}
              active={pageNumber === currentPage}
              onClick={() => setPage(pageNumber)}
            />
          ))}

          <PagerButton
            label={<ChevronRight className="h-4 w-4" />}
            disabled={currentPage === pageCount}
            onClick={() => setPage((value) => Math.min(pageCount, value + 1))}
          />
        </nav>
      </div>
    </div>
  );
}
