# Claude Code 프로젝트 설정

## 언어 및 의사소통 설정

### 기본 언어
- **주 언어**: 한국어 (Korean)
- **모든 할일(Todo) 작성**: 한국어로 작성
- **진행 상황 및 중간 설명**: 한국어로 작성
- **기술 용어**: 영어 + 한국어 병기 (예: "컴포넌트(Component)")

### 할일 관리 언어 설정
- TodoWrite 도구 사용 시 모든 content는 한국어로 작성
- 진행 상황 업데이트 메시지도 한국어로 작성
- 작업 완료 확인 메시지도 한국어로 작성

### 문서화 및 설명 언어
- 프로젝트 분석 및 설명: 한국어
- 코드 주석: 한국어 (필요시)
- 에러 메시지 설명: 한국어
- 개선 제안사항: 한국어

## 프로젝트 정보

### 프로젝트 개요
- **프로젝트명**: Jin's Next.js Blog
- **타입**: 개인 블로그 플랫폼 (실시간 협업 기능 지원)
- **주요 기술**: Next.js 15, React 19, TypeScript, Supabase, Liveblocks
- **테스팅**: Vitest + Testing Library
- **스타일링**: Tailwind CSS + Framer Motion
- **UI 컴포넌트**: Radix UI + shadcn/ui

### 주요 명령어
```bash
# 개발 서버 실행
pnpm dev

# 빌드
pnpm build

# 프로덕션 실행
pnpm start

# 테스트 실행
pnpm test

# UI 테스트 실행
pnpm test:ui

# CI용 테스트 실행
pnpm test:ci

# 린트 검사
pnpm lint

# Husky 설정 (Git hooks)
pnpm prepare
```

### 개발 환경 설정
- **패키지 매니저**: pnpm (권장)
- **Node.js 환경**: LTS 버전 (20.x+)
- **TypeScript**: strict 모드, v5.9.2
- **코드 품질**: ESLint + Prettier + Husky (Git hooks)
- **테스팅**: Vitest + @testing-library/react
- **번들 분석**: @next/bundle-analyzer
- **의존성 관리**: pnpm-lock.yaml 사용

### 핵심 라이브러리

#### 상태 관리
- **Zustand**: 클라이언트 상태 관리
- **TanStack Query**: 서버 상태 관리 (v5.84.1)
- **Immer**: 불변성 관리

#### UI/UX
- **Radix UI**: 접근성 중심의 컴포넌트 프리미티브
- **Framer Motion**: 애니메이션 및 전환 효과
- **Lucide React**: 아이콘 시스템
- **React Icons**: 추가 아이콘 라이브러리

#### 에디터 & 마크다운
- **@uiw/react-md-editor**: 마크다운 에디터
- **react-markdown**: 마크다운 렌더링
- **react-syntax-highlighter**: 코드 하이라이팅

#### 협업 & 실시간
- **Liveblocks**: 실시간 협업 (v3.2.1)
  - @liveblocks/client
  - @liveblocks/react
  - @liveblocks/react-ui
  - @liveblocks/node

## 작업 가이드라인

### 코드 작성 시
- **TypeScript 타입 안전성** 유지 (strict 모드)
- **기존 코드 스타일** 및 패턴 준수
- **컴포넌트 재사용성** 고려 (COMPONENT-PATTERNS.md 참고)
- **성능 최적화** 고려 (React 19 기능 활용)
- **접근성(a11y)** 고려 (Radix UI 패턴 준수)
- **Git 커밋 컨벤션** 준수 (Husky pre-commit hooks)

### 개발 워크플로우
```bash
# 의존성 설치
pnpm install

# 개발 서버 시작
pnpm dev

# 코드 검사 및 수정
pnpm lint

# 테스트 실행
pnpm test

# 빌드 테스트
pnpm build
```

### 파일 구조 준수
```
src/
├── app/                  # Next.js 15 App Router
│   ├── (private)/       # 인증 필요한 페이지
│   ├── (public)/        # 공개 페이지
│   └── api/             # API Routes
├── components/          # 재사용 가능한 컴포넌트
│   ├── auth/           # 인증 관련
│   ├── common/         # 공통 컴포넌트
│   ├── editor/         # 에디터 관련
│   ├── liveblocks/     # 실시간 협업 관련
│   ├── post/           # 포스트 관련
│   ├── template/       # 템플릿 컴포넌트
│   └── ui/             # shadcn/ui 컴포넌트
├── service/            # 비즈니스 로직 및 API
│   ├── api/            # API 서비스
│   └── queries/        # React Query 쿼리
├── types/              # TypeScript 타입 정의
├── hooks/              # 커스텀 훅
├── store/              # Zustand 스토어
├── lib/                # 유틸리티 라이브러리
├── utils/              # 헬퍼 함수
├── constants/          # 상수 정의
├── context/            # React Context
├── fixtures/           # 테스트 데이터
├── repositories/       # 데이터 레이어
└── styles/             # 전역 스타일
```

### 데이터베이스 및 인증
- **Supabase PostgreSQL**: 메인 데이터베이스
- **NextAuth.js v4.24.10**: 인증 시스템
- **@auth/supabase-adapter**: Supabase 어댑터 (v1.7.4)
- **실시간 기능**: Liveblocks v3.2.1 (댓글, 협업)

### 환경 변수 설정

다음 환경 변수들이 `.env.local`에 설정되어 있어야 합니다:
```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

# NextAuth.js
NEXTAUTH_SECRET=
NEXTAUTH_URL=

# Liveblocks
NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY=
LIVEBLOCKS_SECRET_KEY=
```

### 개발 참고 문서
- **컴포넌트 개발**: [COMPONENT-PATTERNS.md](./COMPONENT-PATTERNS.md)
- **LeetCode 통합**: [BLOG_INTEGRATION_GUIDE.md](./BLOG_INTEGRATION_GUIDE.md)
- **디자인 시스템**: [DESIGN_GUIDE.md](./DESIGN_GUIDE.md)
- **정보 구조**: [INFORMATION_ARCHITECTURE.md](./INFORMATION_ARCHITECTURE.md)

---

*이 파일은 Claude Code가 프로젝트 컨텍스트를 이해하고 한국어로 소통하기 위한 설정입니다.*