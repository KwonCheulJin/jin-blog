# LeetCode 페이지 제작을 위한 Claude Code 프롬프트

안녕하세요! Jin's Next.js Blog 프로젝트에 LeetCode 문제 페이지 기능을 추가해주세요.

## 📋 작업 요청 개요

### 목표
Supabase에 저장된 LeetCode 문제 데이터를 활용하여 고품질의 블로그 포스트 형태로 표시하는 기능을 구현해주세요.

### 주요 요구사항
1. **LeetCode 문제 목록 페이지** (`/posts/leetcode`)
2. **개별 LeetCode 문제 상세 페이지** (`/posts/leetcode/[slug]`)
3. **필터링 및 검색 기능** (난이도, 태그, 언어별)
4. **SEO 최적화** 및 **성능 최적화**
5. **반응형 디자인** 및 **다크모드 지원**

## 🎯 구현해야 할 주요 기능

### 1. 데이터 구조 (Supabase 테이블: `leetcode_problems`)
```typescript
interface LeetCodeProblemRecord {
  id?: number;
  problem_number: number;
  title: string;
  title_korean: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description_english: string;
  description_korean: string;
  constraints_english: string[];
  constraints_korean: string[];
  examples: any[];
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
```

### 2. 페이지 구조
```
/posts/leetcode/                    # LeetCode 문제 목록
/posts/leetcode/[slug]/            # 개별 문제 상세 페이지
```

### 3. 핵심 컴포넌트 (기존 패턴 준수)
- **ProblemCard**: 문제 목록에서 사용할 카드 컴포넌트
- **ProblemHeader**: 문제 상세 페이지 헤더
- **CodeBlock**: 솔루션 코드 표시 (react-syntax-highlighter 사용)
- **ComplexityBadge**: 시간/공간 복잡도 배지
- **DifficultyBadge**: 난이도 배지
- **TagList**: 알고리즘 태그 목록
- **ProblemFilter**: 필터링 컴포넌트

## 🏗️ 기술 스택 및 패턴 준수사항

### 필수 사용 기술
- **Next.js 15** (App Router)
- **TypeScript** (strict 모드)
- **Tailwind CSS** + **shadcn/ui** 컴포넌트
- **Supabase** (데이터베이스)
- **react-syntax-highlighter** (코드 하이라이팅)
- **Framer Motion** (애니메이션)

### 컴포넌트 패턴 준수
```typescript
// 기본 컴포넌트 구조 패턴
'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

type Props = {
  // props 타입 정의
};

export default function ComponentName({ }: Props) {
  return (
    <motion.div className={cn('기본 스타일', '다크모드 스타일')}>
      {/* 컴포넌트 내용 */}
    </motion.div>
  );
}
```

### 스타일링 가이드라인
- **컬러 시스템**: `primary-500`, `primaryDark`, `light`, `dark` 사용
- **난이도별 색상**:
  - Easy: `text-green-600 bg-green-100`
  - Medium: `text-yellow-600 bg-yellow-100`  
  - Hard: `text-red-600 bg-red-100`
- **다크모드**: 모든 컴포넌트에 `dark:` 클래스 적용
- **반응형**: 모바일 우선 설계

## 📝 구체적인 구현 요청

### 1. 폴더 구조 생성
```
src/
├── app/posts/leetcode/
│   ├── page.tsx                # 문제 목록 페이지
│   └── [slug]/
│       └── page.tsx           # 개별 문제 페이지
├── components/leetcode/
│   ├── ProblemCard.tsx
│   ├── ProblemHeader.tsx
│   ├── CodeBlock.tsx
│   ├── ComplexityBadge.tsx
│   ├── DifficultyBadge.tsx
│   ├── TagList.tsx
│   └── ProblemFilter.tsx
├── lib/
│   └── leetcode.ts            # LeetCode 관련 유틸리티
└── types/
    └── leetcode.ts            # 타입 정의
```

### 2. Supabase 연동
```typescript
// lib/leetcode.ts에 구현 필요
export async function getLeetCodeProblems(filters?: {
  difficulty?: string;
  tags?: string[];
  limit?: number;
  offset?: number;
}) {
  // Supabase 쿼리 구현
}

export async function getLeetCodeProblem(slug: string) {
  // 개별 문제 조회
}
```

