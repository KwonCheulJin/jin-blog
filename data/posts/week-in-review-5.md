---
title: 8월 1주차 주간 회고
date: '2023-08-11'
category: 주간회고, 프론트엔드, css, 함께자라기
description: 함께 자라기를 읽고 나서...
path: week-in-review-5
image: week-in-review-5
featured: true
---

## 이번주 한 일

### 화면작업 중 발생한 문제

관리자 화면을 작업하다가 발생한 문제였는데 특정 정보를 입력할 수 있는 인풋이 들어있는 컴포넌트를 추가 버튼을 클릭해서 추가를 여러개 했을 때 이상하게 전체 html에서 스크롤바가 생기는 현상이었다.

![select-css-error-1.webp](/images/week-in-review-5/select-css-error-1.webp)

예전에 리버스쿨을 만들때에도 이와 비슷한 상황을 겪은 적이있어서 그때 했던 방법으로 문제점을 찾기 시작했다. 내가 의도치 않은 화면 밀림 현상이 발생하는 이유 중 하나는 특정 엘리먼트가 absolute 속성을 가지고 있을때 그 엘리먼트를 감싸고 있는 부모 컴포넌트에서 relative로 설정하지 않았기 때문에 발생하는 현상이었다.

어디에서 문제가 있는지 찾아보던 중에 정보를 입력하는 컴포넌트 안에서 사용하는 셀렉트에서 문제가 있었다.

![select-css-error-2.webp](/images/week-in-review-5/select-css-error-2.webp)

문제를 발견하고 셀렉트 감싸고 있는 컴포넌트의 최상위 div태그에 relative 속성을 추가해서 문제를 해결하였다.

```js
import { useState } from 'react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import * as SelectPrimitive from '@radix-ui/react-select';
import { FaChevronDown } from 'react-icons/fa6';
import { v1 } from 'uuid';
import { Label } from '@/components/ui/label';

type SelectItem = {
  label: string;
  value: string;
};

type Props = {
  id: string;
  label: string;
  placeholder: string;
  items: SelectItem[];
  onValueChange: (value: string) => void;
  defaultValue?: string;
};
export default function DefaultSelect({
  id,
  label,
  placeholder,
  items,
  onValueChange,
  defaultValue,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = (open: boolean) => {
    setIsOpen(open);
  };
  return (
    <div className="relative"> <-- 이곳
      <Label htmlFor={id}>{label}</Label>
      <Select
        onValueChange={onValueChange}
        defaultValue={defaultValue}
        onOpenChange={handleOpen}
      >
        <SelectTrigger
          id={id}
          className={`px-6 ${
            isOpen
              ? 'border-lightBlue2 text-textGray'
              : 'border-gray3 text-textGray'
          }`}
        >
          <SelectValue placeholder={placeholder} />
          <SelectPrimitive.Icon asChild>
            <FaChevronDown
              className={`h-[20px] w-[20px] transition-transform ${
                isOpen ? 'rotate-180 text-lightBlue2' : ''
              }`}
            />
          </SelectPrimitive.Icon>
        </SelectTrigger>
        <SelectContent>
          {items.map(item => (
            <SelectItem key={v1()} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
```

해당 셀렉트 컴포넌트는 `shadcn/ui`를 사용해서 만들었는데 ui 라이브러리를 사용할 때 이런 부분도 잘 체크를 해야 할 것 같다.

### 함께자라기를 다시 읽고 나서

함께자라기 책을 개발 시작하던 시기에 멘토님께 추천받아서 읽었던 책이었는데 현재의 상황에서 어떻게하면 함께 자랄수 있을지 고민도 되면서

현재 구성원이 나와 백엔드 둘인 상황에서 어떻게 더 발전적일 수 있을지 고민이 되는 상황이어서 최근에 여러 고민이 있어서 다시 읽어보게 되었다.

함께자라기에는 좋은 내용들이 많다. 최근에 티타임즈 영상에서 봤던 심리적 안전감이라는 주제의 영상이 있었는데 함께자라기안에 그 내용이 있었다는 것을 이번에 다시 알게 되었고

애자일 방식에 대해서 다시금 상기 시키게 되었던 시간이었다.

가장 기억에 남는 부분은 `애자일은 서로의 업무를 공유하고 상호 검토하는 협력을 통해 불행한 일을 '또는' 조건에서 '그리고' 조건으로 바꾸고 좋은 일의 상황에 대해서는 '그리고' 조건을 '또는' 조건으로 바꾸게 한다`

해당 부분은 불행한 일을 '또는' -> '그리고' 조건이 된다는 말은 만약 팀원들이 또는 조건이었을 때 한 팀원이라도 불행한 일을 겪게 되면 팀원 전체가 불행하게 되어버리게 되는데 그리고 조건으로 바뀌게 된다면 모든 팀원이 불행한 일을 겪을 때까지 불행하게 되지 않는 다는 의미를 가지고 있다.

반대로 좋은 일은 또는 조건일 경우에 한 팀원이 좋은 일을 겪게 되면 그 팀원으로 인해서 모든 팀원이 좋은 일을 겪는 상황으로 바뀔 수 있다는 말이 된다.

이 구절에서 과연 내가 속한 팀은 어떤가에 대해서 고민을 많이 해보았다.

작은 구성원인 회사이면 더 애자일스럽게 될 수 있을 거라 생각되지만 실상은 그렇지 않은 것 같다.

또 제가 너무 큰 것을 바라고 있는것은 아닌지라는 생각도 들게 되었다.

그럼에도 불구하고 함께자라기에 대한 부분은 놓고 싶지는 않다. 이곳이 아닌 다른 곳에서 함께자라기를 실천하고 싶다는 생각이 커지는 한 주였다.