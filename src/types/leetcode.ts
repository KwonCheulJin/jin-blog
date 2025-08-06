export interface LeetCodeProblemRecord {
  id?: number;
  problem_number: number;
  title: string;
  title_korean: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description_english: string;
  description_korean: string;
  constraints_english: string[];
  constraints_korean: string[];
  examples: LeetCodeExample[];
  solution_code: string;
  solution_language: string;
  explanation_korean?: string;
  approach_korean?: string;
  time_complexity?: string;
  space_complexity?: string;
  tags: string[];
  slug: string;
  leetcode_url?: string;
  github_url?: string;
  is_premium?: boolean;
  acceptance_rate?: number;
  submission_count?: number;
  created_at?: string;
  updated_at?: string;
}

export interface LeetCodeExample {
  input: string;
  output: string;
  explanation?: string;
}

export interface LeetCodeFilters {
  difficulty?: 'Easy' | 'Medium' | 'Hard';
  tags?: string[];
  language?: string;
  search?: string;
  limit?: number;
  offset?: number;
}

export interface ProblemCardProps {
  problem: LeetCodeProblemRecord;
  className?: string;
}

export interface ProblemHeaderProps {
  problem: LeetCodeProblemRecord;
}

export interface CodeBlockProps {
  code: string;
  language: string;
  className?: string;
}

export interface ComplexityBadgeProps {
  timeComplexity?: string;
  spaceComplexity?: string;
}

export interface DifficultyBadgeProps {
  difficulty: 'Easy' | 'Medium' | 'Hard';
  className?: string;
}

export interface TagListProps {
  tags: string[];
  className?: string;
}

export interface ProblemFilterProps {
  filters: LeetCodeFilters;
  onFilterChange: (filters: LeetCodeFilters) => void;
  availableTags: string[];
}

export type DifficultyLevel = 'Easy' | 'Medium' | 'Hard';

export interface LeetCodeListResponse {
  problems: LeetCodeProblemRecord[];
  total: number;
  page: number;
  limit: number;
}
