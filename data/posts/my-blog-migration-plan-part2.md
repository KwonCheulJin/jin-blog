---
title: 글 작성이 불편한 블로그를 개선 해보자 Part.2
date: '2023-11-16'
category: 블로그, NextAuth, Supabase, OAuth, 로그인, Login
description: NextAuth와 Supabase 활용한 OAuth 로그인 기능 추가
path: my-blog-migration-plan-part2
image: my-blog-migration-plan-part2
featured: true
---

## 로그인 기능을 추가해 보자

먼저 로그인에 필요한 라이브러리를 설치 해준다.

```bash
yarn add next-auth @supabase/supabase-js @auth/supabase-adapter
```

NextAuth를 사용하기 위해서는 아래와 같이 해당 경로에 `route.ts`를 만들어서 `handler`를 작성해줘야 한다.

```ts:src/app/api/auth/[...nextauth]/route.ts
import { SupabaseAdapter } from '@auth/supabase-adapter';
import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';

const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? '',
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),
  ],
  adapter: SupabaseAdapter({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
    secret: process.env.SUPABASE_SERVICE_ROLE_KEY ?? '',
  }),
});

export { handler as GET, handler as POST };
```

각각의 Provider를 사용하기 위해서는 `clientId`와 `clientSecret`가 필요하다

### GitHubProvider

![GitHub-Provider-Settings-1.webp](/images/my-blog-migration-plan-part2/GitHub-Provider-Settings-1.webp)
`GitHubProvider`를 연결하기 위해서는 내 계정의 GitHub에서 `Settings -> Developer Settings -> OAuth Apps`로 이동해서 `New OAuth App`을 클릭하면 아래와 같은 생성 화면에서 필요한 내용을 채워주기만 하면 된다.

마지막의 `Authorization callback URL`에 들어가는 `callback URL`은 `api/auth/callback/github`로 작성해줘야 `next-auth`가 제공하는 `callback URL`을 사용할 수 있다.
![GitHub-Provider-Settings-2.webp](/images/my-blog-migration-plan-part2/GitHub-Provider-Settings-2.webp)
그 다음 `clientId`와 `clientSecret`은 생성해서 해당 키를 프로젝트의 `.env`파일에 작성해주면 끝이다.
![GitHub-Provider-Settings-3.webp](/images/my-blog-migration-plan-part2/GitHub-Provider-Settings-3.webp)
![GitHub-Provider-Settings-4.webp](/images/my-blog-migration-plan-part2/GitHub-Provider-Settings-4.webp)

### GoogleProvider

