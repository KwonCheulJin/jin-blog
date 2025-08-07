# LeetCode 페이지 개발 여정: 실패와 성공 사이

## 들어가며

Next.js 15와 React 19를 기반으로 한 개인 블로그에 LeetCode 문제 해설 페이지를 구축하는 과정은 예상보다 많은 도전과 학습의 연속이었습니다. 이 글에서는 실제 개발 과정에서 겪었던 시행착오, 성공적으로 해결된 문제들, 그리고 사용자 피드백을 통한 지속적인 개선 사례를 공유하고자 합니다.

## 프로젝트 개요

### 기술 스택
- **Frontend**: Next.js 15, React 19, TypeScript
- **Database**: Supabase PostgreSQL
- **Styling**: Tailwind CSS + Framer Motion
- **UI Components**: Radix UI + shadcn/ui
- **Testing**: Vitest + Testing Library
- **State Management**: Zustand + TanStack Query

### 주요 목표
1. **사용자 친화적 UX**: 직관적인 네비게이션과 반응형 디자인
2. **성능 최적화**: 빠른 로딩과 효율적인 데이터 페칭
3. **접근성**: 모든 사용자가 편리하게 사용할 수 있는 인터페이스
4. **SEO 최적화**: 검색 엔진 친화적인 구조

## 개발 과정에서의 주요 도전과제

### 1. 마크다운 렌더링 이슈: 번호 목록 표시 문제

#### 🚨 문제 상황
LeetCode 문제의 상세 설명에서 번호 매기기 목록이 다음과 같이 표시되는 문제가 발생했습니다:

```
1.
음수확인:

2.
제곱근계산:
```

사용자가 원하는 형태는 다음과 같았습니다:
```
1. 음수확인:
2. 제곱근계산:
```

#### 🔍 문제 분석
문제의 원인은 `MarkdownRenderer` 컴포넌트에서 사용하고 있던 Tailwind CSS 클래스에 있었습니다:

```tsx
// 문제가 있던 코드
ol: 'mb-4 list-inside list-decimal space-y-1 text-gray-900 dark:text-gray-100'
```

`list-inside` 클래스로 인해 번호가 요소 내부에 렌더링되어 줄바꿈이 발생했습니다.

#### ✅ 해결 과정

1. **기존 MarkdownViewer와 비교 분석**
   - MarkdownViewer는 기본 `prose` 스타일만 사용하여 자연스러운 렌더링
   - MarkdownRenderer는 커스텀 스타일로 인한 문제 발생

2. **해결책 적용**
   ```tsx
   // 수정된 코드
   ol: 'mb-4 list-decimal space-y-1 pl-6 text-gray-900 dark:text-gray-100'
   ul: 'mb-4 list-disc space-y-1 pl-6 text-gray-900 dark:text-gray-100'
   ```

3. **결과**
   - `list-inside` 제거로 번호와 텍스트가 같은 줄에 표시
   - `pl-6` 추가로 적절한 들여쓰기 확보

#### 📚 학습 내용
- CSS 목록 스타일의 `list-inside`와 `list-outside` 차이점 이해
- Tailwind CSS의 목록 관련 유틸리티 클래스 깊이 있는 활용법
- 마크다운 렌더링에서 스타일 일관성의 중요성

### 2. 페이지네이션 최적화: 5개에서 6개로

#### 🎯 사용자 요구사항
"현재 5개씩 표시되는 문제 리스트를 6개 기준으로 변경하고, 상세 페이지의 관련 문제도 6개로 늘려주세요."

#### 🔍 코드 분석 과정

이 요청은 단순해 보였지만, 실제로는 여러 파일에 걸쳐 있는 설정들을 체계적으로 찾아 수정해야 하는 작업이었습니다.

1. **설정값 추적**
   ```typescript
   // src/lib/constants.ts - 글로벌 기본값
   export const DEFAULT_PER_PAGE = '5'; // → '6'으로 변경
   ```

2. **하드코딩된 값들 발견**
   ```tsx
   // LeetCodeServerContent.tsx에서 발견된 하드코딩
   {Math.ceil(total / Number(searchParams.per_page || 12))} // → 6으로 변경
   ```

3. **Repository 레이어 수정**
   ```typescript
   // repositories/leetcodeRepository.ts
   const limit = filters.limit || 12; // → 6으로 변경
   ```

#### ✅ 체계적인 해결 과정

1. **전체 아키텍처 파악**
   - Service Layer: 비즈니스 로직 담당
   - Repository Layer: 데이터 접근 담당
   - Component Layer: UI 렌더링 담당
   - Constants: 전역 설정값 관리

