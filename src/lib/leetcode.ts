import { getSupabaseBrowserClient } from '@/utils/supabase/client';
import {
  LeetCodeFilters,
  LeetCodeListResponse,
  LeetCodeProblemRecord,
} from '@/types/leetcode';
import { Tables } from '@/types/supabase';

// 서버 사이드 Repository 함수는 페이지에서 직접 import 하도록 함

// Supabase 타입을 LeetCode 타입으로 변환하는 함수 (클라이언트용)
function mapSupabaseToLeetCode(data: Tables<'leetcode_problems'>): LeetCodeProblemRecord {
  return {
    id: data.id,
    problem_number: data.problem_number,
    title: data.title,
    title_korean: data.title_korean,
    difficulty: data.difficulty as 'Easy' | 'Medium' | 'Hard',
    slug: data.slug,
    description_english: data.description_english,
    description_korean: data.description_korean,
    solution_code: data.solution_code,
    solution_language: data.solution_language,
    tags: data.tags || [],
    constraints_english: data.constraints_english || [],
    constraints_korean: data.constraints_korean || [],
    examples: data.examples as any,
    approach_korean: data.approach_korean || undefined,
    explanation_korean: data.explanation_korean || undefined,
    time_complexity: data.time_complexity || undefined,
    space_complexity: data.space_complexity || undefined,
    acceptance_rate: data.acceptance_rate || undefined,
    submission_count: data.submission_count || undefined,
    is_premium: data.is_premium || false,
    leetcode_url: data.leetcode_url || undefined,
    github_url: data.github_url || undefined,
    created_at: data.created_at || undefined,
    updated_at: data.updated_at || undefined,
  };
}

/**
 * LeetCode 문제 목록을 가져옵니다 (클라이언트 사이드용)
 */
export async function getLeetCodeProblems(
  filters: LeetCodeFilters = {},
): Promise<LeetCodeListResponse> {
  const supabase = getSupabaseBrowserClient();

  let query = supabase
    .from('leetcode_problems')
    .select('*', { count: 'exact' });

  // 난이도 필터
  if (filters.difficulty) {
    query = query.eq('difficulty', filters.difficulty);
  }

  // 태그 필터
  if (filters.tags && filters.tags.length > 0) {
    query = query.overlaps('tags', filters.tags);
  }

  // 언어 필터
  if (filters.language) {
    query = query.eq('solution_language', filters.language);
  }

  // 검색 필터 (제목, 한국어 제목, 태그에서 검색)
  if (filters.search) {
    query = query.or(
      `title.ilike.%${filters.search}%,title_korean.ilike.%${filters.search}%,tags.cs.{${filters.search}}`,
    );
  }

  // 정렬 (문제 번호 오름차순)
  query = query.order('problem_number', { ascending: true });

  // 페이지네이션
  const limit = filters.limit || 6;
  const offset = filters.offset || 0;
  query = query.range(offset, offset + limit - 1);

  const { data, error, count } = await query;

  if (error) {
    console.error('LeetCode 문제 목록 조회 오류:', error);
    throw new Error('문제 목록을 불러오는데 실패했습니다.');
  }

  return {
    problems: data ? data.map(mapSupabaseToLeetCode) : [],
    total: count || 0,
    page: Math.floor(offset / limit) + 1,
    limit,
  };
}

/**
 * 특정 slug로 LeetCode 문제를 가져옵니다 (클라이언트 사이드용)
 */
export async function getLeetCodeProblem(
  slug: string,
): Promise<LeetCodeProblemRecord | null> {
  const supabase = getSupabaseBrowserClient();

  const { data, error } = await supabase
    .from('leetcode_problems')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      return null; // 문제를 찾을 수 없음
    }
    console.error('LeetCode 문제 조회 오류:', error);
    throw new Error('문제를 불러오는데 실패했습니다.');
  }

  return mapSupabaseToLeetCode(data);
}

/**
 * 사용 가능한 모든 태그를 가져옵니다 (클라이언트 사이드용)
 */
export async function getAvailableTags(): Promise<string[]> {
  const supabase = getSupabaseBrowserClient();

  const { data, error } = await supabase
    .from('leetcode_problems')
    .select('tags');

  if (error) {
    console.error('태그 조회 오류:', error);
    return [];
  }

  // 모든 태그를 수집하고 중복 제거
  const allTags =
    data?.reduce((acc, item) => {
      if (item.tags && Array.isArray(item.tags)) {
        acc.push(...item.tags);
      }
      return acc;
    }, [] as string[]) || [];

  return Array.from(new Set(allTags)).sort();
}

/**
 * 사용 가능한 모든 프로그래밍 언어를 가져옵니다 (클라이언트 사이드용)
 */
export async function getAvailableLanguages(): Promise<string[]> {
  const supabase = getSupabaseBrowserClient();

  const { data, error } = await supabase
    .from('leetcode_problems')
    .select('solution_language');

  if (error) {
    console.error('언어 조회 오류:', error);
    return [];
  }

  const languages =
    data?.map(item => item.solution_language).filter(Boolean) || [];
  return Array.from(new Set(languages)).sort();
}

/**
 * 관련 문제들을 가져옵니다 (같은 태그를 가진 문제들) (클라이언트 사이드용)
 */
export async function getRelatedProblems(
  currentProblem: LeetCodeProblemRecord,
  limit: number = 6,
): Promise<LeetCodeProblemRecord[]> {
  const supabase = getSupabaseBrowserClient();

  if (!currentProblem.tags || currentProblem.tags.length === 0) {
    return [];
  }

  const { data, error } = await supabase
    .from('leetcode_problems')
    .select('*')
    .overlaps('tags', currentProblem.tags)
    .neq('id', currentProblem.id || 0)
    .limit(limit);

  if (error) {
    console.error('관련 문제 조회 오류:', error);
    return [];
  }

  return data ? data.map(mapSupabaseToLeetCode) : [];
}


// Utility functions re-exported from leetcodeUtils
export {
  getDifficultyColorClass,
  getDifficultyLabel,
  getLanguageMapping,
  calculateReadingTime,
} from './leetcodeUtils';



