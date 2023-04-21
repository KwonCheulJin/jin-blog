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

위의 간단한 예제보다 아래처럼 컴포넌트 여러 자식을 품고 있는 형태라면 `createElement`로 작성되었을 때 의미하는 바를 유추하기가 쉽지는 않다고 생각된다.
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

## 2. 꾸준한 블로그 활동을 위한 작업

### google tag manager 설정

```tsx
  <Script src={`https://www.googletagmanager.com/gtag/js?id=${GTM_ID}`} />
  <Script id="google-analytics">
    {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){window.dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', '${GTM_ID}');
  `}
  </Script>
```

### google AdSense 설정

```tsx
  <Script
    async
    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-key"
    crossOrigin="anonymous"
  ></Script>
```

일주일에 1개 이상의 블로그에 꾸준한 작업을 위해서 구글 태크매니저 및 구글 애드센스를 설정 해 놓았다.
블로그에 다른 사람에게 도움이 될 수 있는 유익한 내용을 담으려고 노력하고 내가 겪었던 부분이나 활용했던 부분을 실제 적용된 코드로
작성해서 도움이 될 수 있으면 좋고 추가로 설정해 놓은 부분으로 나에게도 도움이 되면 좋겠다.

## 3. 챌린지 기능 작업

현재 회사에서 운영하는 서비스에 챌린지라는 기능을 제작 중이다. 해당 기능은 리버싱 관련 문제를 파일 및 설명을 통해서 문제에 대한 답을 찾아내고 답을 제출하는 간단한 기능이다.
이번주는 관리자 화면 작업을 진행하였고, api가 완성되면 연동하는 작업을 하면 관리자는 마무리가 된다.
최근에 작업하면서 `useState`를 사용하는 부분에서 `useReducer`를 사용하는 부분으로 개선해 나가고 있다.

이전에 기능을 위해서 사용하는 상태값을 `useState`로만 값을 감지하고 변경하려고 하다보니 어느 순간 상태값이 많이 늘어나는 경험을 하게 되었다.

```tsx
function RegisterModule(): ReactElement {

  const [showModal, setShowModal] = useState<boolean>(false);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [newTag, setNewTag] = useState<string | null>(null);
  const [toDeleteTag, setToDeleteTag] = useState<string>('');
  const [activeCapaTab, setActiveCapaTab] = useState('');

  const [title, setTitle] = useState<string | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [capaList, setCapaList] = useState<CapaTestListType[]>([]);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [addModule, setAddModule] = useState<AddModulePayload | null>(null);

  ...
```

```tsx
const initialState:ChallengeState = {
  title: '',
  tags: [],
  point: 0,
  answer: '',
  content: '',
  file: {
    bucket: '',
    key: '',
    size: '',
    originalname: '',
  },
};

export default function RegisterChallenge(): ReactElement {

  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [data, dataDispatch] = useReducer(challengeReducer, initialState);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [addModule, setAddModule] = useState<AddModulePayload | null>(null);
```

`@src/components/admin/body/common/reducer`

```ts
export type ChallengeAction = {
  type: string,
  payload: string | number | S3FileResponse,
}

export type ChallengeState = {
  title: string;
  tags: string[];
  point: number;
  answer: string;
  content: string;
  file: S3FileResponse;
}

/**
 * @description 챌린지 등록 데이터 상태관리 리듀서
 * @author Charles
 */
export function challengeReducer(state: ChallengeState, action:ChallengeAction):ChallengeState {
  const { type, payload } = action;

  switch (type) {
    case 'title':
      return {
        ...state,
        title: payload as string,
      };
    case 'tags':
      return {
        ...state,
        tags: state.tags.toString().split(',').some(tag => tag === payload as string)
          ? state.tags.filter(tag => tag !== payload as string)
          : [...state.tags, payload as string],
      };
    case 'point':
      return {
        ...state,
        point: payload as number,
      };
    case 'answer':
      return {
        ...state,
        answer: payload as string,
      };
    case 'content':
      return {
        ...state,
        content: payload as string,
      };
    case 'file':
      return {
        ...state,
        file: payload as S3FileResponse,
      };
    default:
      return state;
  }
}
```

위와 비교하기에는 기능의 차이는 있지만 `useState`와 `useReducer`를 같이 적절히 사용해서 진행을 하면서 api로 전달해줘야하는 데이터는 리듀서로 상태 변경을 감지해서
저장하는 방법을 사용해보았는데 관리적인 측면에서도 좋다고 생각이 들었다.

앞으로 중간중간 코드 개선하는 시간을 진행하면서 `useReducer`를 잘 활용해보도록 해야겠다.

`이번주에 새로운 기능 작업에 대한 고민도 하면서 메가테라 강의까지 알차게 보낸 한주였다.` <br />
`2주차 강의도 React를 사용하면서 이전에 공부하면서 알고 있다고 생각했던 부분이 이번에 강의를 듣고 정리하면서` <br />
`내가 알고 있던거는 사용법에 대한 부분이고 React의 전반적인 기본지식에는 좀 무지했다는 생각이 들었다.` <br />
`지금도 완벽하게 알고 있다의 수준이라고 장담 할 수는 없지만 그래도 매일 내가 기록했던 부분을 다시 읽어보면서 지속적으로 기억하려고 노력하는 중이다.` <br />