2. **변경 파일 목록**
   ```
   ✅ src/lib/constants.ts - DEFAULT_PER_PAGE: '5' → '6'
   ✅ src/components/leetcode/LeetCodeServerContent.tsx - 하드코딩 12 → 6
   ✅ src/repositories/leetcodeRepository.ts - limit 기본값 12 → 6  
   ✅ src/lib/leetcode.ts - limit 기본값 12 → 6
   ✅ src/service/leetcode.ts - 관련 문제 limit 5 → 6
   ```

3. **검증 과정**
   - 메인 리스트 페이지에서 6개씩 표시 확인
   - 페이지네이션 계산 로직 검증
   - 상세 페이지 관련 문제 6개 표시 확인

#### 📚 학습 내용
- 레이어드 아키텍처에서 설정값 관리의 중요성
- 하드코딩의 위험성과 상수 관리 베스트 프랙티스
- 시스템 전반에 걸친 변경사항의 영향도 분석 방법

### 3. 컴포넌트 아키텍처 개선: 단일 파일 리팩토링

#### 🎯 리팩토링 동기
사용자 피드백과 코드 리뷰 과정에서 LeetCode 상세 페이지 컴포넌트(`/leetcode/[slug]/page.tsx`)가 269줄에 달하는 거대한 단일 컴포넌트로 구성되어 있다는 문제점을 발견했습니다.

#### 🔍 문제점 분석

**기존 구조의 한계:**
```tsx
// 기존: 269줄의 거대한 단일 컴포넌트
function ProblemContent({ problemData }: { problemData: LeetCodeProblemWithNavigation }) {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <ProblemHeader problem={problemData} />
      
      <article className="prose prose-gray max-w-none dark:prose-invert">
        {/* 문제 설명 섹션 - 10줄 */}
        <section className="mb-8">...</section>
        
        {/* 예제 섹션 - 47줄 */}
        <section className="-mt-2 mb-8">...</section>
        
        {/* 제약 조건 섹션 - 26줄 */}
        <section className="mb-8">...</section>
        
        {/* 해결 방법 섹션 - 61줄 */}
        <section className="mb-8">...</section>
        
        {/* 관련 문제 섹션 - 17줄 */}
        <section className="not-prose mt-12">...</section>
      </article>
    </div>
  );
}
```

**식별된 문제점:**
1. **단일 책임 원칙 위반**: 하나의 컴포넌트가 너무 많은 책임을 가짐
2. **재사용성 부족**: 개별 섹션을 다른 곳에서 사용할 수 없음
3. **유지보수 어려움**: 특정 섹션 수정 시 전체 파일 영향
4. **테스트 복잡성**: 큰 컴포넌트는 단위 테스트가 어려움

#### ✅ 체계적인 리팩토링 과정

**1. 컴포넌트 분리 전략 수립**

분리 가능한 컴포넌트들을 식별하고 계층 구조를 설계했습니다:

```
📁 components/leetcode/
├── ProblemDescription.tsx     # 문제 설명
├── ExamplesSection.tsx        # 예제 섹션
├── ConstraintsSection.tsx     # 제약 조건
├── SolutionSection.tsx        # 해결 방법 (통합)
│   ├── ApproachSection.tsx    # 접근 방식
│   ├── SolutionCodeSection.tsx # 솔루션 코드
│   ├── ComplexitySection.tsx  # 복잡도 분석
│   └── ExplanationSection.tsx # 상세 설명
└── RelatedProblemsSection.tsx # 관련 문제
```

**2. 개별 컴포넌트 생성**

각 컴포넌트를 독립적이고 재사용 가능하도록 설계했습니다:

```tsx
// ProblemDescription.tsx - 문제 설명 컴포넌트
interface Props {
  description: string;
}

export default function ProblemDescription({ description }: Props) {
  return (
    <section className="mb-8">
      <h2 className="mb-6 border-b border-gray-200 pb-2 text-2xl font-bold text-gray-900 dark:border-gray-700 dark:text-gray-100">
        문제 설명
      </h2>
      <MarkdownRenderer
        content={description || ''}
        variant="default"
        className="prose-lg"
      />
    </section>
  );
}
```

```tsx
// ExamplesSection.tsx - 예제 섹션 컴포넌트
interface ExampleData {
  input: string;
  output: string;
  explanation?: string;
}

interface Props {
  examples: ExampleData[];
}

export default function ExamplesSection({ examples }: Props) {
  if (!examples || examples.length === 0) {
    return null; // 조건부 렌더링으로 안전성 확보
  }
  
  return (
    <section className="-mt-2 mb-8">
      {/* 예제 렌더링 로직 */}
    </section>
  );
}
```

