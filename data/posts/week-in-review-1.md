---
title: 7월 1주차 주간 회고
date: '2023-07-10'
category: 주간회고, 프론트엔드
description: 한주동안의 나를 돌아보자
path: week-in-review-1
image: week-in-review-1
featured: true
---

## 이번주 한 일

### 지능형 cctv 성능시험 - 관리자페이지 화면 작업

shadcn/ui 라이브러리를 이용해서 현재 화면 작업을 진행하고 있다.
이번주는 목록과 등록 화면 작업을 진행하였다. 목록 화면은 특별하게 어려운 점은 없었으나
등록 화면은 react hook form을 사용하는 form 컴포넌트를 사용하면서 조금은 어려운 부분이 있었다.

`shadcn/ui - form`

```js
const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};
const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);
  const { getFieldState, formState } = useFormContext();

  const fieldState = getFieldState(fieldContext.name, formState);

  if (!fieldContext) {
    throw new Error('useFormField should be used within <FormField>');
  }

  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
};
const FormItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const id = React.useId();

  return (
    <FormItemContext.Provider value={{ id }}>
      <div ref={ref} className={cn('space-y-2', className)} {...props} />
    </FormItemContext.Provider>
  );
});
FormItem.displayName = 'FormItem';
...
```

먼저 `shadcn/ui` 라이브러리에서 컴포넌트를 사용하려면 해당 ui이 컴포넌트에 대해서 추가를 해서 사용해야 한다.
위 `form`처럼 컴포넌트를 추가하면 해당 컴넌트에 대해서 사용가능한 아이템이 생성되게 된다.

아래 컴포넌트는 `FormItem`에 `Input`이 들어가있는 컴포넌트의 중복이 발생해서 분리한 컴포넌트이다.

`inputFormItem.tsx`
```js
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ControllerRenderProps, FieldPath, FieldValues } from 'react-hook-form';

type Props<T extends FieldValues, TName extends FieldPath<T>> = {
  type: 'text' | 'number';
  label: string;
  placeholder: string;
  field: ControllerRenderProps<T, TName>;
};

export default function InputFormItem<
  T extends FieldValues,
  TName extends FieldPath<T>,
>({ type, label, placeholder, field }: Props<T, TName>) {
  const { value } = field;

  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <FormControl>
        <Input
          placeholder={placeholder}
          {...field}
          value={type === 'number' ? value.replace(/[^0-9]/g, '') : value}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  );
}
```

그리고 아래의 `Form`에서 `Field`부분을 추가로 분리해서 사용을 하도록 작업을 하고 싶었으나 컴포넌트 분리작업이 쉽지 않았다.
type을 맞추고 분리해서 시도를 해 보았으나 `Form`내부의 `input`이 정상적으로 동작하지 않는 버그가 발생해서 추가로 분리하는 작업은 중단하게 되었다.

`CodeCategoryForm.tsx`
```js
<Form {...form}>
  <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-8">
    <FormField
      control={form.control}
      name="categoryName"
      render={({ field }) => (
        <InputFormItem
          type="text"
          label="유형 이름"
          placeholder="등록할 유형을 입력하세요"
          field={field}
        />
      )}
    />
    <FormField
      control={form.control}
      name="description"
      render={({ field }) => (
        <InputFormItem
          type="text"
          label="설명"
          placeholder="유형에 대한 설명을 입력하세요"
          field={field}
        />
      )}
    />
    <SubmitButton name="등록" />
  </form>
</Form>
```

그래서 `Field`부분은 이대로 사용하고 `FieldItem`에 대해서 공통적으로 사용하는 컴포넌트를 따로 만들어서 사용하는 쪽으로 하였다.
그 다음 문제로는 storybook으로 컴포넌트를 렌더링 시켜보려고 하였으나 input의 field를 props로 전달받는 부분에 대해서 세팅해주는 부분을 제대로 정의해주지 못해서 개별적으로
렌더링 하는 부분에서 에러가 발생해서 여러모로 쉽지 않은 한주였다.

## 다짐

메가테라 생존코스 3개월이 끝나고 주간회고만큼은 지속적으로 작성해보고자 한다.

한주의 어려웠던 점, 고민사항 등등 그 주에 나는 어땠는지 기록을 하고 한해를 돌이켜 보면 느껴지는게 많을 것 같다고 생각이 들었다.

그래도 메가테라를 통해서 생각만 하고 시도해보지 못했던 것을 조금이라도 시도해보고 거기서 또 느끼는 부분이 생기고 있다는 점에서 돈값하는 강의, 돈값하는 서비스였던 것 같다.

7월 2주차부터 제때 잘 기록해봐야겠다. 한주 화이팅이다!
