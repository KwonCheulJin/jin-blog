---
title: 프론트엔드 생존코스 3기 3주차 회고
date: '2023-04-28'
category: 주간회고, 메가테라, 프론트엔드 생존코스, React, 리액트
description: 강의에서 배운 것을 실전에 적용해보자!
path: frontend-survival-week-in-review-3
image: megaptera-2
featured: true
---

## [3주차 데브노트](https://app.gitbook.com/o/rpCdeGOgdsnJBUGbANJL/s/Pv23gpr03QFWD8VRyZjc/week3)

## 1. 고민이 많았던 한주

현재 일을 하면서 타입스크립트 + 리액트를 사용하고 있지만 이번주 강의를 보고 과제를 작성하면서 이때까지 내가 사용했던 타입스크립트 + 리액트가
정말 기본중의 기본만 사용하고 있었구나라는 생각도 들고 아직 내 기술 역량이 한참 부족하구나를 느끼게 된 한주 였다.

그래도 한주에 하나라도 얻어가는게 있는 것 같아서 생존코스를 선택한거에 후회는 없고 앞으로의 강의가 더 기대가 된다.

## 2. 강의내용을 실제로 적용해보기

강의에서 특정 타입의 배열을 특정 벨류값을 통해서 filter된 배열로 넘겨주는 공통함수를 정의해주신걸 보고 관리자쪽 리팩토링하는 중이었는데 저 부분을 활용해서 하면 좋겠다는 생각을 했다.

그래서 강의때 배운 부분을 응용해서 관리자 내에서 사용하는 검색폼안의 중복 선택된 필터키워드들을 `키워드1,키워드2,키워드3`같이 파라미터로 보내줘야했었는데 해당 함수를 활용해서 진행해보았다.

```typescript
function select<ItemType, ValueType>(
 items: ItemType[],
 key: keyof ItemType,
 value: ValueType,
) {
 return items.filter((item) => item[key] === value);
}
```

```typescript
export interface FilterId {
  tagId?: string;
  questionCategoryId?: string;
  capaTestTypeId?: string;
  courseCategoryId?: string;
  courseLevelId?: string;
  id?: string;
}

export interface FilterType extends FilterId{
  name: string;
  isChecked?: boolean;
}
```

```typescript
import { FilterType } from '@src/components/admin/body/common/filter';

/**
 * @description 선택 된 카테고리 이름을 filter.category로 사용되는 문자열로 변경 해주는 함수
 * @author Charles
 * @param categories 현재 카테고리 선택 여부 리스트
 */
export default function select<T extends FilterType>(items: T[]):string {
  return (
    items
      .filter(item => item.isChecked)
      .map(item => item.name).join(',')
  );
}
```

![search-filter.png](/images/frontend-survival-week-in-review-3/search-filter.png)
![query-parameters.png](/images/frontend-survival-week-in-review-3/query-parameters.png)

그리고 `keyof` 문법을 활용해서 해당 object의 key값을 가져와
object[key]를 활용해서 내가 원하는 값을 추출하는 작업도 공통 컴포넌트 리팩토링 하는 작업에서 활용해보았다.

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

## 3. 관리자 리팩토링 2회차 완료

이전에 작업했던 컴포넌트들이 중복코드가 너무 많아서 작업 해야 할 부분이 생각보다 많았다.
그러다보니 추가 및 삭제했던 코드의 양이 어마어마했다...

메가테라에서 한번 더 상기시킨 DRY(Don't Repeat Yourself)에 대해서 뼈저리게 느낀 한주였다.

전부터 이 개념을 염두해두고 했었으면 지금의 내가 이런 작업을 하지 않았을 텐데 하면서도 한편으로는 그때의 나에게는

이게 최선이었을 수도 있었을 것이다.

이번주를 계기로 조금 더 성장했다고 생각해야겠다.

![migration.png](/images/frontend-survival-week-in-review-3/migration.png)

`이번주는 강의에서 배운 것도 적용해보고 관리자 페이지를 리팩토링 하면서 배운 부분을 활용해서 적용해 본 부분이 가장 뿌듯하다`<br />
`다음주는 어떤 강의가 나를 반겨줄지 기대도 되고 앞으로 난이도가 증가하면 내가 소화 할 수 있을까 하는 걱정도 되지만 잘 할 수 있을거라 생각된다.`<br />
`이번주도 정말 고생많았고 다음주도 새로운 기능 잘 적용하고 강의도 열심히 들어서 또 성장하는 한주가 되자!`<br />
