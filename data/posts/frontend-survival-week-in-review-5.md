---
title: 프론트엔드 생존코스 3기 5주차 회고
date: '2023-05-12'
category: 주간회고, 메가테라, 프론트엔드 생존코스, jest, React Testing Library, MSW
description: 테스트 코드로 견고한 프로그램 만들기
path: frontend-survival-week-in-review-5
image: review-5
featured: true
---

## [5주차 데브노트](https://jin-11.gitbook.io/jin-devnote/week5)

## 1. 4주차 학습 + Test추가 학습

이번주는 4주차에 학습했던 부분에 추가로 테스트코드를 단위테스트부터 E2E테스트까지 작성해보는 시간이었다.
단위테스트는 `jest`와 `React Testing Library`를 사용했고, E2E테스트는 `CodeceptJS`를 사용해서 진행하였다.

테스트를 진행하면서 `어디서부터 어디까지 테스트를 해야하는가?`라는 고민에서 시작해서 강의에서 배운 것을 차근차근 따라해보고 과제 코드에 적용해보면서 고민을 해소하는 시간이었다.
아직 테스트코드 자체가 익숙하지 않기 때문에 내가 테스트코드를 잘 작성하였는지 여부와 관계없이 처음으로 내가 만든 컴포넌트에 대해서 안정성을 검증하는 시간을 가졌던 것 같아서 개인적으로 뿌듯한 한주였다.

![4주차.png](/images/frontend-survival-week-in-review-5/4주차.png)

![5주차.png](/images/frontend-survival-week-in-review-5/5주차.png)

과제 진행 시간만 단순 비교를 해봐도 4주차 과제 작성 시간보다 5주차 작성시간이 거의 2.5배정도 걸렸다.
테스트가 익숙하지 않아서 오래걸렸던 부분도 있지만 컴포넌트 작성시 사용되는 custom hooks와 api를 통해서 주고 받는 비동기 통신에 대한 mocking작업이 생각보다 쉽지않았던게 컸던 것 같다.

과제를 진행하면서 MSW(Mock Service Worker)에 대해서 새롭게 알게되었는데 신세계를 경험한 시간이었다.
강의에서 msw를 세팅하는 방법부터 사용법까지 잘 설명해주셔서 어렵지 않게 사용할 수 있었다. 내가 직접 알아보고 사용했다고 생각하면 꽤 고생했을 것 같다.😅

단위테스트 작업에서 제일 어려웠던 부분은 localStorage를 mocking하는 부분이 제일 어려웠는데 이 부분은 구글링을 통해서 해결하였다.

`tests/localStorage.ts`

```ts
function localStorageMock<T>() {
  let store: Record<string, T> = {};

  return {
    getItem(key: string) {
      return store[key];
    },

    setItem(key: string, value: T) {
      store[key] = value;
    },

    clear() {
      store = {};
    },

    removeItem(key: string) {
      delete store[key];
    },

    getAll() {
      return store;
    },
  };
}

Object.defineProperty(window, 'localStorage', { value: localStorageMock() });
```

`Cart.test.tsx`

```tsx
import '../../../tests/localStorage';

...

  const mockCarts = [
    {
      id: 'FOOD_01-ASD',
      name: '짜장면',
      price: 8_000,
    },
    {
      id: 'FOOD_01-QWE',
      name: '짜장면',
      price: 8_000,
    },
    {
      id: 'FOOD_02',
      name: '짬뽕',
      price: 5_000,
    },
  ];

  function setLocalStorage<T>(id:string, data:T) {
    window.localStorage.setItem(id, JSON.stringify(data));
  }

  beforeEach(() => {
    setLocalStorage('cart', mockCarts);
  });
```

위에 로컬스토리지를 mocking해주는 부분을 따로 파일로 정의해놓고 사용하는 곳에서 `setLocalStorage`함수를 만들어서 사용했다.

모든게 다 처음이었는데 테스트를 통과하는게 신기했다. 어떤 원리로 동작하는지 궁금증도 생겼지만 아직은... 이 부분은 미래의 나에게 책임을 넘기도록 해야겠다.

![unit-test-coverage.png](/images/frontend-survival-week-in-review-5/unit-test-coverage.png)

마지막 커버리지를 보고 한주 고생한 보람이 있었던 것 같다.

## 2. 조금씩 발전하고 있는 나를 발견?

회사에서 혼자 프론트앤드를 담당하다보니 내가 잘하고 있는지에 대한 의문이 생기곤 한다.
타입스크립트를 쓰면서도 내가 이거를 제대로 활용하고 있는게 맞는지 혼자서 진행하다 보니 이상없이 서비스가 잘 동작하는걸 보면 잘 쓰고있다고 할 수도 있고 하지만 개발하면서
중복이 발생하는 요인을 발견하면 이 부분을 개선해야 한다라는거는 인지하지만 어떻게 해야하는지에 대해서는 지식의 깊이가 깊지 않다보니 한계에 부딪힐 때가 많다.

이번주는 어느 순간 내가 조금은 성장하고 있는거 같은데?라고 느낀 지점이 있었다.

타입스크립트에서 제네릭 문법이 있다.

[제네릭](https://www.typescriptlang.org/ko/docs/handbook/2/generics.html)

사용자가 준 인수를 타입으로 사용하는 방법이다.

지금까지 제네릭의 활용을 잘 못하고 있었는데 이번에 새로운 기능을 도입하면서 api 요청 후 응답으로 받는 값이 반복적으로 형태는 동일한데 data에 들어오는 값만 변경되는 구조였다.

이전이었으면 아래와 같에 사용했었을 것이다.

```ts
export type CommonPayloadType = {
  data: RecordType,
  status: number,
}
```

이번에는 아래처럼 사용하는쪽에서 타입을 넣어서 해당 응답값의 데이터로 넣는 방식으로 추가하였는데 알고 있음에도 활용하지 못했던 나 자신이 조금 한심했지만 그래도 지금이라도 이렇게 사용한다는게
전보다는 성장했구나라는 생각도 하게 되었다.

```ts
export type Response<T> = {
  data: T;
  status: number;
};
```

`이번주는 돌이켜보면 최근들어 이렇게 머리아프게 개발을 한적이 있었나라는 생각이 드는 한주였다.`<br />
`이제 시작한 테스트코드 작성 늦었다고 생각할 수 있지만 지금이라도 시작한게 다행이라는 생각이 들었다.`<br />
`다음주는 또 어떤 강의가 나를 설레게 해줄지 기대가 된다!! 이번주도 수고했다!`<br />
