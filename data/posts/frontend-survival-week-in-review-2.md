---
title: 프론트엔드 생존코스 3기 2주차 회고
date: '2023-04-21'
category: 주간회고, 메가테라, 프론트엔드 생존코스
description: JSX, VDOM, React의 기본을 충실하게 이해하고 기억하자
path: frontend-survival-week-in-review-2
image: megaptera
featured: true
---

## 1. 잊어버리지 말자 JSX

`JSX(JavaScript XML) 자바스크립트에 XML을 추가 확장한 문법이다.`<br />
`JSX는 React.createElement(component, props, ...children)함수에 대한 문법적 설탕(Syntactic sugar)을 제공할 뿐이다.`

### JSX의 장점

- `React.createElement`로 작성하였을 때 보다 `JSX`를 사용하는 것이 훨씬 직관적이고 가독성이 좋다.
- `JSX`는 하나의 파일에 자바스크립트와 HTML을 동시에 작성 할 수 있는 점.

```js
const element = (
  <h1 className="greeting">
    Hello, world!
  </h1>
);

const element = React.createElement(
  'h1',
  {className: 'greeting'},
  'Hello, world!'
);
```

위의 간단한 예제보다 아래처럼 컴포넌트 여러 자식을 품고 있는 형태라면 createElement로 작성되었을 때 의미하는 바를 유추하기가 쉽지는 않다고 생각된다.
그렇기에 `JSX 문법이 탄생된 것이 아닐까` 라고 조심스럽게 추측을 해본다.

```js
import React, { useState } from 'react';

import Greeting from './components/Greeting';

type ImageProps = {
  src: string;
  alt?: string;
  width?: number;
}

function Image({ src, alt = '', width }: ImageProps) {
  return (
    <img src={src} alt={alt} width={width ?? 'auto'} />
  );
}

// JSX
export default function App() {
  const [count, setCount] = useState(0);

  const handleClick = (value: number) => {
    setCount(count + value);
  };

  return (
    <div>
      <Greeting name="wholeman" />
      <Image src="/images/test.jpg" alt="Test Image" width={200} />
      <p>
        Count:
        {' '}
        {count}
      </p>
      {[1, 2, 3, 4, 5].map((i) => (
        <button key={i} type="button" onClick={() => handleClick(i)}>
          +
          {i}
        </button>
      ))}
    </div>
  );
}

// React.createElement
function Image({ src, alt = '', width }: ImageProps) {
  return (
    React.createElement('img', { src, alt, width: width ?? 'auto' })
  );
}

export default function App() {
  const [count, setCount] = useState(0);

  const handleClick = (value: number) => {
    setCount(count + value);
  };

  return (
    React.createElement(
      'div',
      null,
      React.createElement(Greeting, { name: 'wholeman!' }),
      React.createElement(Image,
      {
        src: '/images/test.jpg',
        alt: 'Test Image',
        width: 200
      }),
      React.createElement('p', null, 'Count: ', count),
      [1, 2, 3, 4, 5].map((i) => React.createElement('button',
      { type: 'button', key: i, onClick: () => handleClick(i) },
      '+',
      i)),
    )
  );
}
```
