'use client';

import { Button } from '@/components/ui/button';
import { useRouter, useSearchParams } from 'next/navigation';

interface Props {
  currentPage: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export default function LeetCodePagination({
  currentPage,
  totalPages,
  hasNext,
  hasPrev,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const navigateToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    router.push(`/leetcode?${params.toString()}`);
  };

  return (
    <div className="flex justify-center">
      <nav className="flex items-center justify-center gap-4 py-5">
        <Button
          variant="ghost"
          disabled={!hasPrev}
          onClick={() => navigateToPage(currentPage - 1)}
        >
          이전 페이지
        </Button>
        <span className="text-sm text-gray-600 dark:text-gray-400">
          {currentPage} / {totalPages}
        </span>
        <Button
          variant="ghost"
          disabled={!hasNext}
          onClick={() => navigateToPage(currentPage + 1)}
        >
          다음 페이지
        </Button>
      </nav>
    </div>
  );
}