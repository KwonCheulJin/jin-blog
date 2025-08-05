# Jin's Next.js Blog

Jin's Next.js Blog는 **Next.js 15**와 **React 19**로 개발된 모던 개인 블로그 플랫폼입니다.

## 🚀 프로젝트 개요

이 블로그는 개인의 성장과 지식 공유를 목적으로 제작되었습니다. 주요 특징은 다음과 같습니다:

- **실시간 협업**: Liveblocks를 활용한 댓글 및 실시간 커서 기능
- **보안 강화**: Supabase RLS, 파일 업로드 검증, XSS 방어 등 다층 보안 시스템
- **OAuth 인증**: Google, GitHub OAuth를 통한 안전한 로그인
- **마크다운 에디터**: 실시간 미리보기와 문법 하이라이팅 지원
- **SEO 최적화**: Next.js App Router와 동적 sitemap 생성
- **Vercel Analytics**: 성능 모니터링 및 사용자 분석

## 아키텍쳐

![architecture](https://github.com/user-attachments/assets/e963f5c8-c7ac-4ff0-b636-6837de82feba)

## 📋 버전 히스토리

### Version 3.0 (Latest)

- **Next.js 15 & React 19** 업그레이드
- **보안 시스템 강화**: RLS 정책, 파일 업로드 검증, XSS 방어
- **실시간 협업 기능**: Liveblocks 통합
- **패키지 매니저 변경**: yarn → pnpm
- **Claude Code 통합**: AI 기반 개발 워크플로우
- **TypeScript 안정성**: 엄격한 타입 체크

### Version 2.0

- 에디터 기능 추가로 글 작성 사용성 개선
- 기술을 통한 사용자 경험 향상에 중점

### Version 1.0

- Markdown 파일을 사용한 블로그 글 생성 및 퍼블리싱
- 빌드 및 배포 과정을 통한 콘텐츠 관리

## 🛠 기술 스택

### Frontend

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript 5.8
- **UI Library**: React 19
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Editor**: @uiw/react-md-editor
- **Markdown**: react-markdown, rehype-sanitize (XSS 방어)
- **State Management**: Zustand, TanStack Query
- **Real-time**: Liveblocks (댓글, 커서)
- **Icons**: Lucide React, React Icons

### Backend & Database

- **API**: Next.js API Routes
- **Database**: Supabase (PostgreSQL)
- **Authentication**: NextAuth.js (Google, GitHub OAuth)
- **Storage**: Supabase Storage (이미지 업로드)
- **Security**: Supabase RLS, JWT 토큰

### Development Tools

- **Package Manager**: pnpm
- **Linting**: ESLint, Prettier
- **Testing**: Vitest, Testing Library
- **Git Hooks**: Husky
- **Type Checking**: TypeScript strict mode
- **AI Assistant**: Claude Code

### Infrastructure & Monitoring

- **Hosting**: Vercel
- **Analytics**: Vercel Analytics, Speed Insights
- **CI/CD**: GitHub Actions + Vercel
- **Security**: HTTPS, Secure Cookies

## 🔧 개발 환경 설정

### 필요 조건

- **Node.js**: 20.9.0 이상
- **Package Manager**: pnpm (권장)
- **Database**: Supabase 계정
- **OAuth Apps**: Google, GitHub OAuth 앱 설정

### 환경 변수 설정

프로젝트 루트에 `.env.local` 파일을 생성하고 다음 변수들을 설정하세요:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
SUPABASE_JWT_SECRET=your_jwt_secret

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret

# OAuth Providers
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GITHUB_ID=your_github_id
GITHUB_SECRET=your_github_secret

# Liveblocks
LIVEBLOCKS_SECRET_KEY=your_liveblocks_secret_key
```

### 설치 및 실행

```bash
# 의존성 설치
pnpm install

# 개발 서버 실행
pnpm dev

# 빌드
pnpm build

# 테스트 실행
pnpm test

# 린트 검사
pnpm lint
```

## 🔒 보안 설정

이 프로젝트는 다층 보안 시스템을 구현하고 있습니다:

- **Supabase RLS**: 행 수준 보안 정책
- **파일 업로드 검증**: MIME 타입 및 크기 제한
- **XSS 방어**: HTML 살균 처리
- **OAuth 전용**: 안전한 소셜 로그인
- **JWT 토큰**: 서명된 토큰 검증

자세한 보안 설정은 [`SECURITY_SETUP.md`](./SECURITY_SETUP.md)를 참조하세요.

## 📁 프로젝트 구조

```
src/
├── app/              # Next.js App Router
│   ├── (public)/     # 공개 페이지
│   ├── api/          # API 라우트
│   └── write/        # 글 작성 페이지 (인증 필요)
├── components/       # 재사용 가능한 컴포넌트
├── context/          # React Context
├── service/          # 비즈니스 로직
├── types/            # TypeScript 타입 정의
└── utils/            # 유틸리티 함수
```

## 🎨 디자인 참고

- [CodeBucks](https://www.youtube.com/watch?v=Yw7yWHigGKI)님의 유튜브 영상 참고 (홈페이지 및 소개 페이지)
- [Next.js Starter Blog](https://tailwind-nextjs-starter-blog.vercel.app/) 소스코드 활용 (게시물 목록 및 상세 페이지)

## 🚀 배포

이 프로젝트는 Vercel에 자동 배포됩니다:

1. `dev` 브랜치에 푸시
2. Vercel이 자동으로 빌드 및 배포
3. 프리뷰 URL 생성
4. 테스트 후 `main` 브랜치로 병합

## 📄 라이선스

이 프로젝트는 개인 포트폴리오 목적으로 제작되었습니다.