**3. 계층적 컴포넌트 구조 구현**

복잡한 해결 방법 섹션을 통합 관리하는 상위 컴포넌트를 생성했습니다:

```tsx
// SolutionSection.tsx - 해결 방법 통합 컴포넌트
interface Props {
  approach?: string;
  solutionCode?: string;
  solutionLanguage?: string;
  timeComplexity?: string;
  spaceComplexity?: string;
  explanation?: string;
}

export default function SolutionSection({
  approach,
  solutionCode,
  solutionLanguage,
  timeComplexity,
  spaceComplexity,
  explanation,
}: Props) {
  return (
    <section className="mb-8">
      <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-gray-100">
        해결 방법
      </h2>

      <ApproachSection approach={approach || ''} />
      
      <SolutionCodeSection 
        code={solutionCode || ''} 
        language={solutionLanguage || ''} 
      />

      <ComplexitySection
        timeComplexity={timeComplexity}
        spaceComplexity={spaceComplexity}
      />

      <ExplanationSection explanation={explanation || ''} />
    </section>
  );
}
```

**4. 메인 페이지 컴포넌트 간소화**

원본 페이지를 새로운 컴포넌트들을 활용하여 대폭 간소화했습니다:

```tsx
// 리팩토링 후: 119줄의 깔끔한 구조
function ProblemContent({
  problemData,
}: {
  problemData: LeetCodeProblemWithNavigation;
}) {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <ProblemHeader problem={problemData} />

      <article className="prose prose-gray max-w-none dark:prose-invert">
        <ProblemDescription description={problemData.description_korean || ''} />

        <ExamplesSection examples={problemData.examples || []} />

        <ConstraintsSection constraints={problemData.constraints_korean || []} />

        <SolutionSection
          approach={problemData.approach_korean}
          solutionCode={problemData.solution_code}
          solutionLanguage={problemData.solution_language}
          timeComplexity={problemData.time_complexity}
          spaceComplexity={problemData.space_complexity}
          explanation={problemData.explanation_korean}
        />

        <RelatedProblemsSection relatedProblems={problemData.relatedProblems || []} />
      </article>
    </div>
  );
}
```

#### 🚀 리팩토링 성과

**정량적 개선:**
- **코드 라인 수**: 269줄 → 119줄 (56% 감소)
- **컴포넌트 수**: 1개 → 9개 (모듈화)
- **평균 컴포넌트 크기**: 30줄 이하 (관리 용이성)

**정성적 개선:**
1. **가독성 향상**: 각 컴포넌트가 명확한 단일 책임을 가짐
2. **유지보수성**: 특정 섹션 수정 시 해당 컴포넌트만 영향
3. **재사용성**: 개별 섹션을 다른 페이지에서도 활용 가능
4. **테스트 용이성**: 작은 단위로 개별 테스트 가능

**타입 안전성 강화:**
```tsx
// 각 컴포넌트마다 명확한 Props 인터페이스 정의
interface ExampleData {
  input: string;
  output: string;
  explanation?: string;
}

interface Props {
  examples: ExampleData[];
}
```

**조건부 렌더링으로 안정성 확보:**
```tsx
// null 데이터에 대한 안전한 처리
export default function ExamplesSection({ examples }: Props) {
  if (!examples || examples.length === 0) {
    return null;
  }
  // 렌더링 로직
}
```

#### 📚 학습 내용
- **단일 책임 원칙**: 각 컴포넌트가 하나의 명확한 책임을 가져야 함
- **컴포넌트 합성**: 작은 컴포넌트들을 조합하여 복잡한 UI 구성
- **조건부 렌더링**: 안전한 데이터 처리를 위한 null 체크의 중요성
- **타입 안전성**: 명확한 인터페이스 정의로 런타임 에러 방지
- **계층적 설계**: 상위 컴포넌트가 하위 컴포넌트들을 통합 관리하는 패턴

이 리팩토링을 통해 코드의 품질과 유지보수성이 크게 향상되었으며, 향후 기능 확장과 테스트 작성이 훨씬 용이해졌습니다.

## 성공적으로 구현된 핵심 기능들

### 1. 실시간 필터링 시스템

```tsx
// RealTimeFilter 컴포넌트
const [filters, setFilters] = useState({
  difficulty: searchParams.difficulty || '',
  tags: searchParams.tags || '',
  search: searchParams.search || ''
});

// URL과 동기화된 실시간 필터링
useEffect(() => {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value) params.set(key, value);
  });
  params.set('page', '1'); // 필터 변경시 첫 페이지로 리셋
  router.push(`/leetcode?${params.toString()}`);
}, [filters]);
```

