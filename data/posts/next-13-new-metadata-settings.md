---
title: Next.js 13 - SEO
date: '2023-04-19'
category: Next.js 13, SEO
description: 새로운 메타데이터 API를 통한 검색 엔진 최적화 하는 방법
path: next-13-new-metadata-settings
image: next.js-13
featured: true
---

## Next.js 13(beta) 새로운 메타데이터 API로 SEO 설정 방법

최근에 드림코딩 엘리님의 새로워진 Next.js 13버전 강의를 보고 만들었던 블로그에 디자인만 변경해서 현재 블로그를 운영하면서
이전과 다른 설정법에 대해서 차근히 기록해보려고 한다.

SEO(Search Engine Optimization: 검색 엔진 최적화)를 하기 위해서 작성해야 할 메타데이터를 작성해야 한다.

### ~ Next.js 12

```tsx
import Head from 'next/head'

function IndexPage() {
  return (
    <div>
      <Head>
        <title>My page title</title>
        <meta property="og:title" content="My page title" key="title" />
      </Head>
      <Head>
        <meta property="og:title" content="My new title" key="title" />
      </Head>
      <p>Hello world!</p>
    </div>
  )
}

export default IndexPage
```

위와 같이 `<Head></Head>`안에 검색 엔진 최적화를 하기 위해서 메타데이터를 작성해 줘야 했다.
현재 13버전에서도 위 처럼 작성해서 진행 할 수 있지만 나는 최근에 반영된 버전으로 설정을 해 주었다.

### Next.js 13 ~

`src/app/layout.tsx`

```tsx
...

export const metadata: Metadata = {
  title: {
    default: 'JIN의 블로그',
    template: 'JIN의 블로그 | %s',
  },
  description: 'front-end developer JIN',
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    images: 'https://jin-blog-blush.vercel.app/images/my-profile.png',
  },
  other: {
    'google-site-verification': 'user-comment-key',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  ...
}
```

앱 전체 레이아웃을 담당하는 파일 안에서 기본적은 메타데이터를 다 작성해주었다.
옵션은 내가 필요한 부분만 설정 해놓은 상태이다. 추가로 필요한 부분은 [Metadata](https://beta.nextjs.org/docs/api-reference/metadata)에서 확인 할 수 있다.

먼저 새로워진 metadata 설정에서는 `title`을 이처럼 정의 할 수 있다.
`default` 하위 경로에 따로 `title`에 관련해서 정의를 해주지 않으면 기본적으로 `default` 값이 적용이 된다.

```js
title: {
  default: 'JIN의 블로그',
  template: 'JIN의 블로그 | %s',
},
```

그리고 `template`를 지정해 놓으면 `%s`이 부분에 아래 처럼 해당 페이지의 `title`을 지정해 놓으면 `JIN의 블로그 | About Me`이렇게 들어가게 된다.

`src/app/about/page.tsx`

```tsx
export const metadata: Metadata = {
  title: 'About Me',
  description: '긍정적인 마인드와 진정성 있는 자세로 임하는 프론트엔드 개발자입니다.',
};
```

![title-template.png](/images/next-13-new-metadata/title-template.png)

이외에 추가적으로 사이트를 소개하는 `description`, sns를 공유 할 때 사용되는 `open-graph` 설정, 그 이외의 테그는 `other`에 정의 해주면 된다.
`other`에는 사용자정의 태그가 들어간다고 생각하면 된다.(google search console 연결을 위한 테그, naver 등등)

```js
  description: 'front-end developer JIN',
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    images: 'https://jin-blog-blush.vercel.app/images/my-profile.png',
  },
  other: {
    'google-site-verification': 'user-comment-key',
  },
```

추가로 블로그 포스트마다 메타데이터를 다르게 설정 할 수도 있다.

`src/app/posts/[slug]/page.tsx`

```tsx
export function generateMetadata({ params: { slug } }: Props): Metadata {
  const post = getPostData(slug);
  const { title, description } = post;

  return {
    title,
    description,
  };
}
```

`generateMetadata`라는 함수를 이용해서 현재 블로그 포스트 주소를 통해서 해당 포스트의 데이터를 받아 온 후에 지정하고 싶은
메타데이터를 위와 같이 리턴해주면 된다.

![dynamic-metadata.png](/images/next-13-new-metadata/dynamic-metadata.png)

`아직 안전한 버전은 아니지만 그래도 개인 블로그를 운영하는데는 큰 문제점은 없어보인다.`<br />
`오늘을 시작으로 내가 Next.js 13으로 블로그를 만들면서 사용했던 라이브러리 및 문제점 해결 방법도 정리해서 올리도록 해야겠다.`<br />
`안되는 부분을 github issue를 통해서 찾아보기도 하고 서비스를 만들면서 사용했던 방법도 추가해보면서 만들어가는 재미가 있는 것 같다.`
