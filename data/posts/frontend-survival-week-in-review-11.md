---
title: 프론트엔드 생존코스 3기 11주차 회고
date: '2023-06-22'
category: 주간회고, 메가테라, 프론트엔드 생존코스, jest, React testing library, E2E,
description: 온라인 쇼핑몰을 만들어보자! - 3
path: frontend-survival-week-in-review-11
image: review-11
featured: true
---

## 배운점

### 1. msw에서 api 요청 실패 테스트 구현하는 방법

`mocks/handlers.ts`

```js
const handlers = [
...
  rest.post(`${API_BASE_URL}/users`, (req, res, ctx) => (
    res(ctx.status(201), ctx.json({ accessToken: 'Access-Token' }))
  )),
...
];
```

`routes.test.ts`

```js
import { rest } from 'msw';
import server from './mocks/server';

context('현재 경로가 “/signup”일 때', () => {
  it('회원가입 페이지에서 회원가입 실패', async () => {
    server.use(
      rest.post(`${API_BASE_URL}/users`, (req, res, ctx) => (
        res(ctx.status(400))
      )),
    );
    renderRouter('/signup');
    ...
  });
});
```

msw를 사용해서 회원가입을 테스트하는 과정에서 handlers안에 회원가입 api는 성공에 대한 부분만 mocking이 되어있는데

실패하는 테스트를 하기 위해서는 테스트를 실행하기 전에 실패에 대한 mocking 부분을 추가로 해서 진행을 해야 했다.

`setupTest.ts`

```js
afterEach(() => server.resetHandlers());
```

`setupTest.ts`에서 위와 같이 설정해 놓았기 때문에 실패하는 로직은 해당 테스트에서만 적용이 되고 다른 테스트에는 영향을 주지 않는다.

## 느낀점

어느덧 마지막 한주만을 남겨놓고 있다. 과제가 있었을 때는 그래도 하루에 두시간이 주말을 제외하고 월~목요일까지 꾸준하게 목표를 향해서 달려갔었는데

쇼핑몰만들기 하면서 과제가 있었을 때 만큼은 하지 않고 강의를 보고 해당 부분까지 기능 완료 후에 더 공부하지 않게 되었다.

조금 지친건지... 목적이 없어서 그런건지... 둘 다 일수도 있다. 하지만 이 강의를 선택한 걸 후회하지는 않는다. 내가 원했던 테스트에 대한 갈증을 조금이나마 해소하고 공부하고 접할 수 있었으며

전보다는 테스트에 대한 부담감이 조금은 적어진 것 같아서 다행이라고 생각이 들었다.

이번주도 조금이나마 배워가는 부분도 있고 앞으로 중요한 부분은 내가 배운거를 작업하는 프로젝트에 잘 녹여서 사용하는 일이 제일 중요 할 것 같다.

이제 앞으로 1주 남았는데 그래도 끝까지 강의내용 잘 정리해서 마무리 하도록 해야겠다.
