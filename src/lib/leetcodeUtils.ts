import type { LeetCodeProblemRecord } from '@/types/leetcode';

/**
 * 난이도별 색상 클래스를 반환합니다.
 */
export function getDifficultyColorClass(
  difficulty: 'Easy' | 'Medium' | 'Hard',
): string {
  switch (difficulty) {
    case 'Easy':
      return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/30';
    case 'Medium':
      return 'text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/30';
    case 'Hard':
      return 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/30';
    default:
      return 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-900/30';
  }
}

/**
 * 난이도별 한국어 레이블을 반환합니다.
 */
export function getDifficultyLabel(
  difficulty: 'Easy' | 'Medium' | 'Hard',
): string {
  switch (difficulty) {
    case 'Easy':
      return '쉬움';
    case 'Medium':
      return '보통';
    case 'Hard':
      return '어려움';
    default:
      return difficulty;
  }
}

/**
 * 언어별 코드 하이라이팅 언어 맵핑을 반환합니다.
 */
export function getLanguageMapping(language: string): string {
  const languageMap: { [key: string]: string } = {
    typescript: 'typescript',
    javascript: 'javascript',
    python: 'python',
    java: 'java',
    cpp: 'cpp',
    'c++': 'cpp',
    c: 'c',
    go: 'go',
    rust: 'rust',
    kotlin: 'kotlin',
    swift: 'swift',
  };

  return languageMap[language.toLowerCase()] || 'javascript';
}

/**
 * 예상 읽기 시간을 계산합니다 (분 단위)
 */
export function calculateReadingTime(problem: LeetCodeProblemRecord): number {
  const wordsPerMinute = 200; // 한국어 기준

  let totalLength = 0;
  totalLength += problem.description_korean?.length || 0;
  totalLength += problem.approach_korean?.length || 0;
  totalLength += problem.explanation_korean?.length || 0;
  totalLength += problem.solution_code?.length || 0;

  const words = Math.ceil(totalLength / 5); // 한국어는 대략 5글자당 1단어로 계산
  const readingTime = Math.ceil(words / wordsPerMinute);

  return Math.max(1, readingTime); // 최소 1분
}