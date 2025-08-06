import { Button } from '@/components/ui/button';
import { ArrowLeft, Search } from 'lucide-react';
import Link from 'next/link';

export default function LeetCodeProblemNotFound() {
  return (
    <div className="container mx-auto max-w-2xl px-4 py-16 text-center">
      <div className="mb-8">
        <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-gray-100">
          문제를 찾을 수 없습니다
        </h1>
        <p className="mb-2 text-lg text-gray-600 dark:text-gray-400">
          요청하신 LeetCode 문제가 존재하지 않거나 삭제되었을 수 있습니다.
        </p>
        <p className="text-gray-500 dark:text-gray-400">
          URL을 다시 확인하거나 다른 문제를 찾아보세요.
        </p>
      </div>

      <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
        <Button asChild variant="default">
          <Link href="/leetcode" className="flex items-center gap-2">
            <Search className="h-4 w-4" />
            모든 문제 보기
          </Link>
        </Button>

        <Button asChild variant="outline">
          <Link href="/posts" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            블로그 메인으로
          </Link>
        </Button>
      </div>

      {/* 추천 액션 */}
      <div className="mt-12 rounded-lg bg-gray-50 p-6 dark:bg-gray-800">
        <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
          이런 것들을 찾아보시는 건 어떤가요?
        </h3>
        <div className="space-y-2 text-sm">
          <p className="text-gray-600 dark:text-gray-400">
            • 난이도별로 문제 분류해서 보기
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            • 알고리즘 태그로 관련 문제 찾기
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            • 최신 업데이트된 문제 해설 확인하기
          </p>
        </div>
      </div>
    </div>
  );
}
