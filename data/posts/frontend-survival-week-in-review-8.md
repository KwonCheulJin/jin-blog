---
title: 프론트엔드 생존코스 3기 8주차 회고
date: '2023-06-03'
category: 주간회고, 메가테라, 프론트엔드 생존코스, styled-components, ThemeProvider, jest, React testing library,
description: CSS in JS로 디자인 적용하기
path: frontend-survival-week-in-review-8
image: review-8
featured: true
---

## [8주차 데브노트](https://jin-11.gitbook.io/jin-devnote/week8)

## 1. styled-components style 테스트 중 생긴 문제

`AppProvider.tsx`

```js
import { ThemeProvider } from 'styled-components';
import { useDarkMode } from 'usehooks-ts';
import darkTheme from '../styles/darkTheme';
import defaultTheme from '../styles/defaultTheme';

export default function AppProviders({ children }: { children: React.ReactNode }) {
  const { isDarkMode } = useDarkMode();
  const theme = isDarkMode ? darkTheme : defaultTheme;

  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  );
}
```

해당 컴포넌트는 테스트 컴포넌트와 `App`컴포넌트에서 `ThemeProvider`를 적용해주기 위해 만든 컴포넌트이다.

`test-utils.tsx`

```js
/* eslint-disable import/no-extraneous-dependencies */
import { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import AppProviders from '../providers/AppProviders';

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: AppProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
```

테스트 컴포넌트들도 테스트를 진행하기 위해서 전부다 `ThemeProvider`로 감싸줘야 한다.

`defaultTheme.ts`

```js
const defaultTheme = {
  colors: {
    body: '#FFF',
    background: 'linear-gradient(134.22deg, #F89E21 0.7%, #FF6400 65.66%)',
    main: {
      text: '#FFF',
      strong: '#FF8400',
      primary: '#FF8400',
      secondary: '#FFA454',
      background: '#FFF',
      activeBackground: '#FFF1DC',
      activeMenuBackground: '#FFF1DC',
      activePrimary: '#D87000',
      border: '#FFF',
      activeBorder: '#FF8400',
      separation: '#616161',
    },
    sub: {
      text: '#000',
      primary: '#44272B',
      secondary: '#6A6A6A',
      background: '#F4F4F4',
      activeBackground: '#FFF',
      activePrimary: '#170A0C',
      separation: '#F4F4F4',
    },
  },
};

export default defaultTheme;
```

`OrderButton.tsx`

```js
import styled from 'styled-components';
import { useDarkMode } from 'usehooks-ts';

import Image from '../common/Image';

type Style = {
  isDarkMode: boolean;
}

const OrderButtonContainer = styled.button.attrs({
  type: 'button',
})<Style>`
  width: 47rem;
  height: 59.1rem;

  background: ${(props) => (props.isDarkMode
    ? props.theme.colors.main.secondary : props.theme.colors.main.background)};
  border-radius: 4rem;
  border: 0;
  cursor: pointer;
  &:hover {
    background: ${(props) => props.theme.colors.main.activeBackground};
    border: 3px solid ${(props) => props.theme.colors.main.activeBorder};
  }
`;

const Title = styled.p<Style>`
  color: ${(props) => (props.isDarkMode
    ? props.theme.colors.main.text : props.theme.colors.sub.text)};
  margin-top: 6.8rem;

  font-family: 'Jalnan OTF';
  font-style: normal;
  font-weight: 700;
  font-size: 4.8rem;
  line-height: 5.1rem;

  text-align: center;
  letter-spacing: -0.03em;
`;

type Props = {
  image: string;
  name: string;
  handleClick: () => void;
}

export default function OrderButton({
  image, name, handleClick,
}:Props) {
  const { isDarkMode } = useDarkMode();
  return (
    <OrderButtonContainer
      data-testid="order-button"
      isDarkMode={isDarkMode}
      onClick={handleClick}
    >
      <Image
        aria-label={`${image}`}
        width="18.2rem"
        height="18.3rem"
        src={`/images/${image}.png`}
        alt={`${image}`}
      />
      <Title isDarkMode={isDarkMode}>{name}</Title>
    </OrderButtonContainer>
  );
}
```

