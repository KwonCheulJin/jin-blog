# jin-blog 프로젝트 LeetCode 데이터 활용 가이드

이 문서는 [jin-blog](https://github.com/KwonCheulJin/jin-blog) 프로젝트에서 Supabase에 저장된 LeetCode 문제 데이터를 활용하여 블로그 포스트를 생성할 때 참고해야 할 사항들을 정리한 가이드입니다.

## 📋 목차

1. [프로젝트 개요](#프로젝트-개요)
2. [데이터 구조 이해](#데이터-구조-이해)
3. [jin-blog 프로젝트 아키텍처](#jin-blog-프로젝트-아키텍처)
4. [데이터 연동 방법](#데이터-연동-방법)
5. [블로그 포스트 생성 전략](#블로그-포스트-생성-전략)
6. [SEO 최적화 고려사항](#seo-최적화-고려사항)
7. [성능 최적화](#성능-최적화)
8. [콘텐츠 관리 전략](#콘텐츠-관리-전략)
9. [배포 및 CI/CD 고려사항](#배포-및-cicd-고려사항)
10. [문제 해결 및 디버깅](#문제-해결-및-디버깅)

## 🎯 프로젝트 개요

### 데이터 플로우
```
LeetCode 문제 해결 → 자동 번역 → Supabase 저장 → jin-blog 포스트 생성
```

### 주요 목표
- **자동화**: LeetCode 문제 해결 후 자동으로 고품질 블로그 포스트 생성
- **다국어 지원**: 한국어/영어 양방향 콘텐츠 제공
- **SEO 최적화**: 검색 엔진 친화적인 구조화된 콘텐츠
- **개발자 경험**: 코드 하이라이팅, 복잡도 분석, 관련 문제 추천

## 📊 데이터 구조 이해

### Supabase 테이블: `leetcode_problems`

```typescript
interface LeetCodeProblemRecord {
  // 기본 정보
  id?: number;
  problem_number: number;           // LeetCode 문제 번호
  title: string;                   // 영어 제목
  title_korean: string;            // 한국어 제목
  difficulty: 'Easy' | 'Medium' | 'Hard';
  
  // 콘텐츠
  description_english: string;      // 영어 문제 설명
  description_korean: string;       // 한국어 문제 설명
  constraints_english: string[];    // 영어 제약조건
  constraints_korean: string[];     // 한국어 제약조건
  examples: any[];                 // 예제 데이터 (JSON)
  
  // 솔루션
  solution_code: string;           // 해결 코드
  solution_language: string;       // 프로그래밍 언어
  explanation_korean?: string;     // 한국어 해설
  approach_korean?: string;        // 한국어 접근법
  time_complexity?: string;        // 시간 복잡도
  space_complexity?: string;       // 공간 복잡도
  
  // 메타데이터
  tags: string[];                  // 알고리즘 태그
  slug: string;                    // URL slug
  leetcode_url?: string;           // LeetCode 원본 링크
  github_url?: string;             // GitHub 소스 링크
  is_premium?: boolean;            // 프리미엄 문제 여부
  acceptance_rate?: number;        // 통과율
  submission_count?: number;       // 제출 횟수
  
  // 시스템
  created_at?: string;
  updated_at?: string;
}
```

### 데이터 품질 체크리스트

- ✅ **필수 필드**: `problem_number`, `title`, `title_korean`, `difficulty`
- ✅ **콘텐츠 완성도**: 설명, 제약조건, 예제 데이터 존재
- ✅ **솔루션 품질**: 코드, 해설, 복잡도 분석 포함
- ✅ **SEO 요소**: slug, tags, 메타데이터 완성

## 🏗️ jin-blog 프로젝트 아키텍처

### 기술 스택
- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Supabase
- **Authentication**: NextAuth.js v4 + Supabase Adapter
- **Real-time**: Liveblocks (협업 기능)
- **Testing**: Vitest + Testing Library
- **Deployment**: Vercel (pnpm 사용)
- **Content**: Markdown + react-markdown

### 프로젝트 구조 (예상)
```
jin-blog/
├── src/
│   ├── app/                     # App Router (Next.js 14)
│   │   ├── blog/
│   │   │   ├── leetcode/        # LeetCode 카테고리
│   │   │   │   ├── [slug]/      # 동적 라우팅
│   │   │   │   └── page.tsx
│   │   │   └── page.tsx
│   │   ├── api/                 # API Routes
│   │   │   ├── leetcode/        # LeetCode 관련 API
│   │   │   └── posts/
│   │   └── globals.css
│   ├── components/              # 재사용 컴포넌트
│   │   ├── leetcode/            # LeetCode 전용 컴포넌트
│   │   │   ├── ProblemCard.tsx
│   │   │   ├── CodeBlock.tsx
│   │   │   ├── ComplexityBadge.tsx
│   │   │   ├── DifficultyBadge.tsx
│   │   │   └── TagList.tsx
│   │   └── common/
│   ├── lib/                     # 유틸리티
│   │   ├── leetcode.ts          # LeetCode 관련 함수
│   │   ├── supabase.ts          # Supabase 클라이언트
│   │   └── seo.ts               # SEO 유틸리티
│   └── types/                   # 타입 정의
│       └── leetcode.ts
├── public/
│   └── images/
│       └── leetcode/            # LeetCode 관련 이미지
└── supabase/                    # Supabase 설정
```

## 🔗 데이터 연동 방법

### 1. Supabase 클라이언트 설정

```typescript
// lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)

// LeetCode 문제 조회 함수
export async function getLeetCodeProblems(filters?: {
  difficulty?: string
  tags?: string[]
  limit?: number
  offset?: number
}) {
  let query = supabase
    .from('leetcode_problems')
    .select('*')
    .order('problem_number', { ascending: true })

  if (filters?.difficulty) {
    query = query.eq('difficulty', filters.difficulty)
  }

  if (filters?.tags && filters.tags.length > 0) {
    query = query.overlaps('tags', filters.tags)
  }

  if (filters?.limit) {
    query = query.limit(filters.limit)
  }

  if (filters?.offset) {
    query = query.range(filters.offset, filters.offset + (filters.limit || 10) - 1)
  }

  const { data, error } = await query

  if (error) throw error
  return data
}

// 특정 문제 조회
export async function getLeetCodeProblem(slug: string) {
  const { data, error } = await supabase
    .from('leetcode_problems')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) throw error
  return data
}
```

### 2. API Routes 구현

```typescript
// app/api/leetcode/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getLeetCodeProblems } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  
  const filters = {
    difficulty: searchParams.get('difficulty') || undefined,
    tags: searchParams.get('tags')?.split(',') || undefined,
    limit: Number(searchParams.get('limit')) || 10,
    offset: Number(searchParams.get('offset')) || 0
  }

  try {
    const problems = await getLeetCodeProblems(filters)
    return NextResponse.json({ problems, success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch problems' }, { status: 500 })
  }
}

// app/api/leetcode/[slug]/route.ts
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const problem = await getLeetCodeProblem(params.slug)
    return NextResponse.json({ problem, success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Problem not found' }, { status: 404 })
  }
}
```

### 3. 환경 변수 설정

```env
# .env.local
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Google Analytics (선택사항)
NEXT_PUBLIC_GA_ID=your_ga_id

# 기타 설정
SITE_URL=https://yourblog.com
```

## 📝 블로그 포스트 생성 전략

### 1. 동적 라우팅 구조

```
/blog/leetcode/[slug]           # 개별 문제 페이지
/blog/leetcode                  # 문제 목록 페이지
/blog/leetcode/difficulty/[level] # 난이도별 분류
/blog/leetcode/tags/[tag]       # 태그별 분류
```

### 2. 페이지 컴포넌트 구조

```typescript
// app/blog/leetcode/[slug]/page.tsx
import { getLeetCodeProblem } from '@/lib/supabase'
import { ProblemHeader } from '@/components/leetcode/ProblemHeader'
import { CodeBlock } from '@/components/leetcode/CodeBlock'
import { ComplexityAnalysis } from '@/components/leetcode/ComplexityAnalysis'

interface Props {
  params: { slug: string }
}

export default async function LeetCodeProblemPage({ params }: Props) {
  const problem = await getLeetCodeProblem(params.slug)

  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      <ProblemHeader 
        title={problem.title_korean}
        titleEn={problem.title}
        difficulty={problem.difficulty}
        tags={problem.tags}
        problemNumber={problem.problem_number}
        leetcodeUrl={problem.leetcode_url}
        githubUrl={problem.github_url}
      />
      
      <section className="prose prose-lg max-w-none">
        <h2>문제 설명</h2>
        <div dangerouslySetInnerHTML={{ __html: problem.description_korean }} />
        
        <h3>제약 조건</h3>
        <ul>
          {problem.constraints_korean.map((constraint, index) => (
            <li key={index}>{constraint}</li>
          ))}
        </ul>
        
        <h3>예제</h3>
        {problem.examples.map((example, index) => (
          <div key={index} className="bg-gray-100 p-4 rounded-lg">
            <strong>입력:</strong> {example.input}<br />
            <strong>출력:</strong> {example.output}<br />
            {example.explanation && (
              <>
                <strong>설명:</strong> {example.explanation}
              </>
            )}
          </div>
        ))}
      </section>

      <section>
        <h2>해결 방법</h2>
        {problem.approach_korean && (
          <div className="mb-6">
            <h3>접근 방식</h3>
            <p>{problem.approach_korean}</p>
          </div>
        )}
        
        <CodeBlock 
          code={problem.solution_code}
          language={problem.solution_language}
        />
        
        <ComplexityAnalysis 
          timeComplexity={problem.time_complexity}
          spaceComplexity={problem.space_complexity}
        />
        
        {problem.explanation_korean && (
          <div>
            <h3>상세 설명</h3>
            <div dangerouslySetInnerHTML={{ __html: problem.explanation_korean }} />
          </div>
        )}
      </section>
    </article>
  )
}

// 메타데이터 생성
export async function generateMetadata({ params }: Props) {
  const problem = await getLeetCodeProblem(params.slug)
  
  return {
    title: `${problem.title_korean} - LeetCode ${problem.problem_number}`,
    description: problem.description_korean.substring(0, 160),
    keywords: ['LeetCode', '알고리즘', '코딩테스트', ...problem.tags].join(', '),
    openGraph: {
      title: problem.title_korean,
      description: problem.description_korean.substring(0, 160),
      type: 'article',
      tags: problem.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: problem.title_korean,
      description: problem.description_korean.substring(0, 160),
    }
  }
}
```

### 3. 재사용 컴포넌트 예시

```typescript
// components/leetcode/ProblemHeader.tsx
interface ProblemHeaderProps {
  title: string
  titleEn: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  tags: string[]
  problemNumber: number
  leetcodeUrl?: string
  githubUrl?: string
}

export function ProblemHeader({ 
  title, titleEn, difficulty, tags, problemNumber, leetcodeUrl, githubUrl 
}: ProblemHeaderProps) {
  const difficultyColors = {
    Easy: 'text-green-600 bg-green-100',
    Medium: 'text-yellow-600 bg-yellow-100',
    Hard: 'text-red-600 bg-red-100'
  }

  return (
    <header className="mb-8">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {title}
          </h1>
          <p className="text-lg text-gray-600">{titleEn}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${difficultyColors[difficulty]}`}>
          {difficulty}
        </span>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map(tag => (
          <span key={tag} className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded">
            {tag}
          </span>
        ))}
      </div>
      
      <div className="flex gap-4 text-sm text-gray-600">
        <span>문제 번호: {problemNumber}</span>
        {leetcodeUrl && (
          <a href={leetcodeUrl} target="_blank" rel="noopener noreferrer" 
             className="text-blue-600 hover:underline">
            LeetCode에서 보기
          </a>
        )}
        {githubUrl && (
          <a href={githubUrl} target="_blank" rel="noopener noreferrer"
             className="text-blue-600 hover:underline">
            GitHub에서 보기
          </a>
        )}
      </div>
    </header>
  )
}

// components/leetcode/CodeBlock.tsx
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism'

interface CodeBlockProps {
  code: string
  language: string
}

export function CodeBlock({ code, language }: CodeBlockProps) {
  const langMap: { [key: string]: string } = {
    'typescript': 'typescript',
    'javascript': 'javascript',
    'python': 'python',
    'java': 'java',
    'cpp': 'cpp',
    'c': 'c'
  }

  return (
    <div className="my-6">
      <div className="bg-gray-800 rounded-t-lg px-4 py-2">
        <span className="text-gray-300 text-sm font-medium">
          {language.toUpperCase()}
        </span>
      </div>
      <SyntaxHighlighter
        language={langMap[language] || 'javascript'}
        style={tomorrow}
        customStyle={{
          margin: 0,
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  )
}
```

## 🔍 SEO 최적화 고려사항

### 1. 메타데이터 최적화

```typescript
// lib/seo.ts
export function generateLeetCodeSEO(problem: LeetCodeProblemRecord) {
  const title = `${problem.title_korean} - LeetCode ${problem.problem_number} 해설`
  const description = `LeetCode ${problem.problem_number}번 "${problem.title_korean}" 문제의 상세한 해설과 ${problem.solution_language} 솔루션입니다. 시간복잡도: ${problem.time_complexity}, 공간복잡도: ${problem.space_complexity}`
  
  return {
    title,
    description,
    keywords: [
      'LeetCode',
      '알고리즘',
      '코딩테스트',
      problem.difficulty,
      problem.solution_language,
      ...problem.tags
    ].join(', '),
    openGraph: {
      title,
      description,
      type: 'article',
      url: `https://yourblog.com/blog/leetcode/${problem.slug}`,
      images: [{
        url: `/api/og/leetcode/${problem.slug}`,
        width: 1200,
        height: 630,
        alt: title
      }]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`/api/og/leetcode/${problem.slug}`]
    },
    alternates: {
      canonical: `https://yourblog.com/blog/leetcode/${problem.slug}`
    }
  }
}
```

### 2. 구조화된 데이터 (JSON-LD)

```typescript
// components/leetcode/StructuredData.tsx
export function LeetCodeStructuredData({ problem }: { problem: LeetCodeProblemRecord }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": problem.title_korean,
    "alternativeHeadline": problem.title,
    "description": problem.description_korean.substring(0, 160),
    "author": {
      "@type": "Person",
      "name": "Your Name"
    },
    "datePublished": problem.created_at,
    "dateModified": problem.updated_at,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://yourblog.com/blog/leetcode/${problem.slug}`
    },
    "publisher": {
      "@type": "Organization",
      "name": "Your Blog",
      "logo": {
        "@type": "ImageObject",
        "url": "https://yourblog.com/logo.png"
      }
    },
    "proficiencyLevel": problem.difficulty,
    "dependencies": problem.tags,
    "programmingLanguage": problem.solution_language
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}
```

### 3. 사이트맵 생성

```typescript
// app/sitemap.ts
import { getLeetCodeProblems } from '@/lib/supabase'

export default async function sitemap() {
  const problems = await getLeetCodeProblems()
  
  const leetcodeUrls = problems.map((problem) => ({
    url: `https://yourblog.com/blog/leetcode/${problem.slug}`,
    lastModified: new Date(problem.updated_at || problem.created_at),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  return [
    {
      url: 'https://yourblog.com',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: 'https://yourblog.com/blog/leetcode',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    ...leetcodeUrls,
  ]
}
```

## ⚡ 성능 최적화

### 1. 데이터 fetching 최적화

```typescript
// lib/cache.ts
import { unstable_cache } from 'next/cache'

// 캐싱된 문제 목록 조회
export const getCachedLeetCodeProblems = unstable_cache(
  async (filters?: any) => {
    return await getLeetCodeProblems(filters)
  },
  ['leetcode-problems'],
  {
    revalidate: 3600, // 1시간 캐시
    tags: ['leetcode']
  }
)

// 캐싱된 개별 문제 조회
export const getCachedLeetCodeProblem = unstable_cache(
  async (slug: string) => {
    return await getLeetCodeProblem(slug)
  },
  ['leetcode-problem'],
  {
    revalidate: 86400, // 24시간 캐시
    tags: ['leetcode']
  }
)
```

### 2. 이미지 최적화

```typescript
// components/leetcode/ProblemImage.tsx
import Image from 'next/image'

interface ProblemImageProps {
  problemNumber: number
  title: string
}

export function ProblemImage({ problemNumber, title }: ProblemImageProps) {
  return (
    <div className="relative w-full h-64 mb-6">
      <Image
        src={`/images/leetcode/problem-${problemNumber}.png`}
        alt={`${title} 문제 다이어그램`}
        fill
        className="object-contain"
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
        priority={true}
      />
    </div>
  )
}
```

### 3. 코드 분할

```typescript
// 동적 import를 사용한 컴포넌트 lazy loading
import dynamic from 'next/dynamic'

const CodeBlock = dynamic(() => import('@/components/leetcode/CodeBlock'), {
  loading: () => <div className="animate-pulse bg-gray-200 h-64 rounded"></div>
})

const ComplexityAnalysis = dynamic(() => import('@/components/leetcode/ComplexityAnalysis'), {
  ssr: false // 클라이언트 사이드에서만 렌더링
})
```

## 📚 콘텐츠 관리 전략

### 1. 콘텐츠 카테고리화

```typescript
// lib/categories.ts
export const DIFFICULTY_CATEGORIES = {
  'Easy': {
    label: '쉬움',
    color: 'green',
    description: '기본적인 알고리즘과 자료구조 문제'
  },
  'Medium': {
    label: '보통',
    color: 'yellow',
    description: '중간 수준의 알고리즘 문제'
  },
  'Hard': {
    label: '어려움',
    color: 'red',
    description: '고급 알고리즘과 최적화가 필요한 문제'
  }
}

export const TAG_CATEGORIES = {
  'Array': '배열',
  'String': '문자열',
  'Hash Table': '해시 테이블',
  'Dynamic Programming': '동적 프로그래밍',
  'Two Pointers': '투 포인터',
  'Binary Search': '이진 탐색',
  'Tree': '트리',
  'Graph': '그래프',
  // ... 더 많은 태그들
}
```

### 2. 검색 및 필터링

```typescript
// components/leetcode/ProblemFilter.tsx
export function ProblemFilter({ onFilterChange }: { onFilterChange: (filters: any) => void }) {
  const [filters, setFilters] = useState({
    difficulty: '',
    tags: [],
    language: ''
  })

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <select 
          value={filters.difficulty}
          onChange={(e) => {
            const newFilters = { ...filters, difficulty: e.target.value }
            setFilters(newFilters)
            onFilterChange(newFilters)
          }}
          className="border rounded px-3 py-2"
        >
          <option value="">모든 난이도</option>
          <option value="Easy">쉬움</option>
          <option value="Medium">보통</option>
          <option value="Hard">어려움</option>
        </select>
        
        {/* 태그 다중 선택 */}
        <TagSelector 
          selectedTags={filters.tags}
          onTagChange={(tags) => {
            const newFilters = { ...filters, tags }
            setFilters(newFilters)
            onFilterChange(newFilters)
          }}
        />
        
        {/* 언어 필터 */}
        <select 
          value={filters.language}
          onChange={(e) => {
            const newFilters = { ...filters, language: e.target.value }
            setFilters(newFilters)
            onFilterChange(newFilters)
          }}
          className="border rounded px-3 py-2"
        >
          <option value="">모든 언어</option>
          <option value="typescript">TypeScript</option>
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
        </select>
      </div>
    </div>
  )
}
```

### 3. 관련 문제 추천 시스템

```typescript
// lib/recommendations.ts
export async function getRelatedProblems(currentProblem: LeetCodeProblemRecord, limit = 5) {
  // 태그 기반 추천
  const { data: tagBasedProblems } = await supabase
    .from('leetcode_problems')
    .select('*')
    .overlaps('tags', currentProblem.tags)
    .neq('id', currentProblem.id)
    .limit(limit)

  // 난이도 기반 추천
  const { data: difficultyBasedProblems } = await supabase
    .from('leetcode_problems')
    .select('*')
    .eq('difficulty', currentProblem.difficulty)
    .neq('id', currentProblem.id)
    .limit(limit)

  // 중복 제거 및 점수 기반 정렬
  const relatedProblems = [...tagBasedProblems || [], ...difficultyBasedProblems || []]
    .filter((problem, index, self) => 
      index === self.findIndex(p => p.id === problem.id)
    )
    .slice(0, limit)

  return relatedProblems
}
```

## 🚀 배포 및 CI/CD 고려사항

### 1. Vercel 배포 설정

```javascript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['yourblog.com'],
    formats: ['image/webp', 'image/avif'],
  },
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
  async redirects() {
    return [
      {
        source: '/leetcode/:slug',
        destination: '/blog/leetcode/:slug',
        permanent: true,
      },
    ]
  },
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Cache-Control', value: 's-maxage=3600, stale-while-revalidate' },
        ],
      },
    ]
  },
}

module.exports = nextConfig
```

### 2. GitHub Actions 워크플로우

```yaml
# .github/workflows/deploy.yml
name: Deploy to Vercel

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

env:
  VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
  VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}

jobs:
  Deploy-Production:
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v4
      - name: Install Vercel CLI
        run: npm install --global vercel@latest
      - name: Pull Vercel Environment Information
        run: vercel pull --yes --environment=production --token=${{ secrets.VERCEL_TOKEN }}
      - name: Build Project Artifacts
        run: vercel build --prod --token=${{ secrets.VERCEL_TOKEN }}
      - name: Deploy Project Artifacts to Vercel
        run: vercel deploy --prebuilt --prod --token=${{ secrets.VERCEL_TOKEN }}
      - name: Clear Cache
        run: |
          curl -X POST "https://api.vercel.com/v1/deployments/$VERCEL_DEPLOYMENT_ID/cache/clear" \
          -H "Authorization: Bearer ${{ secrets.VERCEL_TOKEN }}"
```

### 3. 데이터 동기화 스크립트

```typescript
// scripts/sync-leetcode-data.ts
import { createClient } from '@supabase/supabase-js'

async function syncLeetCodeData() {
  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  try {
    // 최근 업데이트된 문제들 확인
    const { data: updatedProblems } = await supabase
      .from('leetcode_problems')
      .select('*')
      .gte('updated_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString())

    console.log(`${updatedProblems?.length || 0}개의 업데이트된 문제 발견`)

    // 캐시 무효화
    await fetch('/api/revalidate', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.REVALIDATE_TOKEN}`
      },
      body: JSON.stringify({
        tags: ['leetcode']
      })
    })

    console.log('캐시 무효화 완료')
  } catch (error) {
    console.error('데이터 동기화 실패:', error)
    process.exit(1)
  }
}

syncLeetCodeData()
```

## 🔧 문제 해결 및 디버깅

### 1. 공통 에러 처리

```typescript
// lib/error-handling.ts
export class LeetCodeError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode: number = 500
  ) {
    super(message)
    this.name = 'LeetCodeError'
  }
}

export function handleSupabaseError(error: any) {
  if (error.code === 'PGRST116') {
    throw new LeetCodeError('문제를 찾을 수 없습니다', 'PROBLEM_NOT_FOUND', 404)
  }
  
  if (error.code === '23505') {
    throw new LeetCodeError('중복된 문제입니다', 'DUPLICATE_PROBLEM', 409)
  }
  
  throw new LeetCodeError('데이터베이스 오류가 발생했습니다', 'DATABASE_ERROR', 500)
}

// components/ErrorBoundary.tsx
'use client'

import { useEffect } from 'react'

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('LeetCode 페이지 오류:', error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">문제가 발생했습니다</h2>
        <p className="text-gray-600 mb-6">
          LeetCode 문제를 불러오는 중 오류가 발생했습니다.
        </p>
        <button
          onClick={reset}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          다시 시도
        </button>
      </div>
    </div>
  )
}
```

### 2. 개발 도구

```typescript
// lib/dev-tools.ts (개발 환경에서만 사용)
export function enableLeetCodeDevTools() {
  if (process.env.NODE_ENV === 'development') {
    // @ts-ignore
    window.leetcodeDebug = {
      async testProblem(slug: string) {
        const response = await fetch(`/api/leetcode/${slug}`)
        const data = await response.json()
        console.log('Problem data:', data)
        return data
      },
      
      async clearCache() {
        await fetch('/api/revalidate', {
          method: 'POST',
          body: JSON.stringify({ tags: ['leetcode'] })
        })
        console.log('Cache cleared')
      }
    }
  }
}
```

### 3. 모니터링 및 로깅

```typescript
// lib/analytics.ts
export function trackLeetCodeView(problemNumber: number, title: string) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'leetcode_problem_view', {
      problem_number: problemNumber,
      problem_title: title,
      page_title: document.title,
      page_location: window.location.href
    })
  }
}

export function trackLeetCodeFilter(filters: any) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'leetcode_filter_applied', {
      difficulty: filters.difficulty,
      tags: filters.tags?.join(','),
      language: filters.language
    })
  }
}
```

## 📋 체크리스트

### 프로젝트 설정
- [ ] Supabase 클라이언트 설정 완료
- [ ] 환경 변수 (.env.local) 설정
- [ ] 타입 정의 파일 생성
- [ ] API Routes 구현

### UI/UX 개발
- [ ] 문제 목록 페이지 구현
- [ ] 개별 문제 페이지 구현
- [ ] 필터 및 검색 기능
- [ ] 반응형 디자인 적용
- [ ] 다크 모드 지원 (선택사항)

### SEO 최적화
- [ ] 메타데이터 최적화
- [ ] 구조화된 데이터 추가
- [ ] 사이트맵 생성
- [ ] OG 이미지 생성 API
- [ ] 페이지 속도 최적화

### 성능 최적화
- [ ] 데이터 캐싱 전략 구현
- [ ] 이미지 최적화
- [ ] 코드 분할 (lazy loading)
- [ ] Bundle 크기 최적화

### 배포 및 모니터링
- [ ] Vercel 배포 설정
- [ ] CI/CD 파이프라인 구축
- [ ] 에러 모니터링 설정
- [ ] 성능 모니터링 설정
- [ ] Google Analytics 연동

### 품질 보증
- [ ] 타입 안정성 검증
- [ ] 에러 처리 구현
- [ ] 접근성 검증 (a11y)
- [ ] 브라우저 호환성 테스트
- [ ] 모바일 최적화 확인

---

이 가이드를 참고하여 jin-blog 프로젝트에서 LeetCode 데이터를 효과적으로 활용한 고품질 블로그 시스템을 구축하시기 바랍니다. 추가 질문이나 특정 부분에 대한 상세한 구현 방법이 필요하시면 언제든 문의해 주세요.