'use client';

import type { ComplexityBadgeProps } from '@/types/leetcode';

export default function ComplexityBadge({
  timeComplexity,
  spaceComplexity,
}: ComplexityBadgeProps) {
  if (!timeComplexity && !spaceComplexity) {
    return null;
  }

  return (
    <div className="flex flex-col gap-4 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800/50 sm:flex-row">
      {timeComplexity && (
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
            시간 복잡도:
          </span>
          <code className="rounded border bg-purple-100 px-2 py-1 font-mono text-sm text-purple-800 dark:bg-purple-900/30 dark:text-purple-400 transition-all duration-200 hover:scale-105 hover:shadow-sm hover:shadow-purple-500/25">
            {timeComplexity}
          </code>
        </div>
      )}

      {spaceComplexity && (
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
            공간 복잡도:
          </span>
          <code className="rounded border bg-orange-100 px-2 py-1 font-mono text-sm text-orange-800 dark:bg-orange-900/30 dark:text-orange-400 transition-all duration-200 hover:scale-105 hover:shadow-sm hover:shadow-orange-500/25">
            {spaceComplexity}
          </code>
        </div>
      )}
    </div>
  );
}
