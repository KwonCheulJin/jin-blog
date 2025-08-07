'use client';

import { calculateReadingTime } from '@/lib/leetcodeUtils';
import { motion } from 'framer-motion';
import { Clock, ExternalLink, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { ProblemHeaderProps } from '@/types/leetcode';
import DifficultyBadge from './DifficultyBadge';
import TagList from './TagList';

const headerVariants = {
  initial: { opacity: 0, y: -20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

const metaVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { delay: 0.2, duration: 0.5 },
  },
};

export default function ProblemHeader({ problem }: ProblemHeaderProps) {
  const readingTime = calculateReadingTime(problem);

  return (
    <motion.header
      variants={headerVariants}
      initial="initial"
      animate="animate"
      className="mb-8 pb-6 border-b border-gray-200 dark:border-gray-700"
    >
      {/* 메타 정보 */}
      <motion.div
        variants={metaVariants}
        className="flex items-center gap-3 mb-4"
      >
        <span className="text-sm font-mono text-primary-600 dark:text-primaryDark font-medium">
          LeetCode #{problem.problem_number}
        </span>
        <DifficultyBadge difficulty={problem.difficulty} />
        {problem.is_premium && (
          <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 rounded-full border border-yellow-200 dark:border-yellow-800">
            Premium
          </span>
        )}
      </motion.div>

      {/* 제목 */}
      <div className="mb-6">
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2 leading-tight">
          {problem.title_korean}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 font-medium">
          {problem.title}
        </p>
      </div>

      {/* 태그 */}
      <div className="mb-6">
        <TagList tags={problem.tags} />
      </div>

      {/* 메타데이터 및 링크 */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" />
            <span>해설 읽기 {readingTime}분</span>
          </div>

          <span className="uppercase font-medium text-primary-600 dark:text-primaryDark">
            {problem.solution_language}
          </span>

          {problem.acceptance_rate && (
            <span>정답률 {problem.acceptance_rate}%</span>
          )}
        </div>

        {/* 외부 링크 */}
        <div className="flex items-center gap-2">
          {problem.leetcode_url && (
            <Button
              variant="outline"
              size="sm"
              asChild
              className="group text-xs transition-all duration-200 hover:scale-105 active:scale-95"
            >
              <a
                href={problem.leetcode_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5"
              >
                <ExternalLink className="h-3 w-3 transition-transform duration-200 group-hover:rotate-12" />
                LeetCode에서 풀기
              </a>
            </Button>
          )}

          {problem.github_url && (
            <Button
              variant="outline"
              size="sm"
              asChild
              className="group text-xs transition-all duration-200 hover:scale-105 active:scale-95"
            >
              <a
                href={problem.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5"
              >
                <Github className="h-3 w-3 transition-transform duration-200 group-hover:rotate-12" />
                GitHub
              </a>
            </Button>
          )}
        </div>
      </div>
    </motion.header>
  );
}