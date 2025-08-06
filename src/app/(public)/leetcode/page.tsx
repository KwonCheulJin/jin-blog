import { Metadata } from 'next';
import { Suspense } from 'react';
import { getAllLeetCodeProblemsData } from '@/service/leetcode';
import { LeetCodeSearchParams } from '@/types/leetcode';
import LeetCodeServerContent from '@/components/leetcode/LeetCodeServerContent';

export const metadata: Metadata = {
  title: 'LeetCode 문제 해설 | Jin\'s Dev Blog',
  description: '체계적인 LeetCode 문제 해설과 솔루션을 한국어로 제공합니다. 알고리즘과 자료구조 학습에 도움이 되는 상세한 설명과 함께합니다.',
  keywords: ['LeetCode', '알고리즘', '코딩테스트', '자료구조', '프로그래밍', '문제해결', 'TypeScript', 'JavaScript', 'Python'],
  openGraph: {
    title: 'LeetCode 문제 해설',
    description: '체계적인 LeetCode 문제 해설과 솔루션을 한국어로 제공합니다.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LeetCode 문제 해설',
    description: '체계적인 LeetCode 문제 해설과 솔루션을 한국어로 제공합니다.',
  },
};

function LoadingGrid() {
  return (
    <div className="grid grid-cols-1 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="animate-pulse">
            <div className="flex items-center justify-between mb-4">
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-16"></div>
              <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded-full w-16"></div>
            </div>
            <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2 mb-4"></div>
            <div className="space-y-2 mb-4">
              <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded"></div>
              <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-5/6"></div>
            </div>
            <div className="flex gap-2 mb-4">
              <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-16"></div>
              <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-20"></div>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
              <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-20"></div>
              <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-16"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

interface Props {
  searchParams: Promise<LeetCodeSearchParams>;
}

export default async function LeetCodeProblemsPage({ searchParams }: Props) {
  const params = await searchParams;
  const data = await getAllLeetCodeProblemsData(params);

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* 헤더 */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          LeetCode 문제 해설
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          체계적인 접근법과 상세한 설명으로 알고리즘 문제 해결 능력을 키워보세요.
          각 문제마다 시간복잡도와 공간복잡도 분석을 포함한 완전한 해설을 제공합니다.
        </p>
      </div>

      {/* 문제 목록 */}
      <Suspense fallback={<LoadingGrid />}>
        <LeetCodeServerContent
          data={data}
          searchParams={params}
        />
      </Suspense>
    </div>
  );
}