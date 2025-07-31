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
- **타입**: 개인 블로그 플랫폼
- **주요 기술**: Next.js 15, React 19, TypeScript, Supabase, Liveblocks

### 주요 명령어
```bash
# 개발 서버 실행
yarn dev

# 빌드
yarn build

# 테스트 실행
yarn test

# 린트 검사
yarn lint
```

### 개발 환경 설정
- Node.js 환경
- Yarn 패키지 매니저 사용
- TypeScript strict 모드
- ESLint + Prettier 코드 품질 관리

## 작업 가이드라인

### 코드 작성 시
- TypeScript 타입 안전성 유지
- 기존 코드 스타일 및 패턴 준수
- 컴포넌트 재사용성 고려
- 성능 최적화 고려

### 파일 구조 준수
- src/app/ - App Router 구조 유지
- src/components/ - 재사용 가능한 컴포넌트
- src/service/ - 비즈니스 로직 및 API
- src/types/ - TypeScript 타입 정의

### 데이터베이스
- Supabase PostgreSQL 사용
- 인증: NextAuth.js + Supabase Adapter
- 실시간 기능: Liveblocks

---

*이 파일은 Claude Code가 프로젝트 컨텍스트를 이해하고 한국어로 소통하기 위한 설정입니다.*