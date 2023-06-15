---
title: 프론트엔드 생존코스 3기 10주차 회고
date: '2023-06-15'
category: 주간회고, 메가테라, 프론트엔드 생존코스, jest, React testing library, E2E,
description: 온라인 쇼핑몰을 만들어보자 - 2!
path: frontend-survival-week-in-review-10
image: review-10
featured: true
---

## 배운점

### 1. msw에서 query parameters 얻는 방법

msw handler를 사용하면서 `http://localhost:3000/products?categoryId=category-01`에서 `query parameter`를 받아오는 부분이 필요했는데
해당 부분은 [msw-query parameters](https://mswjs.io/docs/recipes/query-parameters)에 잘 설명이 되어있었다.

```js
const productSummaries: ProductSummary[] = fixtures.products
  .map((product) => ({
    id: product.id,
    category: product.category,
    thumbnail: product.images[0],
    name: product.name,
    price: product.price,
  }));

const handlers = [
...
  rest.get(`${BASE_URL}/products`, (req, res, ctx) => {
    const categoryId = req.url.searchParams.get('categoryId');

    if (categoryId) {
      return res(ctx.json({
        products: productSummaries
          .filter((product) => product.category.id === categoryId),
      }));
    }
    return res(ctx.json({ products: productSummaries }));
  }),
...
];
```

테스트를 할 때 따로 mocking을 하지않고 실제 api에 요청하는 것처럼 사용하는 부분에서 msw가 엄청 유용했고 필요한 부분을 활용하는 부분에서도 공식문서에 잘 설명이 되어있어서
사용하기도 엄청 편했다.

### 2. CodeceptJs에서 login test를 함수로 정의해서 사용하는 방법

`steps_file.ts`에 아래와 같이 로그인 테스트를 정의해 놓는다.

```js
module.exports = () => actor({
  login() {
    this.amOnPage('/');

    this.click('Login');

    this.fillField('E-mail', 'tester@example.com');
    this.fillField('Password', 'password');

    this.click('로그인', { css: 'form' });

    this.waitForText('Cart');
  },
});
```

이미 로그인이 되어있는 상태에서 테스트가 진행되어야 한다면 아래와 같이 Before안에 사용하고 해당 테스트를 진행하면 된다.

```js
Before(({ I }) => {
  I.login();
});

Scenario('Empty cart', ({ I }) => {
  I.amOnPage('/cart');

  I.see('장바구니가 비었습니다');
});

Scenario('Add to cart', ({ I }) => {
  I.amOnPage('/products');

  I.click('CBCL 하트자수맨투맨');

  I.selectOption('컬러', 'blue');
  I.seeElement('//button[contains(., "+")]');

  I.click('장바구니에 담기');

  I.waitForText('장바구니에 담았습니다');

  I.amOnPage('/cart');

  I.see('CBCL 하트자수맨투맨\n(컬러: blue, 사이즈: ONE)');
  I.see('합계\t128,000원');
});
```

## 느낀점

이번주도 뭔가 바쁘고 많은 일을 한 건 아니었지만 새로 시작한 프로젝트에 대한 회의 때문에 머리가 조금 아팠다.

지능형 CCTV 성능 시험 테스트 관련 웹 프로그램을 만드는 프로젝트인데 설명을 들어도 잘 이해가 되지도 않고 아직 경험이 부족한 탓인지 텍스트로 된 요구사항만 보고 전체적인 그림이 그려지지 않는 문제점이 있었다.

아직 프로젝트 초반이어서 그렇다고 생각하고 와이어프레임이 나오면 상황이 조금은 달라질 것이라고 생각이 된다.

이번 프로젝트에서는 기존에 리버스쿨에서는 테스트관련 코드를 작성하지 못했는데 메가테라에서 배운 단위테스트와 E2E테스트를 잘 상기시켜서 작업을 진행해 보려고한다.

쉽지는 않겠지만 프로젝트를 사용처에 납품하면 종료되는 특성상 테스트로 견고한 프로그램을 만들어 보고싶다.

남은 2주 집중해서 잘 진행해 봐야겠다.

`8주차까지 과제에 대한 목표가 있어서 재미있었는데 강의를 보고 따라만드는 쇼핑몰은 내가 큰 흥미를 못느끼는 것 같다. 하지만 강의의 내용은 너무 좋고 내가 얻어갈게 너무 많다고 생각이 된다.`
`항상 내가 원하는 것만 할 수 없듯이 이 안에서도 재미를 찾도록 노력해야겠다.`
