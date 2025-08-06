'use client';

import { getDifficultyColorClass, getDifficultyLabel } from '@/lib/leetcodeUtils';
import { cn } from '@/lib/utils';
import type { DifficultyBadgeProps } from '@/types/leetcode';

export default function DifficultyBadge({
  difficulty,
  className,
}: DifficultyBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-all duration-200 hover:scale-105',
        getDifficultyColorClass(difficulty),
        difficulty === 'Easy' && 'hover:shadow-md hover:shadow-green-500/25',
        difficulty === 'Medium' && 'hover:shadow-md hover:shadow-yellow-500/25',
        difficulty === 'Hard' && 'hover:shadow-md hover:shadow-red-500/25',
        className,
      )}
    >
      {getDifficultyLabel(difficulty)}
    </span>
  );
}
