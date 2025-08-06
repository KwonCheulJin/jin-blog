import { DEFAULT_PAGE, DEFAULT_PER_PAGE } from '@/lib/constants';
import { leetcodeRepository } from '@/repositories/leetcodeRepository';
import { LeetCodeProblemRecord } from '@/types/leetcode';

export interface LeetCodeFiltersWithPaging {
  page?: string;
  per_page?: string;
  difficulty?: 'Easy' | 'Medium' | 'Hard';
  tags?: string;
  search?: string;
  language?: string;
}

export interface LeetCodePageData {
  problems: LeetCodeProblemRecord[];
  tags: string[];
  total: number;
  page: number;
  start: number;
  end: number;
  hasNext: boolean;
  hasPrev: boolean;
}

/**
 * 모든 LeetCode 문제를 정렬된 상태로 가져옵니다
 */
export async function getAllLeetCodeProblemsSorted(): Promise<
  LeetCodeProblemRecord[]
> {
  const response = await leetcodeRepository.getLeetCodeProblems({
    limit: 1000,
  });
  return response.problems.sort((a, b) => a.problem_number - b.problem_number);
}

/**
 * 특정 slug로 LeetCode 문제를 가져옵니다
 */
export async function getLeetCodeProblem(
  slug: string,
): Promise<LeetCodeProblemRecord | null> {
  return await leetcodeRepository.getLeetCodeProblem(slug);
}

/**
 * 사용 가능한 모든 태그를 가져옵니다
 */
export async function getAvailableTags(): Promise<string[]> {
  return await leetcodeRepository.getAvailableTags();
}

/**
 * 사용 가능한 모든 프로그래밍 언어를 가져옵니다
 */
export async function getAvailableLanguages(): Promise<string[]> {
  return await leetcodeRepository.getAvailableLanguages();
}

/**
 * LeetCode 문제 목록 데이터를 페이지네이션과 필터와 함께 가져옵니다
 * posts의 getAllPostsData 패턴을 따름
 */
export async function getAllLeetCodeProblemsData(
  filters: LeetCodeFiltersWithPaging = {},
): Promise<LeetCodePageData> {
  const {
    page = DEFAULT_PAGE,
    per_page = DEFAULT_PER_PAGE,
    difficulty,
    tags,
    search,
    language,
  } = filters;

  const pageNum = Number(page);
  const perPageNum = Number(per_page);
  const offset = (pageNum - 1) * perPageNum;

  // 필터를 적용한 데이터 조회
  const response = await leetcodeRepository.getLeetCodeProblems({
    difficulty,
    tags: tags ? [tags] : undefined,
    search,
    language,
    limit: perPageNum,
    offset,
  });

  // 시작과 끝 인덱스 계산
  const start = offset + 1;
  const end = Math.min(offset + response.problems.length, response.total);

  // 페이지네이션 정보
  const hasNext = end < response.total;
  const hasPrev = pageNum > 1;

  // 태그 정보 가져오기
  const availableTags = await getAvailableTags();

  return {
    problems: response.problems,
    tags: availableTags,
    total: response.total,
    page: pageNum,
    start,
    end,
    hasNext,
    hasPrev,
  };
}

/**
 * 관련 문제들을 가져옵니다 (같은 태그를 가진 문제들)
 */
export async function getRelatedProblems(
  currentProblem: LeetCodeProblemRecord,
  limit: number = 5,
): Promise<LeetCodeProblemRecord[]> {
  return await leetcodeRepository.getRelatedProblems(currentProblem, limit);
}

/**
 * LeetCode 문제 상세 데이터를 가져옵니다 (이전/다음 문제 포함)
 * posts의 getPostData 패턴을 따름
 */
export async function getLeetCodeProblemData(slug: string) {
  const problem = await getLeetCodeProblem(slug);
  if (!problem) {
    return null;
  }

  // 모든 문제를 정렬된 상태로 가져와서 이전/다음 문제 찾기
  const allProblems = await getAllLeetCodeProblemsSorted();
  const currentIndex = allProblems.findIndex(p => p.slug === slug);

  if (currentIndex === -1) {
    return null;
  }

  const next =
    currentIndex > 0
      ? {
          slug: allProblems[currentIndex - 1].slug,
          title: allProblems[currentIndex - 1].title_korean,
          problem_number: allProblems[currentIndex - 1].problem_number,
        }
      : null;

  const prev =
    currentIndex < allProblems.length - 1
      ? {
          slug: allProblems[currentIndex + 1].slug,
          title: allProblems[currentIndex + 1].title_korean,
          problem_number: allProblems[currentIndex + 1].problem_number,
        }
      : null;

  // 관련 문제들 가져오기
  const relatedProblems = await getRelatedProblems(problem, 5);

  return {
    ...problem,
    next,
    prev,
    relatedProblems,
  };
}

/**
 * Static Generation용 모든 slug 가져오기
 */
export async function getAllSlugs(): Promise<string[]> {
  return await leetcodeRepository.getAllSlugs();
}
