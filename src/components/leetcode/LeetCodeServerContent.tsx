'use client';

import ProblemCard from '@/components/leetcode/ProblemCard';
import { LeetCodePageData } from '@/service/leetcode';
import { LeetCodeSearchParams } from '@/types/leetcode';
import { motion } from 'framer-motion';
import LeetCodePagination from './LeetCodePagination';
import RealTimeFilter from './RealTimeFilter';

interface Props {
  data: LeetCodePageData;
  searchParams: LeetCodeSearchParams;
}

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

export default function LeetCodeServerContent({ data, searchParams }: Props) {
  const { problems, tags, total, page, start, end, hasNext, hasPrev } = data;

  return (
    <>
      {/* 필터 */}
      <div className="mb-6">
        <RealTimeFilter searchParams={searchParams} availableTags={tags} />
      </div>

      {problems.length === 0 ? (
        // 검색 결과 없음 메시지
        <div className="py-12 text-center">
          <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
            검색 결과가 없습니다
          </h3>
          <p className="mb-4 text-gray-600 dark:text-gray-400">
            다른 검색어나 필터를 사용해보세요.
          </p>
        </div>
      ) : (
        <>
          {/* 결과 요약 */}
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                총{' '}
                <span className="font-semibold text-primary-600 dark:text-primaryDark">
                  {total}
                </span>
                개의 문제
                {page > 1 && (
                  <>
                    {' '}
                    (페이지 {page} /{' '}
                    {Math.ceil(total / Number(searchParams.per_page || 6))})
                  </>
                )}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {start}-{end} 표시 중
              </p>
            </div>
          </div>

          {/* 문제 그리드 */}
          <motion.div
            variants={containerVariants}
            initial="initial"
            animate="animate"
            className="mb-8 grid grid-cols-1 items-stretch justify-items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {problems.map(problem => (
              <motion.div key={problem.id || problem.slug} variants={itemVariants}>
                <ProblemCard problem={problem} />
              </motion.div>
            ))}
          </motion.div>

          {/* 페이지네이션 */}
          {Math.ceil(total / Number(searchParams.per_page || 6)) > 1 && (
            <LeetCodePagination
              currentPage={page}
              totalPages={Math.ceil(total / Number(searchParams.per_page || 6))}
              hasNext={hasNext}
              hasPrev={hasPrev}
            />
          )}
        </>
      )}
    </>
  );
}
