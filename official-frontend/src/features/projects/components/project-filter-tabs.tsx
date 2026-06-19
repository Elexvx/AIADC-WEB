'use client';

import type { CmsRecordBase } from '@/shared/content';

interface ProjectFilterTabsProps {
  filters: CmsRecordBase[];
  activeIndex?: number;
  onChange?: (index: number) => void;
}

export function ProjectFilterTabs({ filters, activeIndex = 0, onChange }: ProjectFilterTabsProps) {
  return (
    <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
      {filters.map((filter, index) => (
        <button
          key={filter.id}
          type="button"
          onClick={() => onChange?.(index)}
          className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
            index === activeIndex
              ? 'bg-blue-600 text-white shadow-[0_10px_24px_rgba(37,99,235,0.22)]'
              : 'bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50'
          }`}
        >
          {filter.title}
        </button>
      ))}
    </div>
  );
}
