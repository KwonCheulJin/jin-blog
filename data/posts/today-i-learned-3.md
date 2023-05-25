---
title: 반복되는 구조의 타입을 줄이기 위한 노력(API Response편)
date: '2023-05-25'
category: TIL, 타입스크립트, Typescript, Utility Types
description: Utility Types를 활용해서 제거해보자
path: today-i-learned-3
image: today-i-learned-3
featured: true
---

## Record, 제네릭을 이용해서 반복되는 구조의 타입을 줄여보자!(API Response편)

### 개선하게 된 계기

서비스를 만들면서 자연스럽게 api통신을 많이하게 된다. 그러다 보면 response에 대한 데이터를 활용하게 되는데 이전에는 비슷한 구조임에도 공통 타입을 정의해놓고
사용하기보다 반복적으로 타입을 재생산해서 작업하기에 급급했다.
최근데 이런저런 고민을 하던 중에 타입스크립트를 활용을 적극적으로 해봐야겠다는 생각이 들어서 API Response의 반복되는 구조를 공통 타입으로 만들고 해당 타입을
재사용 하기 위해 개선작업을 진행하였다.

### 반복되는 구조의 타입

```js
export type Payload1 = {
  data: {
    list: List[]; // <-- 해당 리스트 부분을 제외한 나머지 구조는 동일하다
    meta: ListMeta;
    links: {
      current: string;
    };
  };
  status: number;
}

export type Payload2 = {
  data: Data;
  status: number;
}
```

위의 구조의 형식의 타입이 지속적인 재생산이 되고 있는 상황이었고 이 부분을 어떻게 하면 재사용 타입으로 만들 수 있을지 고민을 해보았다.

해당 부분을 타입스크립트의 동적타입을 위해서 제네릭과 유틸리티 타입을 이용하면 가능 하겠다고 생각을 하게 되었다.

### 고민의 결과

`Payload1`과 `Payload2`의 공통점 파악을 먼저 하였다.

먼저 api 호출 후 받는 응답값에 아래 같은 구조로 값을 받아오게 된다. `data`와 `status`가 동일하게 되어있어서 해당 부분의 공통 타입을 제작 하였다.

```js
{
  data: {},
  status: 200,
}
```

그래서 공통 타입을 먼저 지정해 주고 `data`안에 값이 어떤게 들어갈지 모르니 제네릭으로 동적 타입을 지정해 주었다.

`Payload 1,2를 같이 사용하기 위한 타입`

```js
export type Payload<T> = {
  data: T
  status: number;
}
```

그리고 `Payload1`은 기본적으로 `메타데이터`와 `links`라는 값이 공통적으로 가지고있어 기본타입을 지정해 주었고

이후 리스트가 들어가는 부분은 `listA`, `listB`이런식으로 이름이 변경되기 때문에 해당 부분에 대해서 이름과 데이터 타입을 사용하는 쪽에서 주입해주는 방식을 생각해서 제작하게 되었다.

`Payload 1의 동적타입 지정을 위한 타입`

```js
export type ListPayloadDefault = {
  meta: ListMeta;
  links: {
    current: string;
  };
}

export type PayloadData<K extends string, V> = Record<K, V> & ListPayloadDefault
```

### 사용방법

현재 `axios`를 사용하고 있어서 axios를 활용한 api 요청 함수에 대한 예제이다.

```js
export const getList = ():AxiosPromise<ListPayload> => apiClient.get(`/api/list`);
export const getDetail = (id: string):AxiosPromise<DetailPayload> => apiClient.get(`/api/detail/${id}`);
```

<h3 style="text-align: center;"> ⬇️ </h3>

```js
export const getList = ():AxiosPromise<Payload<PayloadData<'list', List[]>>> => apiClient.get('/api/list');
export const getDetail = (id: string):AxiosPromise<Payload<Detail>> => apiClient.get(`/api/detail/${id}`);
```

이전 사용법이랑 비교를 해보면 해당 타입에 대해서 명확하지 않을 수도 있다. 그리고 Payload이름을 사용한 부분은 redux PayloadAction에 같이 사용하려고 네이밍을 이렇게 하였는데
베스트는 아닌 것 같다는 생각이 든다.

그래도 반복적인 일을 진행하기 것보다 반복적인 구조를 재사용하게 바꾸는 작업을 통해서 타입스크립트의 기능을 잘 활요하면 비슷한 타입 지정 작업을 조금은 줄일 수 있을 것 같다는 생각을 하였다.

해당 부분을 바꾼다고 해서 시스템의 영향을 주지는 않지만 작업자가 사용한다고 생각해보면 재사용 가능한 부분을 잘 작성해놓았을 때 다음에 사용하는 사람이 구조 파악 및 사용을 손쉽게 할 수 있지 않을까? 라는 생각을 해본다.