`GoogleProvider`는 [Google Cloud](https://console.cloud.google.com/)의 `API 및 서비스`에서 `사용자 인증 정보 만들기`를 통해서 `clientId`와 `clientSecret`를 생성할 수 있다.

사진의 순서대로 작성해서 `GitHubProvider`와 마찬가지로 `.env`파일에 `clientId`와 `clientSecret` 키를 작성해주면 된다.
![Google-Provider-Settings-1.webp](/images/my-blog-migration-plan-part2/Google-Provider-Settings-1.webp)
![Google-Provider-Settings-2.webp](/images/my-blog-migration-plan-part2/Google-Provider-Settings-2.webp)
![Google-Provider-Settings-3.webp](/images/my-blog-migration-plan-part2/Google-Provider-Settings-3.webp)
![Google-Provider-Settings-4.webp](/images/my-blog-migration-plan-part2/Google-Provider-Settings-4.webp)
![Google-Provider-Settings-5.webp](/images/my-blog-migration-plan-part2/Google-Provider-Settings-5.webp)
![Google-Provider-Settings-6.webp](/images/my-blog-migration-plan-part2/Google-Provider-Settings-6.webp)

### Supabase NextAuth Schema Setup

내가 `Supabase`를 사용하게 된 이유이기도 한데 `NextAuth`를 사용하면서 사용자의 타입을 통해서 기능 사용을 분리해야 하는 부분이 필요했는데 `Supabase SQL Editor`에서 `NextAuth Schema Setup`을 간편하게 할 수 있는 `Quickstarts`기능이 있기 때문이다.

버튼 몇번 클릭이면 `NextAuth`를 위한 테이블이 생성이 되고 내가 필요한 컬럼만 추가하면 된다.

![supabase-quickstarts-next-auth-1.webp](/images/my-blog-migration-plan-part2/supabase-quickstarts-next-auth-1.webp)
![supabase-quickstarts-next-auth-2.webp](/images/my-blog-migration-plan-part2/supabase-quickstarts-next-auth-2.webp)
![supabase-quickstarts-next-auth-3.webp](/images/my-blog-migration-plan-part2/supabase-quickstarts-next-auth-3.webp)
![supabase-quickstarts-next-auth-4.webp](/images/my-blog-migration-plan-part2/supabase-quickstarts-next-auth-4.webp)

### Supabase Adapter

`Supabase Adapter`를 사용하기 위해서는 `SUPABASE_URL`과 `SUPABASE_SERVICE_ROLE_KEY`가 필요한데 해당 값은
`Supabase Dashboard -> API Settings`에서 확인할 수 있다.

![Supabase-Adapter-Settings.webp](/images/my-blog-migration-plan-part2/Supabase-Adapter-Settings.webp)

위와 같이 `Provider`와 `Adapter`설정이 끝나면 `NextAuth`를 사용하기 위해 `SessionProvider`로 전역으로 랩핑을 해줘야한다.

```ts:src/context/Providers.tsx
'use client';

import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {children}
      </ThemeProvider>
    </SessionProvider>
  );
}
```

```ts:src/app/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <meta
        name="theme-color"
        media="(prefers-color-scheme: light)"
        content="#fff"
      />
      <meta
        name="theme-color"
        media="(prefers-color-scheme: dark)"
        content="#000"
      />
      <ManageScript />
      <ScrollUp />
      <body
        className={cn(
          'min-h-screen w-full bg-light font-mont dark:bg-dark',
          fontSans.variable,
        )}
      >
        <Providers>
          <Header />
          <main className="flex min-h-screen w-full items-center text-dark dark:text-light">
            {children}
          </main>
          <Footer />
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
```

모든 셋팅을 마치고 나의 경우는 `vercel`을 통해서 배포를 하는데 `main` 브랜치에 머지되지 않은 브랜치의 경우 `preview Deployments`를 지원한다.

로그인이 잘 되는지 확인하기 위해서 `feat-add-editor`브랜치를 반영 해보았고 아래와 같은 에러가 빌드시에 발생하였다.

### Deployment Building Error

첫번째 에러는 `Editor` 추가 및 포스트 테마를 바꾸기 위해서 라이브러리를 추가로 설치를 많이 하였는데 그 과정에서 `yarn.lock`과 `node_modules`에 문제가 발생했었던 것 같다.
그래서 `yarn.lock`과 `node_modules`를 삭제하고 다시 `yarn install`을 해주고 난 뒤에는 해당 에러는 발생하지 않았다.
![Deployment-Building-Error-2.webp](/images/my-blog-migration-plan-part2/Deployment-Building-Error-2.webp)

두번째 에러는 `vercel`에서 내 프로젝트 `Settings`에서 `NEXT_PUBLIC_SUPABASE_URL`와 `SUPABASE_SERVICE_ROLE_KEY`를 환경변수 설정을 해주지 않아서 발생했던 문제였다.
![Deployment-Building-Error-1.webp](/images/my-blog-migration-plan-part2/Deployment-Building-Error-1.webp)
해당 에러는 아래에 환경변수 설정을 한뒤 정상적으로 배포가 완료되었다.
![Environment-Variables.webp](/images/my-blog-migration-plan-part2/Environment-Variables.webp)

### 로그인 기능 완성!

![login-feature.gif](/images/my-blog-migration-plan-part2/login-feature.gif)

## 이후 계획

1. Post List Style 수정 작업
2. 글 저장을 위한 테이블 추가
3. 이미지 저장을 위한 스토리지 추가
4. Editor에서 이미지 업로드 기능
5. 검색 기능
6. 페이지네이션 기능
7. 태그 기능
8. ToC(Table of Contents) 기능
9. 기존 작성된 포스트 데이터베이스에 이전 작업
10. 단위 테스트 코드 추가

아직도 해야 할 부분이 많이 남긴했다.

조금씩이라도 기능 구현하면서 테스트 코드도 작성할 생각이다. 간단한 컴포넌트부터 차근차근 추가해봐야겠다.

짜잘한 에러들이 조금은 있었지만 아직까지는 그래도 큰 어려움없이 잘 진행되고 있는 것 같아서 다행이다.

매일 계획한 2~3시간씩 꾸준히 진행해야겠다.

## 참고

- [Getting Started](https://next-auth.js.org/getting-started/example)
- [@auth/supabase-adapter](https://authjs.dev/reference/adapter/supabase)
- [Authenticate Users with Google and Next Auth in Next.JS 13](https://youtu.be/A53T9_V8aFk?si=HQ6FXCAhFUwE7pL_)
- [Save and Manage Next-Auth Session and Users with SupaBase Adapter](https://youtu.be/ogrnOefwGnA?si=8Ai7XvNwpWbeUxLg)
