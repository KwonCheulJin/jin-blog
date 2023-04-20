---
title: Next.js 13 - 외부 스크립트 설정 방법
date: '2023-04-20'
category: Next.js 13, google tag manager, 구글 태그 매니저, 외부 스크립트, script
description: gtag 설정, tailwindcss dark Theme 스크립트, 구글 에드센스 스크립트 추가
path: next-13-google-tag-manager-settings
image: next.js-13
featured: true
---

## Next.js 13(beta)에서 외부 스크립트 설정 방법

### ~ Next.js 12

이전 버전에서는 모든 경로에 대해 타사 스크립트를 로드하려면 다음 `next/script`에서 직접 스크립트를 가져와서 `pages/_app.js`에 포함해야 했다.

```tsx
import Script from 'next/script'

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Script src="https://example.com/script.js" />
      <Component {...pageProps} />
    </>
  )
}
```

13 버전에서 에서는 모든 경로에 대해 타사 스크립트를 로드하려면 `next/script`스크립트를 가져와서 루트 레이아웃에 직접 포함하면 된다.

### Next.js 13 ~

`src/app/layout.tsx`

```tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={mont.className}>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GTM_ID}`}
      />
      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${GTM_ID}');
        `}
      </Script>
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5738419932125263"
        crossOrigin="anonymous"
      ></Script>
      <Script id="theme-switcher" strategy="beforeInteractive">
        {`if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark')
          } else {
            document.documentElement.classList.remove('dark')
          }`}
      </Script>
      <body className="font-mont bg-light w-full min-h-screen dark:bg-dark">
        <ScrollUp />
        <Header />
        <main className="flex items-center text-dark w-full min-h-screen dark:text-light">
          {children}
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
```

추가로 스크립트에 `strategy`(전략)을 통해서 로드 동작을 미세 조정 할 수 있다.

- `beforeInteractive`: Next.js 코드와 페이지 하이드레이션이 발생하기 전에 스크립트를 로드한다.
- `afterInteractive`: ( 기본값 ) 스크립트를 일찍 로드하지만 페이지에 약간의 하이드레이션이 발생한 후에 로드한다.
- `lazyOnload`: 나중에 브라우저 유휴 시간에 스크립트를 로드한다.
- `worker`: (실험적) 웹 워커에서 스크립트를 로드한다.

`next/script`에서 사용 가능한 API는 [여기에서](<https://beta.nextjs.org/docs/api-reference/components/script>) 확인 할 수 있다.

`전체 레이아웃에서 스크립트를 적용 할 수 있는 부분이 관리적인 측면에서 되게 편리하다고 생각이 들었다.` <br />
`내가 사용한 부분을 정리해보면서 레이아웃 파일에 스크립트를 나열하는 것 보다 스크립트만 모아놓은 컴포넌트를` <br />
`작성해서 관리해주는게 좋겠다는 생각이 들어서 이 부분을 분리하는 작업을 따로 진행해야겠다.`
