'use client';

import { cn } from '@/lib/utils';
import type { TagListProps } from '@/types/leetcode';

export default function TagList({ tags, className }: TagListProps) {
  if (!tags || tags.length === 0) {
    return null;
  }

  return (
    <div className={cn('flex flex-wrap gap-1.5', className)}>
      {tags.map((tag, index) => (
        <span
          key={`${tag}-${index}`}
          className="inline-flex cursor-default items-center rounded-md border border-blue-200 bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800 transition-all duration-200 hover:scale-105 hover:shadow-sm hover:shadow-blue-500/25 dark:border-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}
