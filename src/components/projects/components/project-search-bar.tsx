import { Search } from 'lucide-react';

interface ProjectSearchBarProps {
  placeholder?: string;
}

export function ProjectSearchBar({ placeholder = '搜索项目名称、应用方向或场景关键词' }: ProjectSearchBarProps) {
  return (
    <div className="mx-auto flex max-w-3xl items-center gap-3 rounded-full border border-[#e6e6e6] bg-white px-5 py-4 text-[#615d59]">
      <Search className="h-4 w-4 shrink-0 text-[#0075de]" />
      <span className="text-sm sm:text-base">{placeholder}</span>
    </div>
  );
}
