import { Search } from 'lucide-react';

interface ProjectSearchBarProps {
  placeholder?: string;
}

export function ProjectSearchBar({ placeholder = '搜索项目名称、应用方向或场景关键词' }: ProjectSearchBarProps) {
  return (
    <div className="mx-auto flex max-w-3xl items-center gap-3 rounded-full border border-slate-200 bg-slate-50 px-5 py-4 text-slate-500 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]">
      <Search className="h-4 w-4 shrink-0 text-blue-600" />
      <span className="text-sm sm:text-base">{placeholder}</span>
    </div>
  );
}
