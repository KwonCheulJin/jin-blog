---
title: 늦은 7월 4주차 주간 회고
date: '2023-08-08'
category: 주간회고, 프론트엔드, Next.js 13, middleware
description: Next.js middleware를 활용하여 사용자별 페이지 라우트를 처리해보자!
path: week-in-review-4
image: week-in-review-4
featured: true
---

## 이번주 한 일

### Next.js의 middleware 활용을 통한 사용자별 페이지 라우팅

거의 1주를 통으로 사용자 타입별로 페이지 라우트 만드는 기능으로 다 써버렸다.

그렇게 된 계기는 첫번째로 Next에 대한 이해가 적었던 탓이 제일 컸다.

내가 구현하려고 했던 기능은 현재 개발중인 프로젝트에는 기업회원과 시험관리자, 시스템관리자 총 3개의 사용자 role이 존재한다.

기업회원은 사용자 페이지만 접근을 해야하고 시험관리자와 시스템관리자는 사용자, 관리자페이지 접근이 모두 가능하도록 하고, 추가적으로 로그인이 된 사용자는 회원가입과 로그인 페이지로 가지 못하도록

기능을 구현하려고 하였다.

기존에 React만 사용하였을 때는 React-Router와 hook, redux를 이용해서 아래와 같은 라우터 방식으로 사용자 접근을 제어하였는데

```js
<Route element={<LoginUserException />}>
  <Route element={<SignInPage />} path="/signin" />
  <Route element={<SignUpPage />} path="/signup" />
</Route>

<Route element={<RequireAdminAuth />}>
  <Route element={<AdminHomePage />} path="/" />
</Route>
```

Next는 페이지 개념에 기반한 파일 시스템 기반 라우터로 구성이 되어있어서 처음에는 각 페이지의 layout에서 사용자 타입을 이용해서 접근 제한을 두려고 시도를 해보았다.

```
└── src
    ├── app
    ├── admin
    │   ├── page.txs
    │   └── layout.txs
    └── user
        ├── page.txs
        └── layout.txs
```

먼저 상태 관리를 위해서 zustand를 사용하였다. zustand를 사용한 이유는 현재 프로젝트가 많은 상태를 필요로 하지 않기 때문에 경량화된 상태 라이브러리를 사용해 보는게 좋을 것 같아서 사용해보았다.

zustand의 middleware인 persist를 사용해서 localStorage에 저장을 해서 스토리지를 지우기 전까지 영구적으로 사용자가 지속되도록 하였다.

그런데 최초에 내가 layout에서 상태값을 그냥 사용하려고 할 때마다 렌더링 이슈가 발생하였다. zustand persist를 사용하기 위해서 useStore라는 커스텀 훅까지 사용해서 시도를 해보았으나 내가 의도한
대로 동작하지는 않아서 1차 시도는 실패였다.

그리고 구글링을 통해서 알게 된 정보로 보통 Next로 auth관련 로그인 처리를 next-auth(현재는 auth.js)를 사용한다는 것을 알게 되었다.

그런데 백엔드분과 협의 할 부분이 있어서 next-auth를 먼저 내가 시도를 해보았다.

next-auth를 사용하면 가장 편한 부분이 session을 통해서 로그인 사용자를 파악 할 수 있는 부분이었는데 next-auth를 사용했을 때 내가 원하는 인증된 사용자 or 비회원의 페이지 라우트 기능도 next-auth에서 제공하는 middleware의 default를 이용하면 손쉽게 된다는 것을 알았으나 현재 세션에 대한 부분이 백엔드분의 api가 이미 나와있는 상태여서 next-auth를 사용하게 되면 api의 endpoint가 중첩이 되어버리는 문제가 있었다.

그래서 백엔드분에게 나의 문제를 설명드리고 next-auth를 사용하는 것에 대해서 이야기를 했는데 백엔드분께서 그렇게되면 현재 서버와 프론트가 session을 동시에 관리하게 되는 문제가 있고 굳이 next-auth를 사용하지 않고 next-auth가 제공하는 middleware와 같은 방식 차용해서 Response Header cookie에 token을 넣어서 그것을 middleware에서 사용자가 페이지를 요청할 때 NextRequest의 cookies.get을 통해 사용자의 토큰이 존재하는지 확인하는 방식으로 문제를 해결해 보기로했다.

