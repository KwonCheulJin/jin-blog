# Jin's Dev Log

Jin's Dev Log는 Next.js 14로 개발된 개인 블로그 프로젝트입니다.

## 프로젝트 개요

이 블로그는 개인의 성장과 지식 공유를 목적으로 제작되었습니다. 주요 특징은 다음과 같습니다:

- 회고록 및 개발 일지 작성을 통한 지식 공유
- SEO 최적화 및 Google Analytics, Google Search Console 활용
- Vercel을 통한 CI/CD 구현

## 버전 히스토리

### Version 1

- Markdown 파일을 사용한 블로그 글 생성 및 퍼블리싱
- 빌드 및 배포 과정을 통한 콘텐츠 관리

### Version 2

- 에디터 기능 추가로 글 작성 사용성 개선
- 기술을 통한 사용자 경험 향상에 중점

## 기술 스택

### Front-End

- Next.js
- TypeScript
- Tailwindcss
- react-md-editor
- react-markdown
- Framer-Motion
- liveblocks

### Back-End

- Next.js Api Route
- supabase
- Auth.js

### 개발 도구

- husky
- Github Actions
- ESlint
- Prettier
- Yarn

### 인프라

- Vercel

### 아키텍쳐
![architecture](https://github.com/user-attachments/assets/e963f5c8-c7ac-4ff0-b636-6837de82feba)

## 디자인 참고

- [CodeBucks](https://www.youtube.com/watch?v=Yw7yWHigGKI&list=WL&index=22)님의 유튜브 영상을 참고(홈페이지 및 소개 페이지)
- [Next.js Starter Blog](https://tailwind-nextjs-starter-blog.vercel.app/)의 소스코드를 활용(게시물 목록 및 상세 페이지)

## Node Version

- 20.9.0

## 실행하기

```shell
yarn install

yarn dev
```

## 주의사항

- 이 프로젝트를 실행하기 위해서는 Supabase와 NextAuth 관련 환경 변수 파일이 필요합니다
