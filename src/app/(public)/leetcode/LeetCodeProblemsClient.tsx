'use client';

import ProblemCard from '@/components/leetcode/ProblemCard';
import ProblemFilter from '@/components/leetcode/ProblemFilter';
import { Button } from '@/components/ui/button';
import { getAvailableTags, getLeetCodeProblems } from '@/lib/leetcode';
import { cn } from '@/lib/utils';
import type {
  LeetCodeFilters,
  LeetCodeListResponse,
  LeetCodeProblemRecord,
} from '@/types/leetcode';
import { motion } from 'framer-motion';
import { AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';

const containerVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export default function LeetCodeProblemsClient() {
  const [problems, setProblems] = useState<LeetCodeProblemRecord[]>([]);
  const [availableTags, setAvailableTags] = useState<string[]>([]);
  const [filters, setFilters] = useState<LeetCodeFilters>({
    limit: 12,
    offset: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const loadProblems = async (newFilters: LeetCodeFilters) => {
    setIsLoading(true);
    setError(null);

    try {
      const response: LeetCodeListResponse =
        await getLeetCodeProblems(newFilters);
      setProblems(response.problems);
      setTotalCount(response.total);
      setCurrentPage(response.page);
    } catch (err) {
      console.error('문제 로딩 오류:', err);
      setError('문제를 불러오는데 실패했습니다. 잠시 후 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  const loadTags = async () => {
    try {
      const tags = await getAvailableTags();
      setAvailableTags(tags);
    } catch (err) {
      console.error('태그 로딩 오류:', err);
    }
  };

  useEffect(() => {
    loadTags();
  }, []);

  useEffect(() => {
    loadProblems(filters);
  }, [filters]);

  const handleFilterChange = (newFilters: LeetCodeFilters) => {
    setFilters({
      ...newFilters,
      limit: 12,
      offset: 0, // 필터 변경시 첫 페이지로
    });
  };

  const handlePageChange = (page: number) => {
    const newOffset = (page - 1) * (filters.limit || 12);
    setFilters({
      ...filters,
      offset: newOffset,
    });
  };

  const totalPages = Math.ceil(totalCount / (filters.limit || 12));

  if (error) {
    return (
      <div className="py-12 text-center">
        <AlertCircle className="mx-auto mb-4 h-12 w-12 text-red-500" />
        <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
          오류 발생
        </h3>
        <p className="mb-4 text-gray-600 dark:text-gray-400">{error}</p>
        <Button
          onClick={() => loadProblems(filters)}
          variant="outline"
          className="transition-all duration-200 hover:scale-105 active:scale-95"
        >
          다시 시도
        </Button>
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
    >
      {/* 필터 */}
      <motion.div variants={itemVariants}>
        <ProblemFilter
          filters={filters}
          onFilterChange={handleFilterChange}
          availableTags={availableTags}
        />
      </motion.div>

      {/* 결과 요약 */}
      <motion.div variants={itemVariants} className="mb-6">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {isLoading ? (
              '문제를 불러오는 중...'
            ) : (
              <>
                총{' '}
                <span className="font-semibold text-primary-600 dark:text-primaryDark">
                  {totalCount}
                </span>
                개의 문제
                {currentPage > 1 && (
                  <>
                    {' '}
                    (페이지 {currentPage} / {totalPages})
                  </>
                )}
              </>
            )}
          </p>
        </div>
      </motion.div>

      {/* 문제 그리드 */}
      {isLoading ? (
        <motion.div
          variants={containerVariants}
          initial="initial"
          animate="animate"
          className="grid grid-cols-1 gap-6"
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800"
            >
              <div className="animate-pulse">
                <div className="mb-4 flex items-center justify-between">
                  <div className="h-4 w-16 rounded bg-gray-300 dark:bg-gray-600"></div>
                  <div className="h-6 w-16 rounded-full bg-gray-300 dark:bg-gray-600"></div>
                </div>
                <div className="mb-2 h-6 w-3/4 rounded bg-gray-300 dark:bg-gray-600"></div>
                <div className="mb-4 h-4 w-1/2 rounded bg-gray-300 dark:bg-gray-600"></div>
                <div className="mb-4 space-y-2">
                  <div className="h-3 rounded bg-gray-300 dark:bg-gray-600"></div>
                  <div className="h-3 w-5/6 rounded bg-gray-300 dark:bg-gray-600"></div>
                </div>
                <div className="mb-4 flex gap-2">
                  <div className="h-6 w-16 rounded bg-gray-300 dark:bg-gray-600"></div>
                  <div className="h-6 w-20 rounded bg-gray-300 dark:bg-gray-600"></div>
                </div>
                <div className="flex items-center justify-between border-t border-gray-100 pt-4 dark:border-gray-700">
                  <div className="h-3 w-20 rounded bg-gray-300 dark:bg-gray-600"></div>
                  <div className="h-3 w-16 rounded bg-gray-300 dark:bg-gray-600"></div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      ) : problems.length === 0 ? (
        <motion.div variants={itemVariants} className="py-12 text-center">
          <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
            검색 결과가 없습니다
          </h3>
          <p className="mb-4 text-gray-600 dark:text-gray-400">
            다른 검색어나 필터를 사용해보세요.
          </p>
          <Button
            onClick={() => handleFilterChange({})}
            variant="outline"
            className="transition-all duration-200 hover:scale-105 active:scale-95"
          >
            모든 문제 보기
          </Button>
        </motion.div>
      ) : (
        <motion.div
          variants={containerVariants}
          className="mb-8 grid grid-cols-1 gap-6"
        >
          {problems.map(problem => (
            <motion.div
              key={problem.id || problem.slug}
              variants={itemVariants}
            >
              <ProblemCard problem={problem} />
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* 페이지네이션 */}
      {!isLoading && totalPages > 1 && (
        <motion.div
          variants={itemVariants}
          className="flex items-center justify-center gap-2"
        >
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage <= 1}
            className="group transition-all duration-200 hover:scale-105 active:scale-95 disabled:hover:scale-100"
          >
            <ChevronLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
            이전
          </Button>

          <div className="flex items-center gap-1">
            {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
              const page = currentPage <= 3 ? i + 1 : currentPage - 2 + i;
              if (page > totalPages) {
                return null;
              }

              return (
                <Button
                  key={page}
                  variant={page === currentPage ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handlePageChange(page)}
                  className={cn(
                    "h-10 w-10 p-0 transition-all duration-200 hover:scale-105 active:scale-95",
                    page === currentPage && "shadow-md shadow-blue-500/25",
                  )}
                >
                  {page}
                </Button>
              );
            })}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
            className="group transition-all duration-200 hover:scale-105 active:scale-95 disabled:hover:scale-100"
          >
            다음
            <ChevronRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
}