**성공 요인:**
- 사용자 경험을 고려한 즉시 반영
- URL 상태와 동기화로 뒤로가기/북마크 지원
- 필터 변경시 자동으로 첫 페이지로 이동

### 2. 복잡도 분석 시각화

```tsx
// ComplexityBadge 컴포넌트
const ComplexityBadge = ({ timeComplexity, spaceComplexity }) => (
  <div className="flex gap-4">
    <div className="bg-blue-50 p-3 rounded-lg">
      <span className="text-sm font-medium text-blue-600">시간복잡도</span>
      <code className="block text-lg font-mono text-blue-800">
        {timeComplexity}
      </code>
    </div>
    <div className="bg-green-50 p-3 rounded-lg">
      <span className="text-sm font-medium text-green-600">공간복잡도</span>
      <code className="block text-lg font-mono text-green-800">
        {spaceComplexity}
      </code>
    </div>
  </div>
);
```

**성공 요인:**
- 직관적인 색상 구분 (시간-파란색, 공간-초록색)
- 개발자에게 친숙한 monospace 폰트 사용
- 시각적으로 구분되는 카드 디자인

### 3. 반응형 그리드 레이아웃

```tsx
// 문제 카드 그리드
<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
  {problems.map(problem => (
    <ProblemCard key={problem.slug} problem={problem} />
  ))}
</div>
```

**성공 요인:**
- 모바일: 1열, 태블릿: 2열, 데스크톱: 3열
- 6개 항목이 데스크톱에서 2줄로 깔끔하게 배치
- Framer Motion으로 부드러운 애니메이션 추가

## 아키텍처 설계의 성공 포인트

### 1. 레이어드 아키텍처 적용

```
┌─────────────────┐
│   Presentation  │ ← Components, Pages
├─────────────────┤
│    Service      │ ← Business Logic
├─────────────────┤
│   Repository    │ ← Data Access
├─────────────────┤
│   Database      │ ← Supabase
└─────────────────┘
```

**장점:**
- 각 레이어의 명확한 책임 분리
- 테스트 용이성 증대
- 유지보수성 향상

### 2. TypeScript 타입 안전성

```typescript
interface LeetCodeProblemRecord {
  id?: number;
  problem_number: number;
  title: string;
  title_korean: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  slug: string;
  // ... 기타 필드들
}

interface LeetCodePageData {
  problems: LeetCodeProblemRecord[];
  tags: string[];
  total: number;
  page: number;
  start: number;
  end: number;
  hasNext: boolean;
  hasPrev: boolean;
}
```

**효과:**
- 컴파일 타임 에러 방지
- IDE 자동완성 지원
- 리팩토링 안전성 확보

### 3. 성능 최적화 전략

#### Server-Side Rendering (SSR)
```tsx
// 정적 생성으로 빠른 로딩
export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map(slug => ({ slug }));
}

// 메타데이터 생성
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const problemData = await getLeetCodeProblemData(params.slug);
  return {
    title: `${problemData.title_korean} - LeetCode ${problemData.problem_number}번`,
    description: problemData.description_korean?.substring(0, 160),
  };
}
```

#### 클라이언트 사이드 최적화
```tsx
// TanStack Query로 캐싱
const { data: problems, isLoading } = useQuery({
  queryKey: ['leetcode-problems', filters],
  queryFn: () => fetchLeetCodeProblems(filters),
  staleTime: 5 * 60 * 1000, // 5분 캐시
});
```

## 사용자 피드백과 지속적인 개선

### 피드백 1: "마크다운 목록이 이상해요"
- **문제**: 번호 목록의 줄바꿈 이슈
- **대응**: CSS 스타일 분석 및 즉시 수정
- **결과**: 가독성 크게 향상

### 피드백 2: "한 페이지에 더 많은 문제를 보고 싶어요"
- **문제**: 5개 단위의 페이지네이션이 아쉬움
- **대응**: 체계적인 설정값 변경으로 6개로 조정
- **결과**: 그리드 레이아웃과 완벽하게 어울리는 배치 구현

### 피드백 3: "코드가 너무 길고 복잡해 보여요"
- **문제**: 단일 페이지 컴포넌트가 269줄로 비대해짐
- **대응**: 체계적인 컴포넌트 분리 및 리팩토링 수행
- **결과**: 유지보수성과 재사용성 크게 향상

## 실패했던 시도들과 교훈

### 1. 초기 데이터 구조 설계 실수

