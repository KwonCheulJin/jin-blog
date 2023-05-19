---
title: 프론트엔드 생존코스 3기 6주차 회고
date: '2023-05-19'
category: 주간회고, 메가테라, 프론트엔드 생존코스, External Store, Observer pattern
description: 전역 상태 관리를 통해서 LocalStorage 사용을 없애보자!
path: frontend-survival-week-in-review-6
image: review-6
featured: true
---

## [6주차 데브노트](https://jin-11.gitbook.io/jin-devnote/week6)

## 1. 기존에 LocalStorage 사용 하던 부분을 External Store를 사용해서 변경해보자

이번주는 redux와 비슷한 전역 상태 관리를 위한 external store에 대해서 배웠다.

내용이 점점 심화과정으로 넘어가서 한번에 이해하기가 쉽지는 않지만 그래도 6주차 과제도 문제 없이 제출해서 이번주도 할 일을 제대로 했다는 생각이 들었다.

redux를 사용하기만 해봤지 내부로직이 어떻게 동작하는지에 대해서 크게 고민을 해보지 않았었는데

이번에 store 관련 강의를 보고서 느낌점은 redux와 같은 전역 상태 관리 라이브러리들이 마법을 부려서 동작하는게 아닌 결국엔 상태를 업데이트를 해주기 위해서 리액트에

강제업데이트 작업을 해줘야 한다는 것을 알게 되었다.

`useForceUpdate.ts`

```ts
import { useCallback, useState } from 'react';

export default function useForceUpdate() {
  const [, setState] = useState({});

  return useCallback(() => setState({}), []);
}
```

`useCounterStore.ts`

```ts
import { useEffect } from 'react';

import { container } from 'tsyringe';

import useForceUpdate from './useForceUpdate';

import CounterStore from '../stores/CounterStore';

export default function useCounterStore() {
  const store = container.resolve(CounterStore);

  const forceUpdate = useForceUpdate();

  useEffect(() => {
    store.addListener(forceUpdate);

    return () => {
      store.removeListener(forceUpdate);
    };
  }, [store, forceUpdate]);

  return store;
}
```

`CounterStore.ts`

```ts
import { singleton } from 'tsyringe';

type Listener = () => void;

@singleton()
export default class CounterStore {
  count = 0;

  listeners = new Set<Listener>();

  increase() {
    this.count += 1;
    this.publish();
  }

  decrease() {
    this.count -= 1;
    this.publish();
  }

  publish() {
    this.listeners.forEach((listener) => listener());
  }

  addListener(listener:Listener) {
    this.listeners.add(listener);
  }

  removeListener(listener:Listener) {
    this.listeners.delete(listener);
  }
}
```

store에서 가지고 있는 상태값이 변경되는 액션을 하게되면 리스너를 통해서 강제업데이트 되도록 publish함수를 통해서 리스너들을 호출하는 형식으로 해줘야

리액트에서 해당 업데이트를 감지한다는 것을 알게되었다.

해당 로직 부분을 조금 이해하고 나니 리액트 `useSyncExternalStore` 훅에 대해서 설명한 내용이 [React 18 for External Store Libraries](https://youtu.be/oPfSC5bQPR8)

이곳에 있는데 사실 설명은 영어부족으로 잘 알지는 못하지만 여기서 설명하는 해당 코드는 일부분 이해할 수 있었던게 엄청 신기했다.

그리고 2주동안 테스트를 계속 작성하다보니 전주보다 테스트 작성하는게 한결 수월해졌다고 느꼈던 한주였다. 잘하고 있는지는 다른문제지만😂

이번주 과제도 새로운 부분을 만들어보는 거여서 재미있었다. 그리고 메가테라에서 [usestore-ts](https://github.com/seed2whale/usestore-ts) 상태관리 라이브러리를 제공해주어서

이걸 사용해서 조금 더 간결하게 코드를 작성했던 것 같다.

## 2. 타입스크립트를 더 다양하게 활용해보자

이번주는 새로운기능을 만들면서 타입지정에 대해서 중복은 최대한 줄이고 타입스크립트 유틸리티 타입을 활용해서 타입지정을 해보려고 하였다.

[Utility Types](https://www.typescriptlang.org/ko/docs/handbook/utility-types.html)

유틸리티 타입 종류가 많은데 내가 이번에 사용한 것은 `Pick<Type, Keys>`, `Omit<Type, Keys>`, `Exclude<Type, ExcludedUnion>` 3개를 사용해보았다.

`Pick<Type, Keys>` - 기본 지정되어있는 타입에서 필요한 타입만 선택해서 타입을 생성해준다

`Omit<Type, Keys>` - Pick의 반대로 동작하는 유틸리티 타입으로 이해를 했다. 모든 타입을 가져온 다음 제거하고자 하는 키를 추가하면 해당 키만 제거한 타입이 생성된다.

`Exclude<Type, ExcludedUnion>` - ExcludedUnion에 할당할 수 있는 모든 유니온 멤버를 Type에서 제외하여 타입을 생성한다.

`Exclude<Type, ExcludedUnion>`타입을 사용한 이유는 먼거 동일하게 사용하는 키에 할당된 유니온타입에서 null만 제거하고 싶었고 사실 똑같이 복사후에 null만 지워도 되지만
유틸리티 타입을 활용해서 지정해보고 싶었던 마음이 더 컸던 것 같다.

```ts
export type DefaultChallenge = {
  challengeId: string;
  title: string;
  score: number;
  createdAt: string;
  updatedAt: string;
  tags: string[];
  isPass: boolean;
  content: string;
  answer: string;
  passCount: number;
  files: ChallengeS3File[] | [];
}

export type Challenge = Omit<DefaultChallenge, 'content' | 'answer' | 'passCount' | 'files'>;

export type ChallengeDetail = Omit<DefaultChallenge, 'isPass'>;

export type IndividualRanking = {
  challengerCnt: number;
  ranking: number | null;
  challengeRankId:string | null;
  passCount: number | null;
  totalScore: number | null;
  updatedAt: string | null;
};

export type ChallengeRanking = {
  user: User;
  ranking: Exclude<IndividualRanking['ranking'], null>;
  challengeRankId: Exclude<IndividualRanking['challengeRankId'], null>;
  passCount: Exclude<IndividualRanking['passCount'], null>;
  totalScore: Exclude<IndividualRanking['totalScore'], null>;
  updatedAt: Exclude<IndividualRanking['updatedAt'], null>;
};

export type Download = Pick<S3FileResponse, 'bucket' | 'key'>
```

`생각했던 것보다 이번주는 크게 어렵지는 않았던 것 같다.`<br />
`테스트도 생각보다 잘 통과를 하고 의도대로 기능도 완료가 되어서 기분이 좋았다.`<br />
`실무에서도 테스트 적용을 조금씩 해봐야 할 것 같은데 이 부분은 언제가 될지 잘 모르겠다.`<br />
`다음주에 어떤 내용이 나올지 더 기대된다. 요즘처럼 내가 객관적으로 성장했다고 느끼게 해주는 날이 없었던 것 같은데`<br />
`최근은 개발이 더 재밌어 진 것 같다.`<br />
