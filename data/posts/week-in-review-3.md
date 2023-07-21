---
title: 7월 3주차 주간 회고
date: '2023-07-21'
category: 주간회고, 프론트엔드, react-hook-form, E2E test, playwright
description: playwright에서 로그인 테스트를 자동 설정 해보자!
path: week-in-review-3
image: week-in-review-3
featured: true
---

## 이번주 한 일

### 회원가입 중복확인 react-hook-form으로 기능 만들기

이번주는 로그인과 회원가입 api가 완료되어있어서 화면작업도 같이 진행하였다.

회원가입 같은 경우는 기업을 등록 해야해서 기입해야 할 인풋이 많았는데 화면은 `react-hook-form`을 이용해서 구성하였다.

그 중에서 내가 기본 기능에 추가로 넣어야 할 기능이 아이디 중복확인 및 기업의 법인등록번호, 사업자등록번호가 중복확인이 진행되었을 때 validation이 비동기적으로 완료가 되어야하는 부분이 있었다.

그래서 중복확인 작업 후 서버에서 400번대 에러가 발생되면 특정 인풋의 에러메세지를 보여줘야 했는데 그걸 위해서 내가 사용한 방법은 `useForm`안에 `trigger`와 `setError`를 사용해서 작업을 진행 하였다.

```js
  const form = useForm<Signup>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      account: '',
      password: '',
      confirmPassword: '',
      name: '',
      email: '',
      cellPhone: '',
      department: '',
      position: '',
      officePhone: '',
      companyKorName: '',
      companyEngName: '',
      repKorName: '',
      repEngName: '',
      corpRegNo: '',
      bizRegNo: '',
      korAddress: '',
      engAddress: '',
    },
  });

const handleCheckAccount = async () => {
  setIsChecked(false);
  const accountValue = form.getValues('account');
  if (!accountValue) {
    return;
  }
  try {
    const { status } = await apiService.checkAccount({
      account: accountValue,
    });
    status === 200 && (await form.trigger('account'));
    setIsChecked(true);
  } catch (e: unknown) {
    if (axios.isAxiosError<{ e?: { message: string } }>(e)) {
      if (e.response?.status === 409) {
        form.setError(
          'account',
          { message: '아이디가 존재합니다.' },
          { shouldFocus: true },
        );
      }
      if (e.response?.status === 400) {
        form.setError(
          'account',
          { message: '잘못된 요청입니다.' },
          { shouldFocus: true },
        );
      }
    }
  }
};
```
`trigger`를 사용하게되면 validation을 특정 조건이 완료될 때까지 늦출 수 있다. 그래서 나는 api 응답이 성공적으로 진행이 되었을 때 `trigger`가 동작되도록 하였다.

그리고 만약 응답이 에러로 넘어올 경우는 `serError`로 선택한 인풋의 에러메세지가 보이도록 진행하였다.

```js
<FormField
  control={form.control}
  name="account"
  render={({ field }) => (
    <InputForm
      className={`h-[44px] rounded-lg ${
        form.formState.errors.account
          ? 'focus:border-red-900'
          : ''
      }`}
      valueType="text"
      placeholder="아이디를 입력해주세요"
      name={field.name}
      onChange={field.onChange}
      value={field.value}
      ref={field.ref}
      // eslint-disable-next-line react/no-children-prop
      children={
        <FormButton
          className="h-[44px] min-w-[108px] max-w-[108px] rounded-lg "
          type="button"
          name="중복확인"
          onClick={handleCheckAccount}
        />
      }
    />
  )}
/>
```

### playwright에서 로그인 테스트를 자동으로 수행하게 설정

내가 개발하고 있는 프로젝트는 관리자와 사용자 권한이 다르기때문에 테스트도 관리자와 사용자 그리고 비회원 이렇게 3가지로 테스트를 진행하려고 테스트 케이스를 작성하였다.

먼저 관리자가 로그인하고 관리자 관련 테스트가 종료되면 사용자로 로그인하는 방법을 자동으로 세팅해놓고 진행을 하고 싶었다.

