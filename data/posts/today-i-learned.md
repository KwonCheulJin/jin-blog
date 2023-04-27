---
title: 타입스크립트 keyof ObjectType 사용시 겪었던 문제
date: '2023-04-27'
category: TIL, 리액트, React, Typescript
description: 쳇GPT 너는 나의 친구 고마워! 문제는 결국 내 자신이었던 것...
path: today-i-learned
image: today-i-learned
featured: true
---

## 1. 타입스크립트 + 리액트 개발 중 오늘 겪었던 에러 기록

```typescript
  type Props = {
    title: string;
    key: keyof FilterId;
    filterSearch: FilterType[];
    setFilterSearch: React.Dispatch<React.SetStateAction<FilterType[]>>;
  }
  export default function FilterableSearchForm({
    title, key, filterSearch, setFilterSearch,
  }:Props):ReactElement {
    console.log('🚀 ~ file: FilterableSearchForm.tsx:30 ~ key:', key);

    const onToggleCheckBox = useCallback((e: React.ChangeEvent<HTMLDivElement>) => {
      const { value, checked } = e.target as HTMLInputElement;

      setFilterSearch(prev => prev.map(item => (
        item[key] === value ? { ...item, isChecked: checked } : item
      )));

    }, [key, setFilterSearch]);
  ...
  }
```

```typescript
  <FilterableSearchForm
    title="카테고리 검색"
    key="courseCategoryId"
    filterSearch={categorySearch}
    setFilterSearch={setCategorySearch}
  />
```

관리자 화면에서 체크박스를 이용해서 중복 선택 필터 검색 기능을 담당하는 공용 컴포넌트로 만드는 작업을 진행 중이었다.

이번주에 메가테라에서 배운 강의에서 `keyof` 문법을 활용해서 해당 object의 key값을 가져와
object[key]를 활용해서 내가 원하는 값을 추출하는 작업을 수행하려고 했다.

![key-type.png](/images/today-i-learned/key-type.png)

위에서 보이는 것처럼 해당 key타입들이 정의되어있어서 내가 필요로하는 key값을 넘겨주었는데 아래의 화면처럼 key가 undefined로 넘어와서 조금 의아했다.

![console-log.png](/images/today-i-learned/console-log.png)

해당 부분을 검색했을 때 내가 원하는 성과를 얻지 못해서 chat GPT에 내가 사용한 코드를 이용해서 어떤 부분이 잘 못 되었는지 질문을 하였다.

`GPT 답변`
> 제공하신 코드 스니펫을 기준으로 볼 때 명백한 구문이나 논리적 오류는 없는 것 같습니다.
> 'key'는 React에서 예약된 키워드이며 React에서 목록의 요소 ID를 추적하는 데 사용됩니다. 따라서 prop 이름으로 key를 사용하지 않는 것이 좋습니다.
> React의 내장 기능과 잠재적인 충돌을 피하기 위해 filterKey와 같은 다른 prop 이름을 사용하는 것이 좋습니다. 그런 다음 구성 요소에서 key 대신 filterKey를 사용할 수 있습니다.

리액트에서 key값을 해당 컴포넌트 또는 html 태그들이 다른 태그라는걸 알기 위해서 key값을 사용하는데 내가 그 부분을 간과했던 것이다.

해당 부분이 에러로 직접적으로 언급해주지는 않지만 내가 기능을 만드는데 있어서 제대로 동작하지 않았던 원인을 정확히 모르는 부분이 문제였던 것이다.

`오늘 있었던 일을 계기로 해당 Props 타입을 정의할 때 Props의 이름도 의미가 명확하게 정의하도록 하고 해당 이름이 예약어가 아닌지 확인할 필요도 있다고 느꼈다.`

```typescript
import { ReactElement, useCallback } from 'react';

import styled from 'styled-components';
import Palette from '@style/Palette';

import { v1 } from 'uuid';

import HorizontalForm from '@components/common/body/form/HorizontalForm';
import CheckBox from '@components/common/body/button/CheckBox';
import { FilterType, FilterId } from '@src/components/admin/body/common/filter';

type StyleProps = {
  filterKey: keyof FilterId;
}

type Props = {
  title: string;
  filterSearch: FilterType[];
  setFilterSearch: React.Dispatch<React.SetStateAction<FilterType[]>>;
} & StyleProps

/**
 * @description 중복 선택 가능 필터가능 폼
 * @author Charles
 * @param title 폼 제목
 * @param filterKey 해당 리스트 아이디로 체크박스 값 추출 키
 * @param filterSearch 선택 된 필터 태그 리스트
 * @param setFilterSearch 선택 필터 태그 체크시 변경 setState
 */
export default function DuplicateFilterableSearchForm({
  title, filterKey, filterSearch, setFilterSearch,
}:Props):ReactElement {

  const onToggleCheckBox = useCallback((e: React.ChangeEvent<HTMLDivElement>) => {
    const { value, checked } = e.target as HTMLInputElement;

    setFilterSearch(prev => prev.map(item => (
      item[filterKey] === value ? { ...item, isChecked: checked } : item
    )));

  }, [filterKey, setFilterSearch]);

  const typeList = filterSearch?.map(item => (
    <CheckBox
      theme="admin"
      name={item.name}
      value={item[filterKey] ?? ''}
      key={v1()}
      isChecked={item.isChecked}
    >
      {filterKey === 'id' ? `${item.name}점` : item.name}
    </CheckBox>
  ));

  return (
    <HorizontalForm
      width="100%"
      contentWidth="100%"
      background={Palette.lightGreen01}
      title={title}
      padding="0px"
    >
      <CheckBoxTemplate
        filterKey={filterKey}
        onChange={onToggleCheckBox}
      >
        {typeList}
      </CheckBoxTemplate>
    </HorizontalForm>
  );
}

const CheckBoxTemplate = styled.div<StyleProps>`
  display: grid;
  grid-template-columns: repeat(${props => (props.filterKey === 'id' ? '5, 1fr' : '4, 1fr')});
  row-gap: 17px;
  padding: 17px 24px;
  width: 100%;
  label {
    max-width: 180px;
  }
`;
```

```typescript
<DuplicateFilterableSearchForm
  title="난이도 검색"
  filterKey="courseLevelId"
  filterSearch={levelSearch}
  setFilterSearch={setLevelSearch}
/>
```

`이렇게 마무리를 했고 내가 원했던 대로 잘 동작한다! 끝!`
