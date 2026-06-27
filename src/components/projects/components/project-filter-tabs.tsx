'use client';

import type { CmsRecordBase } from '@/lib/content/types';

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
          className={`rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 ${
            index === activeIndex
              ? 'bg-[#0075de] text-white'
              : 'bg-white text-[#615d59] ring-1 ring-[#e6e6e6] hover:bg-[#f6f5f4]'
          }`}
        >
          {filter.title}
        </button>
      ))}
    </div>
  );
}
