---
title: 프론트엔드 생존코스 3기 4주차 회고
date: '2023-05-04'
category: 주간회고, 메가테라, 프론트엔드 생존코스, 멱등성, HTTP Method
description: express로 기본적인 백엔드 활용법을 추가
path: frontend-survival-week-in-review-4
image: megaptera-3
featured: true
---

## [4주차 데브노트](https://jin-11.gitbook.io/jin-devnote/week4)

## 1. 3주차 학습 + express로 백엔드를 구축하고 api를 통해 데이터를 가져오는 학습

`express-app/app.ts`

```ts
import express from 'express';
import cors from 'cors';

const port = 3000;

const app = express();

app.use(express.json());
app.use(cors());

app.get('/restaurants', (req, res) => {
  const restaurants = [
    {
      id: '1',
      category: '중식',
      name: '메가반점',
      menu: [
        { id: '1', name: '짜장면', price: 8000 },
        { id: '2', name: '짬뽕', price: 8000 },
        { id: '3', name: '차돌짬뽕', price: 9000 },
        { id: '4', name: '탕수육', price: 14000 },
      ],
    },
    ...
  ];
  res.send({ restaurants });
});

app.post('/orders', (req, res) => {
  const orderId = Date.now().toString();
  const { menu } = req.body;
  const { totalPrice } = req.body;

  res.status(201).json({
    order: {
      id: orderId,
      menu,
      totalPrice,
    },
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
```

`react-app/hooks/useFetchRestaurants.ts`

```ts
import { useFetch } from 'usehooks-ts';
import { Data } from '../types';

const url = 'http://localhost:3000/restaurants';

export default function useFetchRestaurants() {
  const { data } = useFetch<Data>(url);
  return data?.restaurants;
}
```

이번주는 3주차에 더미 데이터를 가지고 작업했던 부분에 실제로 hooks를 이용해서 데이터를 fetch하고 custom hooks를 이용해서 작업하는 부분이 추가되었다.
강의를 보면서 [usehooks-ts](https://usehooks-ts.com/)라이브러리 처음 알았는데 유용한 hooks를 알게 되어서 내가 custom hooks를 직접 작업해야 할 때 참고하거나
이미 사용 가능한 hook은 사용하도록 해야겠다.

hook들이 어떻게 작성 되었는지 직접 코드도 확인 할 수 있어서 이 부분이 제일 좋은 것 같다.

`이번주 작업물`

![week4-home-work.gif](/images/frontend-survival-week-in-review-4/week4-home-work.gif)
![week4-home-work-2.gif](/images/frontend-survival-week-in-review-4/week4-home-work-2.gif)

## 2. tailwindcss + parcel 사용 시 겪었던 에러

과제 디자인은 자유롭게 해도 된다고 하여 tailwindcss를 적용해서 작업을 진행하였다.
처음에 [Tailwind CLI](https://tailwindcss.com/docs/installation)를 보고 파일 세팅을 하고 작업이 완료된 후에 pr을 진행하면서 ci를 통과하지 못하는 에러가 발생하였다.

![build-error.webp](/images/frontend-survival-week-in-review-4/build-error.webp)

확인 결과 parcel을 사용시에 추가로 구성해줘야하는 config파일이 있었다.

[Install Tailwind CSS with Parcel](https://tailwindcss.com/docs/guides/parcel)

해당 가이드를 보고 `.postcssrc`파일을 추가하고 `index.html`에 내용도 수정하고 다시 pr을 진행했더니 이상없이 ci를 통과하였다.

![week4-complete.webp](/images/frontend-survival-week-in-review-4/week4-complete.webp)

내가 사용하고 있는 프로젝트의 기술 스텍에 맞는 가이드를 찾아서 적용하는 습관을 들여야겠다.

## 3. 멱등성 친숙하지 않은 단어지만 생각보다 어렵지 않았던 단어

### 멱등성(덮을 멱(冪), 같을(무리, 등급) 등(等))

단어만 들으면 이게 무슨말이지 싶을 것이다. 나 역시 그랬다. 한자로 되어있는 말이다 보니깐 친숙하지도 않았다.
그런데 뜻 풀이를 해보면 명확하게 이해가 된다. `같은 것으로 덮는다.`

HTTP Method에서 멱등성이란 같은 요청을 반복해도 단일 요청과 결과가 같은 것을 의미한다.

멱등성 메소드를 올바르게 구현한 경우 GET, HEAD, PUT, DELETE 메서드는 멱등성을 가지며, POST 메서드는 그렇지 않다.

`이번주는 연휴에 개인 스케줄로 인해 과제를 마무리 못 할 수도 있다고 생각했었는데 제일 비중을 높게 잡았던 과제를 무사히 통화 할 수 있어서 만족했다.`<br />
`이번주는 멱등성 하나를 제대로 이해했다는 것에 만족한다.`<br />
`다음주부터는 테스트강의가 오픈 될 것 같은데 잘 배워서 실무에도 적용해야겠다!`<br />