### 3. SEO 최적화
- 메타데이터 생성 함수
- 구조화된 데이터 (JSON-LD)
- OG 이미지 대응

### 4. 핵심 UI 컴포넌트

#### 문제 목록 페이지 기능
- 문제 카드 그리드 레이아웃
- 난이도별 필터링
- 태그별 필터링
- 검색 기능
- 페이지네이션
- 정렬 옵션 (번호순, 최신순, 난이도순)

#### 개별 문제 페이지 기능
- 문제 정보 헤더 (제목, 난이도, 태그, 링크)
- 문제 설명 및 제약조건
- 예제 표시
- 솔루션 코드 (구문 강조)
- 접근 방식 설명
- 복잡도 분석
- 관련 문제 추천

## 🎨 디자인 요구사항

### 레이아웃
- **목록 페이지**: 카드 그리드 (1열→2열→3열 반응형)
- **상세 페이지**: 단일 컬럼, 최대 폭 제한
- **사이드바**: 필터 및 태그 목록 (데스크톱)

### 애니메이션
- 카드 호버 효과
- 페이지 전환 애니메이션
- 필터 적용 시 부드러운 전환

### 접근성
- 스크린 리더 지원
- 키보드 네비게이션
- 적절한 색상 대비

## 🔧 개발 가이드라인

### 코드 품질
- **TypeScript**: 모든 타입 명시, strict 모드
- **에러 처리**: try-catch, 에러 바운더리
- **성능**: React.memo, useMemo 적절히 사용
- **테스트**: 주요 컴포넌트 Vitest 테스트 작성

### 프로젝트 패턴 준수
- 기존 프로젝트의 컴포넌트 패턴 따르기
- `cn()` 함수로 클래스 조합
- Zustand 스토어 패턴 (필요시)
- API Routes 패턴 준수

### 환경 변수
```env
# 기존 Supabase 설정 사용
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

## 📋 체크리스트

개발 완료 시 다음 사항들이 구현되어야 합니다:

### 기본 기능
- [ ] LeetCode 문제 목록 페이지
- [ ] 개별 문제 상세 페이지
- [ ] Supabase 데이터 연동
- [ ] 필터링 및 검색 기능
- [ ] 반응형 디자인

### UI/UX
- [ ] 난이도별 색상 구분
- [ ] 다크모드 지원
- [ ] 애니메이션 효과
- [ ] 로딩 상태 표시
- [ ] 에러 상태 처리

### 성능 및 SEO
- [ ] 메타데이터 최적화
- [ ] 이미지 최적화
- [ ] 코드 분할 (필요시)
- [ ] 캐싱 전략 구현

### 코드 품질
- [ ] TypeScript 타입 안전성
- [ ] 에러 처리 및 바운더리
- [ ] 접근성 고려사항
- [ ] 테스트 커버리지

## 🚀 우선순위

### 1단계 (필수)
1. 기본 페이지 구조 및 라우팅
2. Supabase 연동 및 데이터 페칭
3. 핵심 UI 컴포넌트 (ProblemCard, ProblemHeader)
4. 기본 스타일링 (다크모드 포함)

### 2단계 (중요)
1. 필터링 및 검색 기능
2. 코드 하이라이팅 (CodeBlock 컴포넌트)
3. SEO 최적화 (메타데이터)
4. 반응형 디자인 개선

### 3단계 (추가)
1. 애니메이션 효과
2. 관련 문제 추천
3. 성능 최적화
4. 테스트 작성

---

**작업 시 참고사항:**
- 기존 프로젝트의 컴포넌트 패턴과 스타일 가이드를 꼭 준수해주세요
- BLOG_INTEGRATION_GUIDE.md의 상세 구현 예시를 참고해주세요
- 모든 작업 진행 상황과 완료 내용은 한국어로 보고해주세요
- 질문이나 불명확한 부분이 있으면 언제든 문의해주세요

기존 프로젝트의 높은 코드 품질과 일관성을 유지하면서 LeetCode 기능을 완벽하게 구현해주세요!