**문제**: 처음에는 모든 텍스트를 단일 필드로 저장
```sql
-- 잘못된 설계
CREATE TABLE leetcode_problems (
  content TEXT -- 모든 내용을 하나의 필드에
);
```

**개선**: 구조화된 데이터로 변경
```sql
-- 개선된 설계
CREATE TABLE leetcode_problems (
  description_korean TEXT,
  constraints_korean TEXT[],
  examples JSONB,
  approach_korean TEXT,
  explanation_korean TEXT
);
```

**교훈**: 초기 설계 단계에서 데이터 구조를 충분히 고민해야 함

### 2. 성능 최적화 오버엔지니어링

**문제**: 초기에 복잡한 캐싱 전략 시도
- Redis 도입 검토
- 복잡한 인메모리 캐싱

**현실**: 단순한 해결책이 더 효과적
- TanStack Query의 내장 캐싱
- Next.js의 기본 캐싱 전략 활용

**교훈**: 성능 문제가 실제로 발생한 후 최적화하는 것이 효율적

## 앞으로의 계획

### 1. 사용자 경험 개선
- [ ] 문제 해결 진행 상황 트래킹
- [ ] 개인화된 문제 추천 시스템
- [ ] 문제 즐겨찾기 기능

### 2. 성능 최적화
- [x] 컴포넌트 분리를 통한 코드 가독성 및 유지보수성 향상
- [ ] React.memo를 활용한 컴포넌트 메모이제이션 적용
- [ ] 개별 컴포넌트 lazy loading 구현
- [ ] 이미지 최적화 (Next.js Image 컴포넌트 활용)
- [ ] 코드 분할을 통한 번들 크기 최적화
- [ ] PWA 기능 추가

### 3. 코드 품질 & 아키텍처
- [x] LeetCode 페이지 컴포넌트 분리 (269줄 → 119줄 + 9개 모듈)
- [ ] 각 컴포넌트에 대한 단위 테스트 작성
- [ ] Storybook을 활용한 컴포넌트 문서화
- [ ] 컴포넌트 재사용성 검증 및 개선
- [ ] 에러 바운더리 적용

### 4. 접근성 개선
- [ ] 키보드 네비게이션 완전 지원
- [ ] 스크린 리더 최적화
- [ ] 다크모드 접근성 검증

## 결론

LeetCode 페이지 개발 과정은 기술적 도전과 사용자 피드백을 통한 지속적인 학습의 여정이었습니다. 특히 다음과 같은 중요한 교훈을 얻었습니다:

1. **사용자 피드백의 가치**: 개발자가 놓치기 쉬운 UX 이슈들을 발견
2. **체계적인 접근**: 작은 변경도 시스템 전체에 미치는 영향 고려
3. **단순함의 힘**: 복잡한 해결책보다 단순하고 명확한 접근이 더 효과적
4. **타입 안전성**: TypeScript의 활용으로 런타임 에러 대폭 감소
5. **컴포넌트 설계의 중요성**: 단일 책임 원칙과 재사용성을 고려한 모듈화의 효과
6. **리팩토링의 가치**: 초기 동작하는 코드에서 점진적으로 개선하는 접근법의 유용성

### 개발 과정에서 얻은 핵심 인사이트

**🔧 기술적 측면:**
- 레이어드 아키텍처의 중요성과 각 레이어의 명확한 책임 분리
- 컴포넌트 합성을 통한 복잡한 UI의 단순한 관리
- 타입 안전성을 통한 개발 생산성 및 코드 품질 향상

**👥 사용자 중심 개발:**
- 실제 사용자 피드백의 즉각적인 반영과 개선의 중요성
- 개발자 관점과 사용자 관점의 차이에 대한 이해
- 지속적인 개선을 통한 사용자 경험 최적화

**⚡ 성능과 유지보수성:**
- 코드 구조의 개선이 성능과 유지보수성에 미치는 긍정적 영향
- 작은 컴포넌트들의 조합이 만드는 큰 시너지 효과
- 초기 완성도보다 지속적인 개선의 가치

앞으로도 사용자 중심의 사고와 기술적 탁월성을 동시에 추구하며, 더 나은 개발자 경험을 제공하는 플랫폼으로 발전시켜 나갈 계획입니다. 특히 이번 컴포넌트 리팩토링을 통해 얻은 모듈화와 재사용성의 가치를 다른 부분에도 적용하여 전체적인 코드 품질을 지속적으로 향상시켜 나가겠습니다.

---

*이 글은 실제 개발 과정에서 겪었던 경험을 바탕으로 작성되었으며, 비슷한 프로젝트를 진행하는 개발자들에게 도움이 되기를 바랍니다.*