그리고 [playwright-Authentication](https://playwright.dev/docs/auth)를 참고해서 셋업을 진행하였다.

예제에는 로그인 사용자에 대한 분기가 없어서 나는 관리자(admin), 사용자(user), 비회원(unauth)로 테스트 파일을 작성할때 spec앞에 작성하도록 기준을 정해놓고 setup파일을 각각의 프리픽스에 맞게 의존하도록 설정을 하였다.

그리고 처음 관리자 로그인이 끝나고 사용자 테스트를 진행할 때 관리자 로그인 파일을 테스트에서 제외시키지 않으면 계속 관리자로 로그인 되어있는 상태여서 사용자와 비회원 테스트에서는 관리자 로그인을 제외하고 비회원은 사용자, 관리자 로그인을 모두 제외해서 테스트에 간섭이 없도록 진행하였다.

`playwright.config.ts`
```js
import { PlaywrightTestConfig, devices } from '@playwright/test';
import path from 'path';

export const USER_STORAGE_STATE = path.join(
  __dirname,
  'playwright/.auth/user.json',
);
export const ADMIN_STORAGE_STATE = path.join(
  __dirname,
  'playwright/.auth/admin.json',
);

const config: PlaywrightTestConfig = {
...

  projects: [
    {
      name: 'adminSetup',
      testMatch: '**/*.admin.setup.ts',
    },
    {
      name: 'logged in admin',
      testMatch: '**/*.admin.spec.ts',
      dependencies: ['adminSetup'],
      use: {
        ...devices['Desktop Chrome'],
        storageState: ADMIN_STORAGE_STATE,
      },
    },
    {
      name: 'userSetup',
      testMatch: '**/*.user.setup.ts',
    },
    {
      name: 'logged in company',
      testMatch: '**/*.user.spec.ts',
      dependencies: ['userSetup'],
      use: {
        ...devices['Desktop Chrome'],
        storageState: USER_STORAGE_STATE,
      },
      testIgnore: ['**/*.admin.setup.ts'],
    },
    {
      name: 'non-member',
      testMatch: '**/*.unauth.spec.ts',
      use: {
        ...devices['Desktop Chrome'],
      },
      testIgnore: ['**/*.admin.setup.ts', '**/*.user.setup.ts'],
    },
  ],
};
export default config;

```
`global.admin.setup.ts`
```js
import { test as setup, expect } from '@playwright/test';
import { ADMIN_STORAGE_STATE } from '../playwright.config';

setup('시스템 관리자 로그인', async ({ page }) => {
  await page.goto('/');

  await page.getByRole('textbox', { name: '아이디' }).fill('admin');
  await page.getByRole('textbox', { name: '비밀번호' }).fill('password');
  await page.getByRole('button', { name: '로그인' }).click();

  await expect(page.getByText(/Home/)).toBeVisible();

  await page.context().storageState({ path: ADMIN_STORAGE_STATE });
});
```
`global.admin.setup.ts`
```js
import { test as setup, expect } from '@playwright/test';
import { USER_STORAGE_STATE } from '../playwright.config';

setup('기업 로그인', async ({ page }) => {
  await page.goto('/');

  await page.getByRole('textbox', { name: '아이디' }).fill('company');
  await page.getByRole('textbox', { name: '비밀번호' }).fill('password');
  await page.getByRole('button', { name: '로그인' }).click();

  await expect(page.getByText(/Home/)).toBeVisible();

  await page.context().storageState({ path: USER_STORAGE_STATE });
});
```

![e2e-test.png](/images/week-in-review-3/e2e-test.png)

관리자, 사용자, 비회원 테스트가 잘 진행되어서 뿌듯했다.

## 앞으로 추가 해야 할 일

현재는 E2E테스트를 진행할 때 실제 api를 호출하고 있는 상태이다.

이 부분을 playwright Mock Api를 통해서 호출이 제대로 되는지에 대한 검증을 진행하도록 수정해야 한다.

그리고 웹 화면을 사용자가 종료 할 때 해당 사용자의 토큰을 지우도록 백엔드분의 요청이 있어서 window beforeunload 이벤트를 사용해서 토큰을 지우도록 진행하였는데 문제점이 beforeunload는 새로고침까지 이벤트 감지를 하도록 되어있어서 이부분에 대한 추가 수정이 필요하다.