```js
import { NextRequest, NextResponse } from 'next/server';
import { getToken } from '@/lib/token';

const FALLBACK_URL = '/';
const FALLBACK_LOGIN_URL = '/login';
const withAuthList = ['/', '/mypage'];
const withOutAuthList = ['/login', '/signup'];

export async function middleware(req: NextRequest) {
  const userToken = req.cookies.get('token')?.value;
  const token = getToken(userToken);

  const accessToken = !!token;

  // 사용자가 요청하는 페이지 pathname
  const { pathname } = req.nextUrl;

  // 해당 pathname이 미리 정의해둔 withAuth, withOutAuth 배열 중 어디에 속하는지 확인
  const isWithAuth = withAuthList.includes(pathname);
  const isWithAdminAuth = pathname.includes('admin');
  const isWithOutAuth = withOutAuthList.includes(pathname);

  // 사용자 타입이 기업일 경우에는 관리자 페이지로 직접 관리자 페이지로 이동하려고 할 때 메인페이지로 리다이렉트
  if (isWithAdminAuth && token?.type === 'ROLE') {
    return NextResponse.redirect(new URL(FALLBACK_URL, req.url));
  }
  // 관리자 페이지로 접근 시 accessToken이 false이면 메인페이지로 리다이렉트
  if (isWithAdminAuth && !accessToken) {
    return NextResponse.redirect(new URL(FALLBACK_LOGIN_URL, req.url));
  }

  if (isWithAuth && !accessToken) {
    return NextResponse.redirect(new URL(FALLBACK_LOGIN_URL, req.url));
  }
  if (isWithOutAuth && accessToken) {
    return NextResponse.redirect(new URL(FALLBACK_URL, req.url));
  }
}

export const config = {
  matcher: ['/', '/mypage', '/admin/:path*', '/login', '/signup'],
};
```

위와 같이 middleware를 사용해서 기업, 관리자, 비회원에 대한 라우트 처리를 무사히 진행 할 수 있었다.

먼저 next-auth로 해결방법이 보였을 때 백엔드분과 이야기하면서 너무 내 해결에 집중해서 백엔드분이 맞춰줬으면 좋겠다는 식의 대화를 처음에 했었는데 그때의 나는 정말 이기적이었다고 생각이 들었다.

다행스럽게도 백엔드분에게 내가 시도했던 코드를 보여드렸더니 서버에서 하는 로직하고 비슷하게 때문에 굳이 next-auth를 쓰지 않아도 구현이 가능할 것 같다고 힌트를 주셔서 내가 원했던 방식으로 잘 해결 할 수 있었던 것 같다.

프론트를 혼자 하다 보니깐 어떤 문제가 발생했을 때 혼자서 끙끙 앓는 경우가 많은 것 같다. 그리고 지금같이 Next.js 13에 대한 best practice의 많은 예제가 존재하지 않은 상태에서 내가 원하는 자료를 찾는거에도 많이 부족하다는 것을 알게 되었다. (내가 키워드를 잘 찾지 못했을 경우도 있다...)

그래도 백엔드분과 잘 소통해서 결국에는 제대로 된 기능을 구현했다는 거에 만족해야겠다.

middleware 사용법을 알고 나서 next로 개발하는 부분이 한결 수월해졌다고 느꼈다.


### storybook 제거

UI 테스팅 및 화면 소통을 위해서 storybook을 도입했었는데 열심히 storybook 컴포넌트를 만들고 배포를 해도 디자인 시스템이 갖춰진 것도 아니고 디자이너가 없이 대표님이 디자인을 하면서

자주 변경되는 UI들로 인해서 storybook을 유지하는게 답이 나오지 않았다. 먼저 그래도 storybook을 사용하는 법에 대해서 그리 어렵지는 않다는 것에 대해서 위안을 삼고 나중에 디자인 시스템이 잘 갖춰진 곳이나 현재 잘 사용하고 있는 회사로 이직을 하게 되면 그때 잘 사용해보도록 해야겠다.


`우여곡절이 많이 있는 상태이지만 그래도 잘 헤쳐나가고 있다고 생각이 든다. 지금하고 있는 부분에서 최선을 다하고 그 다음을 생각하도록 하자! 이번주 마지막 원티드 프리온보딩 첼린지도 잘 마무리하자`