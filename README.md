# Jin's Dev Log

## Next.js 14로 개발된 개인 블로그 입니다

### Version 1

- md file로 블로그 글을 생성 후 빌드, 배포 과정을 통해서 블로그 글 퍼블리싱 하였습니다.
- 나만의 공간에서 회고록 및 개발 일지를 작성하여 지식을 공유하고 성장하고자 제작 하였습니다.
- SEO 최적화 기법 활용 및 Google Analytics와 Google Search Console을 사용하여 사이트 사용자 추적 및 색인 생성 경험을 쌓았습니다.
- vercel을 통한 CI/CD 경험

### Version 2

- 블로그 Version 1에서 수동적인 글 생성에 불편을 느껴서 블로그를 개선하였습니다.
- 수동적인 글 생성에서 에디터 기능 추가로 글 생성에 대한 사용성 개선을 통해서 기술을 통한 사용자 경험의 중요성에 대해서 느꼈습니다.

## Tech Requirement (Tech Stack)

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

### Development Tools

- husky
- Github Actions
- ESlint
- Prettier
- Yarn

### Infrastructure

- Vercel

### Architecture

## Style

- [CodeBucks](https://www.youtube.com/watch?v=Yw7yWHigGKI&list=WL&index=22)님의 유튜브 영상을 참고하여 홈페이지와 소개 페이지를 제작
- [Next.js Starter Blog](https://tailwind-nextjs-starter-blog.vercel.app/)의 소스코드를 활용하여 게시물 목록 및 상세 페이지 구현

## Node Version

- 20.9.0

## 실행하기

```shell
yarn install

yarn dev
```

## 주의사항

- 이 프로젝트를 실행하기 위해서는 Supabase와 NextAuth 관련 환경 변수 파일이 필요합니다