`OrderButton.test.tsx`

```js
import { useDarkMode } from 'usehooks-ts';
import userEvent from '@testing-library/user-event';
import {
  render, renderHook, screen, waitFor,
} from '../../utils/test-utils';
import OrderButton from './OrderButton';

const context = describe;

describe('OrderButton', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  const handleClick = jest.fn();

  function renderOrderButton() {
    render(
      <OrderButton
        name="매장 주문"
        image="fastfood"
        handleClick={handleClick}
      />,
    );
  }
  context('테마가 기본테마 일 때', () => {
    it('마우스가 버튼 위에 있을 때 버튼 배경색이 #FFF1DC이다', () => {
      renderOrderButton();

      const orderButton = screen.getByTestId('order-button');
      userEvent.hover(orderButton);
      expect(orderButton).toHaveStyle(`
        background: #FFF1DC
      `);
    });
  });

});
```

![week-8-problem.png](/images/frontend-survival-week-in-review-8/week-8-problem.png)

HomePage에 매장 주문 버튼을 테스트하는 과정에서 문제가 발생하다.
기본적으로 스타일 컴포넌트에 지정된 스타일은 테스트상 크게 문제가 없었으나 남겨놓은 코드 테스트에서 userEvent.hover를 이용해서 마우스가 버튼 위에 위치했을 때 버튼의 배경색이 지정된 색으로 잘 나오는지에 대한 테스트를 진행해보고 싶었다. 하지만 정상적으로 진행이 되지 않고 스샷과 같은 에러를 발생하고 있어서 해당 부분에 대한 테스트를 해결하지는 못했다.

[jest-styled-components](https://github.com/styled-components/jest-styled-components) 해당 라이브러리를 사용해서 진행해보려 했으나
styled-components ThemeProvider를 전역으로 렌더링 해주는 컴포넌트를 사용하고 있어서 렌더부분에서 막혀서 더는 진행해보지는 못했다.

이번주에 과제를 진행하면서 스타일을 적용하는 부분에서는 크게 부담이 없었으나 해당 스타일에 대한 검증을 어떻게 진행 할 것인가에 대한 고민과 코드로 테스트를 하는 과정에 한계가 있다는 점을 느끼게 된 한주 였다.

테스트를 지속적으로 반복하면서 테스트에 대한 부담도 크게 줄어 들었지만 스타일 적용한 컴포넌트들에 대해서 검증하는 과정에 대한 방법론을 많이 배워야 할 것 같다.

## 2. 앞으로 남은 4주는 더 열심히

이번주도 크게 무리가 가지는 않았지만 회사에서 지금 하고 있는 서비스에 대한 일이 아닌 다른 사업에 대한 개발을 진행하게 되어서 회의만 엄청했던 한주 였다.
평일에 과제에 대해서 집중도 잘 하지 못했던 것 같은데 주말에 시간이 생겨서 몰아서 다 진행했다.
중간에 쉬고싶기도 하고... 이정도까지만 할까... 생각도 들었지만 그래도 E2E까지 마무리해서 이상없이 끝내서 나름 뿌듯하다.
배우고 있는 부분이 현재상황에 바로 적용 해 볼수는 없지만 그래도 이 과정을 통해서 예전보다는 바라보는 관점이나 생각해야 되는 부분이 개선되어가고 있다고 생각이 든다.
지속적으로 해야되는 부분이지만 일단 단기 목표로 남은 4주도 과제들 밀리지 말고 다 끝마치고 싶다.

`이번주도 너무 고생했다. 이또한 지나간다고 생각하고 잡념은 조금 버리고 해야 할 것에 집중하도록 하자!`<br />
