'use client';

import { Button } from '@/components/ui/button';
import { LeetCodeSearchParams } from '@/types/leetcode';
import { Search, X } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { memo, useCallback, useState, useTransition } from 'react';

interface Props {
  searchParams: LeetCodeSearchParams;
  availableTags: string[];
}

const LeetCodeFilter = memo(function LeetCodeFilter({ searchParams, availableTags }: Props) {
  const router = useRouter();
  const urlSearchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [localFilters, setLocalFilters] = useState({
    search: searchParams.search || '',
    difficulty: searchParams.difficulty || '',
    tags: searchParams.tags || '',
    language: searchParams.language || '',
  });

  const applyFilters = useCallback(() => {
    startTransition(() => {
      const params = new URLSearchParams(urlSearchParams.toString());

      // 필터 적용
      Object.entries(localFilters).forEach(([key, value]) => {
        if (value) {
          params.set(key, value);
        } else {
          params.delete(key);
        }
      });

      // 페이지는 항상 1로 리셋
      params.set('page', '1');

      router.push(`/leetcode?${params.toString()}`);
    });
  }, [localFilters, router, startTransition, urlSearchParams]);

  const clearFilters = useCallback(() => {
    setLocalFilters({
      search: '',
      difficulty: '',
      tags: '',
      language: '',
    });

    startTransition(() => {
      router.push('/leetcode');
    });
  }, [router, startTransition]);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalFilters(prev => ({ ...prev, search: e.target.value }));
  }, []);

  const handleDifficultyChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setLocalFilters(prev => ({ ...prev, difficulty: e.target.value }));
  }, []);

  const handleTagsChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setLocalFilters(prev => ({ ...prev, tags: e.target.value }));
  }, []);

  const handleLanguageChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setLocalFilters(prev => ({ ...prev, language: e.target.value }));
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      applyFilters();
    }
  }, [applyFilters]);

  const hasActiveFilters = Object.values(localFilters).some(value => value);

  return (
    <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          필터
        </h3>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            disabled={isPending}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X className="h-4 w-4 mr-1" />
            초기화
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* 검색 */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
          <input
            type="text"
            placeholder="문제 제목 검색..."
            value={localFilters.search}
            onChange={handleSearchChange}
            className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2 pl-10 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:focus:border-blue-400"
            onKeyDown={handleKeyDown}
          />
        </div>

        {/* 난이도 */}
        <select
          value={localFilters.difficulty}
          onChange={handleDifficultyChange}
          className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:focus:border-blue-400"
        >
          <option value="">난이도 선택</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>

        {/* 태그 */}
        <select
          value={localFilters.tags}
          onChange={handleTagsChange}
          className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:focus:border-blue-400"
        >
          <option value="">태그 선택</option>
          {availableTags.slice(0, 20).map(tag => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>

        {/* 언어 */}
        <select
          value={localFilters.language}
          onChange={handleLanguageChange}
          className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:focus:border-blue-400"
        >
          <option value="">언어 선택</option>
          <option value="TypeScript">TypeScript</option>
          <option value="JavaScript">JavaScript</option>
          <option value="Python">Python</option>
          <option value="Java">Java</option>
          <option value="C++">C++</option>
        </select>
      </div>

      <div className="flex justify-end">
        <Button
          onClick={applyFilters}
          disabled={isPending}
          className="min-w-[80px]"
        >
          {isPending ? '적용 중...' : '적용'}
        </Button>
      </div>
    </div>
  );
});

export default LeetCodeFilter;