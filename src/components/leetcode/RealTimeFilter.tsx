'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { LeetCodeSearchParams } from '@/types/leetcode';
import { Filter, Search, X } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useTransition, useCallback, useEffect } from 'react';

interface Props {
  searchParams: LeetCodeSearchParams;
  availableTags: string[];
}

export default function RealTimeFilter({ searchParams, availableTags }: Props) {
  const router = useRouter();
  const urlSearchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [isExpanded, setIsExpanded] = useState(false);

  const [localFilters, setLocalFilters] = useState({
    search: searchParams.search || '',
    difficulty: searchParams.difficulty || '',
    tags: searchParams.tags || '',
    language: searchParams.language || '',
  });

  const applyFiltersWithNewData = useCallback((filters: typeof localFilters) => {
    startTransition(() => {
      const params = new URLSearchParams(urlSearchParams.toString());

      // 필터 적용
      Object.entries(filters).forEach(([key, value]) => {
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
  }, [urlSearchParams, router]);

  const handleDifficultyChange = useCallback((difficulty: string) => {
    const newDifficulty = localFilters.difficulty === difficulty ? '' : difficulty;
    setLocalFilters(prev => {
      const newFilters = { ...prev, difficulty: newDifficulty };
      // 실시간 적용
      setTimeout(() => {
        applyFiltersWithNewData(newFilters);
      }, 0);
      return newFilters;
    });
  }, [localFilters.difficulty, applyFiltersWithNewData]);

  const handleTagToggle = useCallback((tag: string) => {
    setLocalFilters(prev => {
      const newFilters = {
        ...prev,
        tags: prev.tags === tag ? '' : tag,
      };
      // 실시간 적용
      setTimeout(() => {
        applyFiltersWithNewData(newFilters);
      }, 0);
      return newFilters;
    });
  }, [applyFiltersWithNewData]);

  const handleLanguageChange = useCallback((language: string) => {
    setLocalFilters(prev => {
      const newFilters = {
        ...prev,
        language: prev.language === language ? '' : language,
      };
      // 실시간 적용
      setTimeout(() => {
        applyFiltersWithNewData(newFilters);
      }, 0);
      return newFilters;
    });
  }, [applyFiltersWithNewData]);

  const clearFilters = useCallback(() => {
    const clearedFilters = {
      search: '',
      difficulty: '',
      tags: '',
      language: '',
    };
    setLocalFilters(clearedFilters);

    startTransition(() => {
      router.push('/leetcode');
    });
  }, [router]);

  // 검색어 실시간 적용을 위한 디바운스 효과
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (localFilters.search !== (searchParams.search || '')) {
        applyFiltersWithNewData(localFilters);
      }
    }, 300); // 300ms 디바운스

    return () => clearTimeout(timeoutId);
  }, [localFilters.search, searchParams.search, localFilters, applyFiltersWithNewData]);

  const hasActiveFilters = Object.values(localFilters).some(value => value);
  const hasSelectedTags = localFilters.tags;

  return (
    <div className="mb-6 rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-shadow duration-200 hover:shadow-md dark:border-gray-700 dark:bg-gray-800 dark:hover:shadow-lg dark:hover:shadow-gray-900/20">
      {/* 검색바와 필터 버튼을 완전한 한 줄로 배치 */}
      <div className="mb-4 flex items-center gap-3">
        {/* 검색바 */}
        <div className="relative min-w-0 flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
          <input
            type="text"
            placeholder="문제 제목이나 태그로 검색..."
            value={localFilters.search}
            onChange={(e) => setLocalFilters(prev => ({ ...prev, search: e.target.value }))}
            className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-4 text-gray-900 placeholder-gray-500 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100 dark:placeholder-gray-400"
          />
        </div>

        {/* 필터 버튼들 - 항상 한 줄에 배치 */}
        <div className="flex flex-shrink-0 items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 whitespace-nowrap transition-all duration-200 hover:scale-105 active:scale-95"
          >
            <Filter className="h-4 w-4 transition-transform duration-200 group-hover:rotate-12" />
            <span className="hidden sm:inline">필터</span>
          </Button>

          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              disabled={isPending}
              className="group flex items-center gap-2 whitespace-nowrap text-gray-500 transition-all duration-200 hover:scale-105 hover:text-gray-700 active:scale-95 dark:text-gray-400 dark:hover:text-gray-200"
              title="필터 지우기"
            >
              <X className="h-4 w-4 transition-transform duration-200 group-hover:rotate-90" />
              <span className="hidden sm:inline">지우기</span>
            </Button>
          )}
        </div>
      </div>

      {/* 확장된 필터 옵션 */}
      {isExpanded && (
        <div className="space-y-4 border-t border-gray-200 pt-4 dark:border-gray-700">
          {/* 난이도 필터 */}
          <div>
            <h4 className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              난이도
            </h4>
            <div className="flex gap-2">
              {(['Easy', 'Medium', 'Hard'] as const).map(difficulty => (
                <Button
                  key={difficulty}
                  variant={
                    localFilters.difficulty === difficulty
                      ? 'default'
                      : 'outline'
                  }
                  size="sm"
                  onClick={() => handleDifficultyChange(difficulty)}
                  className={cn(
                    'text-xs transition-all duration-200 hover:scale-105 active:scale-95',
                    difficulty === 'Easy' &&
                      'border-green-300 text-green-700 hover:bg-green-50 dark:border-green-600 dark:text-green-400 dark:hover:bg-green-900/20',
                    difficulty === 'Medium' &&
                      'border-yellow-300 text-yellow-700 hover:bg-yellow-50 dark:border-yellow-600 dark:text-yellow-400 dark:hover:bg-yellow-900/20',
                    difficulty === 'Hard' &&
                      'border-red-300 text-red-700 hover:bg-red-50 dark:border-red-600 dark:text-red-400 dark:hover:bg-red-900/20',
                    localFilters.difficulty === difficulty &&
                      (difficulty === 'Easy'
                        ? 'bg-green-500 hover:bg-green-600 shadow-md shadow-green-500/25 border-green-500 text-white [&]:text-white'
                        : difficulty === 'Medium'
                          ? 'bg-yellow-500 hover:bg-yellow-600 shadow-md shadow-yellow-500/25 border-yellow-500 text-white [&]:text-white'
                          : 'bg-red-500 hover:bg-red-600 shadow-md shadow-red-500/25 border-red-500 text-white [&]:text-white'),
                  )}
                >
                  <span className={cn(
                    localFilters.difficulty === difficulty && 'text-white font-medium',
                  )}>
                    {difficulty === 'Easy'
                      ? '쉬움'
                      : difficulty === 'Medium'
                        ? '보통'
                        : '어려움'}
                  </span>
                </Button>
              ))}
            </div>
          </div>

          {/* 태그 필터 */}
          {availableTags.length > 0 && (
            <div>
              <h4 className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                태그 {hasSelectedTags && `(${hasSelectedTags} 선택됨)`}
              </h4>
              <div className="flex max-h-32 flex-wrap gap-1.5 overflow-y-auto">
                {availableTags.slice(0, 20).map(tag => (
                  <Button
                    key={tag}
                    variant={
                      localFilters.tags === tag ? 'default' : 'outline'
                    }
                    size="sm"
                    onClick={() => handleTagToggle(tag)}
                    className={cn(
                      'h-7 px-2 text-xs transition-all duration-200 hover:scale-105 active:scale-95',
                      localFilters.tags === tag && 'shadow-md shadow-blue-500/25',
                    )}
                  >
                    {tag}
                  </Button>
                ))}
              </div>
              {availableTags.length > 20 && (
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  상위 20개 태그만 표시됩니다.
                </p>
              )}
            </div>
          )}

          {/* 언어 필터 */}
          <div>
            <h4 className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              언어
            </h4>
            <div className="flex flex-wrap gap-2">
              {(['TypeScript', 'JavaScript', 'Python', 'Java', 'C++'] as const).map(language => (
                <Button
                  key={language}
                  variant={
                    localFilters.language === language ? 'default' : 'outline'
                  }
                  size="sm"
                  onClick={() => handleLanguageChange(language)}
                  className={cn(
                    'text-xs transition-all duration-200 hover:scale-105 active:scale-95',
                    localFilters.language === language && 'shadow-md shadow-blue-500/25',
                  )}
                >
                  {language}
                </Button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}