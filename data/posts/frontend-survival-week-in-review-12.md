---
title: 프론트엔드 생존코스 3기 12주차 회고
date: '2023-06-30'
category: 주간회고, 메가테라, 프론트엔드 생존코스, jest, React testing library, E2E, storybook
description: 온라인 쇼핑몰을 만들어보자! - 마무리
path: frontend-survival-week-in-review-12
image: review-12
featured: true
---

## 쇼핑몰 관리자 페이지 제작을 끝으로 메가테라 마무리

메가테라 마지막 주에는 쇼핑몰 관리자 페이지 제작으로 강의는 마무리가 되었다.

쇼핑몰 제작에는 [swr](https://swr.vercel.app/ko)을 활용한 api 데이터를 가져와서 상태를 유지하는 것과 form을 사용하는 부분을 [React hook Form](https://react-hook-form.com/)을 활용해서 제작해 보았다.

이번에 새로운 프로젝트에서 swr을 사용할 예정이었는데 사용법에 대해서 간략하게 알아가는 시간이어서 좋았다.

쇼핑몰 제작이 마무리 되고 사실 쇼핑몰 제작하는 부분부터는 크게 흥미를 못느꼈던 것 같다. 나한테 주어진 챌린지가 없는 느낌이었다고 해야하나...

그래도 매주 할당량을 채우고 주간회고를 작성하는 것과 테스트 및 상태관리에 대해서 여러 방향에 대해서 알 수 있어서 좋은 시간이었다.

앞으로 개발을 하면서 메가테라에서 배웠던 부분을 상기시키면서 여기 저기에 적용을 해보면서 발전 시키도록 해봐야 겠다.

## 새로운 프로젝트 시작

### 1. Next.js 13에서 storybook, jest, playwright 사용을 위한 세팅

`.storybook/main.ts`

```js
import type { StorybookConfig } from "@storybook/nextjs";
import * as path from 'path';

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    {
      name: '@storybook/addon-styling',
      options: {
        postCss: true,
      },
    },
  ],
  framework: {
    name: "@storybook/nextjs",
    options: {
      nextConfigPath: path.resolve(__dirname, '../next.config.js'),
    },
  },
  docs: {
    autodocs: "tag",
  },
  staticDirs: ['../public'],
};
export default config;

```

`.storybook/preview.ts`

```js
import type { Preview } from "@storybook/react";
import '../src/styles/globals.css';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
```

storybook을 사용하게 된 계기는 새로 시작한 프로젝트에서 프론트엔드 컴포넌트 Documents 기록을 남겨야 하는 부분이 있었는데
next에서 jsdoc, docz를 사용해서 doc 페이지를 적용하는 부분에서 조금 애로사항이 있어서 적용하지 못하고 여러 대안중에서 컴포넌트를 화면상에 테스트도 가능하고 Docs까지 자동으로 생성해주는 storybook을 사용하게 되었다.

`stories/components/CustomButton.stories.ts`

```js
import type { Meta, StoryObj } from '@storybook/react';

import CustomButton from '@/components/CustomButton';

const meta: Meta<typeof CustomButton> = {
  title: 'components/CustomButton',
  component: CustomButton,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CustomButton>;

export const Primary: Story = {
  args: {
    children: 'Primary',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Secondary',
    variant: 'secondary',
  },
};

export const Destructive: Story = {
  args: {
    children: 'Destructive',
    variant: 'destructive',
  },
};

export const Outline: Story = {
  args: {
    children: 'Outline',
    variant: 'outline',
  },
};
export const DarkBlue1: Story = {
  args: {
    children: 'DarkBlue1',
    variant: 'darkBlue1',
  },
};
```

![shadcn-ui-button.png](/images/frontend-survival-week-in-review-12/shadcn-ui-button.png)

`stories/components/MaterialButton.stories.ts`

```js
import type { Meta, StoryObj } from '@storybook/react';

import MaterialButton from '@/components/MaterialButton';

const meta: Meta<typeof MaterialButton> = {
  title: 'components/MaterialButton',
  component: MaterialButton,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof MaterialButton>;

export const LightBlue: Story = {
  args: {
    children: 'LightBlue',
    variant: 'filled',
    size: 'lg',
    className: 'bg-darkBlue1',
  },
};
```

![material-tailwind-button.png](/images/frontend-survival-week-in-review-12/material-tailwind-button.png)

컴포넌트를 구성할 때 프로젝트 기간의 제약이 있어서 styled-component로 스타일을 구현하는 방법보다 tailwindCSS를 사용해서 제작하는 방향으로 스팩을 구성하면서 tailwindCSS와 호환성이 좋은 ui library - [shadcn/ui](https://ui.shadcn.com/)을 사용하였다.

해당 라이브러리로 버튼 컴포넌트를 테스트로 작성을 해보았는데 docs에서 컴포넌트의 옵션에 대해서 자세하게 표시해주고 있어서 상당히 편리했다.

하지만 내가 원하는 컴포넌트가 없는 경우도 있어서 이를 보강하기 위해서 추가로 [Material-tailwind](https://www.material-tailwind.com/docs/react/installation)를 사용하였다.

material-tailwind의 버튼 컴포넌트도 동일하게 사용해 storybook을 이용해서 docs도 확인해 보았는데 shadcn/ui에 비해서는 많이 축약이 되어 있어서 docs 기능이 충분히 표현되지 않아 필요한 부분만 사용하려고 한다.

`jest.config.js`

```js
import nextJest from 'next/jest'

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
}

export default createJestConfig(customJestConfig)
```

`jest.setup.js`

```js
// Optional: configure or set up a testing framework before each test.
// If you delete this file, remove `setupFilesAfterEnv` from `jest.config.js`

// Used for __tests__/testing-library.js
// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect'
```

`playwright.config.js`

```js
import { PlaywrightTestConfig, devices } from '@playwright/test'
import path from 'path'

const PORT = process.env.PORT || 3000

const baseURL = `http://localhost:${PORT}`

const config: PlaywrightTestConfig = {
  timeout: 30 * 1000,
  testDir: path.join(__dirname, 'e2e'),
  retries: 2,
  outputDir: 'test-results/',
  webServer: {
    command: 'npm run dev',
    url: baseURL,
    timeout: 120 * 1000,
    reuseExistingServer: !process.env.CI,
  },

  use: {
    baseURL,
    trace: 'retry-with-trace',
  },

  projects: [
    {
      name: 'Desktop Chrome',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
    {
      name: 'Desktop Firefox',
      use: {
        ...devices['Desktop Firefox'],
      },
    },
    {
      name: 'Desktop Safari',
      use: {
        ...devices['Desktop Safari'],
      },
    },
    // Test against mobile viewports.
    // {
    //   name: 'Mobile Chrome',
    //   use: {
    //     ...devices['Pixel 5'],
    //   },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: devices['iPhone 12'],
    // },
  ],
}
export default config
```

jest, playwright 세팅은 [Next.js - Testing](https://nextjs.org/docs/pages/building-your-application/optimizing/testing)을 참고해서 작성하였다.

## 느낀점 및 방향

길게만 느껴졌던 3개월의 강의가 모두 종료되었다.

나름 열심히 했고 포기하지 않았다는 거에 잘했다고 하고 싶다.

앞으로는 이제부터 배운 것을 내가 어떻게 활용하기에 달려있는 것 같다. 강의는 종료되었지만 나한테는 다시 또 미션을 찾아서 도전해봐야 겠다고 생각을 했다.

이후에는 새로운 프로젝트에 집중을 하면서 메가테라에서 배웠던 스토어나 테스트를 잘 활용해보고 추가로 원티드 프리온보딩을 도전해보려 한다.

이력서도 다시 작성을 잘 해보는 시간을 갖고 앞으로 어떻게 나아갈 것인가에 대해서 고민하는 시간을 가져야겠다.

3개월 수고했고 더 먼 미래를 위해서 계속해서 공부하고 힘내보자!
