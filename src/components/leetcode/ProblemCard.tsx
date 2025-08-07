'use client';

import { cn } from '@/lib/utils';
import type { ProblemCardProps } from '@/types/leetcode';
import { motion, Variants } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { memo } from 'react';
import DifficultyBadge from './DifficultyBadge';
import TagList from './TagList';

const cardVariants: Variants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1], // ✅ Bezier curve array
    },
  },
  hover: {
    y: -4,
    transition: {
      duration: 0.2,
    },
  },
};

const ProblemCard = memo(function ProblemCard({ problem, className }: ProblemCardProps) {
  return (
    <motion.div
      variants={cardVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      className={cn('not-prose group h-full', className)}
    >
      <Link href={`/leetcode/${problem.slug}`}>
        <div className="flex h-full flex-col justify-between rounded-lg border border-gray-200 bg-white p-6 transition-all duration-300 hover:border-gray-300 hover:shadow-lg hover:shadow-gray-200/50 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-gray-600 dark:hover:shadow-gray-900/30">
          {/* 헤더 */}
          <div className="mb-3 flex items-start justify-between">
            <div className="min-w-0 flex-1">
              <div className="mb-1 flex items-center justify-between gap-2">
                <span className="font-mono text-sm text-gray-500 dark:text-gray-400">
                  #{problem.problem_number}
                </span>
                {problem.is_premium && (
                  <span className="rounded bg-yellow-100 px-1.5 py-0.5 text-xs text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">
                    Premium
                  </span>
                )}
                <DifficultyBadge difficulty={problem.difficulty} />
              </div>
              <h3 className="mb-1 line-clamp-2 text-lg font-semibold text-gray-900 transition-colors group-hover:text-primary-600 dark:text-gray-100 dark:group-hover:text-primaryDark">
                {problem.title_korean}
              </h3>
              <p className="mb-2 text-sm text-gray-600 dark:text-gray-400">
                {problem.title}
              </p>
            </div>
          </div>

          {/* 설명 미리보기 */}
          <p className="mb-4 line-clamp-2 text-sm text-gray-600 dark:text-gray-300">
            {problem.description_korean?.substring(0, 120)}...
          </p>
          <div>
            {/* 태그 */}
            <div className="mb-4">
              <TagList tags={problem.tags.slice(0, 3)} />
              {problem.tags.length > 3 && (
                <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
                  +{problem.tags.length - 3}개 더
                </span>
              )}
            </div>

            {/* 푸터 */}
            <div className="flex items-center justify-between border-t border-gray-100 pt-4 text-xs text-gray-500 dark:border-gray-700 dark:text-gray-400">
              <span className="font-medium uppercase text-primary-600 dark:text-primaryDark">
                {problem.solution_language}
              </span>

              <div className="flex items-center gap-2">
                {problem.acceptance_rate && (
                  <span>정답률 {problem.acceptance_rate}%</span>
                )}
                <ExternalLink className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
});

export default ProblemCard;
