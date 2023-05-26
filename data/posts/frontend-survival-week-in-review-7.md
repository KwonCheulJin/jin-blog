---
title: 프론트엔드 생존코스 3기 7주차 회고
date: '2023-05-26'
category: 주간회고, 메가테라, 프론트엔드 생존코스, Router, react-router-dom v6, react jest useNavigate, react jest useSearchParams
description: 라우터를 이용하여 페이지를 분리해보자
path: frontend-survival-week-in-review-7
image: review-7
featured: true
---

## [7주차 데브노트](https://jin-11.gitbook.io/jin-devnote/week7)

## 1. 라우트를 이용한 페이지 분리 후 컴포넌트 유닛테스트에서 겪은 문제점

이번주에는 이전 차수의 내용 + 라우터를 이용해서 페이지를 분리하는 작업을 하였다. 라우터를 이용해서 작업하는 부분은 크게 어렵지는 않았으나
유닛테스트 하는 부분에서 쉽지 않았다.

먼저 라우터를 테스트 하기 위해서는 MemoryRouter(브라우저의 URL 및 기록 API를 활용하는 BrowserRouter 또는 HashRouter와 달리 MemoryRouter는 실제 브라우저 URL에 영향을 주지 않고 라우팅 상태를 메모리에 저장)를 사용해서 테스트를 진행해줘야 한다는 부분을 알게 되었다.

`routes.test.tsx`

```js
...
function renderRouter(path:string) {
  const router = createMemoryRouter(routes, { initialEntries: [path] });
  render(<RouterProvider router={router} />);
}
...
```

또 알게 된 부분은 `react-router-dom`의 `useNavigate`, `useSearchParams` hook을 호출하는 컴포넌트의 유닛테스트에서 에러가 발생하는 현상이 있었다.
해당 문제점은 두개의 hook을 테스트안에서 mocking을 해줘야하는데 그 부분을 해주지 않았기 때문에 나타나는 문제였다.

```js
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom') as object,
  useNavigate: jest.fn(),
  useSearchParams: () => [new URLSearchParams({ orderId: '12345678910' })],
}));

describe('OrderContainer', () => {
  ...
}
```

해당 hook의 mocking 부분은 위와 같이 테스트 제일 상단에 해놓으면 hook을 호출하지 않았다는 에러가 사라지게 된다.
테스트 경험이 많이 없다보니깐 알지 못하는 에러가 자주 발생하지만 그래도 구글링을 통해서 해결이 가능하니 큰 문제는 없었다.

## 2. 동력이 좀 떨어진 한주

이번주 과제도 크게 어렵지 않았지만 과제를 한 과정을 생각해보면 금방 끝낼 수 있던 문제도 조금 하다가 유튜브를 보고 했던 모습이 생각난다.
생각보다 집중을 많이 못한 한주였다는 생각이 들었다. 회사에서 하는 일도 현재 서비스와 관련되지 않은 일을 할 수 있다는 부분도 영향이 있었던 거 같은데
그럼에도 과제를 포기하지 않고 끝냈다는 부분에 나한테 칭찬을 해주고 싶다.

이번주 같은 날도 있어야지 항상 같은 자세로 유지하기란 쉽지 않다.
이번 연휴를 잘 휴식하고 다음주에 다시 집중해서 공부랑 작업을 해봐야겠다.

`포기만 하지말고 느리더라도 한걸음씩 꾸준히 걸어나가보자!`<br />
