# 컴포넌트 개발 패턴 가이드

Jin's Next.js Blog 프로젝트의 컴포넌트 개발 표준 패턴과 가이드라인입니다. 
이 문서는 Claude Code가 기능 제작 시 참고하여 일관된 스타일의 컴포넌트를 개발할 수 있도록 작성되었습니다.

## 📁 프로젝트 구조

```
src/components/
├── about/          # About 페이지 관련 컴포넌트
├── auth/           # 인증 관련 컴포넌트
├── common/         # 공통 컴포넌트 (레이아웃, 애니메이션 등)
├── editor/         # 에디터 관련 컴포넌트
├── liveblocks/     # 실시간 협업 기능 컴포넌트
├── post/           # 블로그 포스트 관련 컴포넌트
├── template/       # 템플릿 및 레이아웃 컴포넌트
└── ui/            # 재사용 가능한 UI 컴포넌트
```

## 🎯 핵심 컴포넌트 패턴

### 1. 컴포넌트 구조 패턴

#### 기본 구조 (Hero.tsx 예시)

```typescript
'use client';

import Image from 'next/image';
import AnimatedText from '@/components/common/AnimatedText';

export default function Hero() {
  return (
    <div className="flex h-[calc(100vh-280px)] w-full items-center justify-between dark:text-light">
      {/* 컴포넌트 내용 */}
    </div>
  );
}
```

**패턴 특징:**

- `'use client'` 지시문 (필요한 경우)
- Named import 사용
- default export로 컴포넌트 내보내기
- 함수 선언문 스타일 사용

#### Props 타입 정의 패턴 (AnimatedText.tsx 예시)

```typescript
type Props = {
  text: string;
  className?: string;
};

export default function AnimatedText({ text, className }: Props) {
  // 컴포넌트 로직
}
```

**패턴 특징:**

- `Props` 타입 별칭 사용
- 선택적 props는 `?` 연산자 사용
- 구조 분해 할당으로 props 받기

### 2. 스타일링 패턴

#### Tailwind CSS 클래스 조합

```typescript
// cn 유틸리티 함수 사용
import { cn } from '@/lib/utils';

<motion.h1
  className={cn(
    'w-full text-left text-7xl font-bold capitalize text-dark dark:text-light',
    className,
  )}
>
```

**패턴 특징:**

- `cn()` 함수로 클래스 조합
- 다크 모드 대응 (`dark:` prefix)
- 반응형 디자인 (`sm:`, `lg:` 등)
- 조건부 스타일링 지원

### 3. UI 컴포넌트 패턴 (Button.tsx 기반)

#### Variant 기반 컴포넌트

```typescript
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md',
  {
    variants: {
      variant: {
        default: 'bg-primary-500 dark:bg-primaryDark text-light',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
```

**패턴 특징:**

- `class-variance-authority` (cva) 사용
- `React.forwardRef` 패턴
- Radix UI `Slot` 컴포넌트 활용
- displayName 설정
- 인터페이스와 구현 분리

### 4. 애니메이션 패턴 (Framer Motion)

```typescript
import { motion } from 'framer-motion';

const quote = {
  initial: { opacity: 1 },
  animate: {
    opacity: 1,
    transition: {
      delay: 0.5,
      staggerChildren: 0.08,
    },
  },
};

const singleWord = {
  initial: { opacity: 0, y: 50 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 1 },
  },
};

export default function AnimatedText({ text, className }: Props) {
  return (
    <motion.h1
      className={cn('w-full text-left text-7xl font-bold', className)}
      variants={quote}
      initial="initial"
      animate="animate"
    >
      {text.split(' ').map((word, index) => (
        <motion.span key={`${word}-${index}`} variants={singleWord}>
          {word}&nbsp;
        </motion.span>
      ))}
    </motion.h1>
  );
}
```

**패턴 특징:**

- 애니메이션 variants 객체 정의
- staggerChildren으로 순차 애니메이션
- 고유 key 값 설정 (`${word}-${index}`)

### 5. 상태 관리 패턴 (Zustand)

```typescript
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

type PostState = {
  addPost: Post;
};

type PostAction = {
  setAddPostInit: () => void;
  setAddPost: (post: Post) => void;
};

export const usePostStore = create(
  immer<PostState & PostAction>(set => ({
    addPost: { title: '', sub_title: '', markdown: '', tags: [] },
    setAddPostInit: () =>
      set(state => {
        state.addPost.title = '';
        state.addPost.sub_title = '';
        state.addPost.markdown = '';
        state.addPost.tags = [];
      }),
    setAddPost: post =>
      set(state => {
        state.addPost = post;
      }),
  })),
);
```

**패턴 특징:**

- State와 Action 타입 분리
- Immer 미들웨어 사용으로 불변성 관리
- 명확한 액션 네이밍 (`set` prefix)

### 6. 이미지 처리 패턴

```typescript
import Image from 'next/image';

// 일반적인 이미지 사용
<Image
  className="h-auto w-full rounded-full"
  src="https://..."
  alt="my-profile"
  width={250}
  height={250}
  priority
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
/>

// Markdown 내 이미지 처리
img: image => {
  return (
    <Image
      className="object-fit h-auto w-full"
      src={typeof image.src === 'string' ? image.src : ''}
      alt={image.alt ?? ''}
      width={500}
      height={550}
      priority
    />
  );
},
```

**패턴 특징:**

- Next.js Image 컴포넌트 사용
- 타입 안전성 검사 (`typeof` 확인)
- 반응형 sizes 속성 활용
- priority 속성으로 성능 최적화

## 📋 TypeScript 사용 패턴

### 1. 타입 정의

```typescript
// 기본 타입 정의
export type Post = {
  title: string;
  sub_title: string;
  markdown: string;
  tags: string[];
};

// 확장 타입
export type PostDetail = Post & {
  id: string;
  author: string;
  created_at: string;
  updated_at: string;
};

// Omit 유틸리티 타입 활용
export type SimplePost = Omit<PostDetail, 'markdown' | 'author'>;
```

### 2. 제네릭 사용

```typescript
export const parseStringify = <T>(value: T): T =>
  JSON.parse(JSON.stringify(value));
```

### 3. 이벤트 핸들러 타입

```typescript
onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
```

## 🎨 스타일링 가이드라인

### 1. 컬러 시스템

```javascript
// tailwind.config.js
colors: {
  primary: colors.pink,
  primaryDark: '#58E6D9',
  light: '#f5f5f5',
  dark: '#1b1b1b',
}

// 사용 예시
className="bg-primary-500 dark:bg-primaryDark text-light"
```

### 2. 반응형 디자인

```typescript
// 반응형 클래스 사용 (모바일 우선)
className="text-7xl sm:text-4xl lg:text-5xl xs:text-4xl"

// 커스텀 브레이크포인트 정의
screens: {
  'xs': { max: '479px' },
  'sm': { max: '639px' },
  'md': { max: '767px' },
  'lg': { max: '1023px' },
  'xl': { max: '1279px' },
  '2xl': { max: '1535px' },
}
```

### 3. 다크 모드 지원

```typescript
// 항상 다크 모드 클래스 포함
className = 'text-dark dark:text-light';
className = 'bg-light dark:bg-dark';
```

## 🧪 테스트 패턴

```typescript
import { describe, it, expect } from 'vitest'
import Hero from '@/components/Hero'
import { render, screen } from '@testing-library/react'

const context = describe

describe('Hero', () => {
  function renderHero() {
    render(<Hero />);
  }

  context('컴포넌트가 렌더링 되면', () => {
    it('이미지를 확인할 수 있다.', () => {
      renderHero();
      expect(screen.getByAltText(/my-profile/)).toBeInTheDocument();
    });
  });
});
```

**패턴 특징:**

- Vitest 사용
- 한국어 테스트 설명
- `context` 별칭으로 그룹화
- 헬퍼 함수 패턴 (`renderHero`)

## 📝 컴포넌트 작성 체크리스트

### ✅ 필수 사항

- [ ] `'use client'` 지시문 (클라이언트 컴포넌트인 경우)
- [ ] TypeScript 타입 정의
- [ ] 적절한 import 구조
- [ ] cn() 함수로 클래스 조합
- [ ] 다크 모드 스타일 포함
- [ ] 반응형 디자인 고려

### ✅ 권장 사항

- [ ] Props 구조 분해 할당
- [ ] displayName 설정 (forwardRef 사용 시)
- [ ] 적절한 키 값 설정 (리스트 렌더링 시)
- [ ] 성능 최적화 (React.memo, useMemo 등)
- [ ] 접근성 고려 (alt, aria-label 등)

### ✅ 고급 패턴

- [ ] Variant 기반 컴포넌트 (필요 시)
- [ ] Framer Motion 애니메이션 (필요 시)
- [ ] Zustand 상태 관리 (전역 상태 필요 시)
- [ ] forwardRef 패턴 (ref 전달 필요 시)

## 🔗 자주 사용되는 라이브러리

- **스타일링**: Tailwind CSS, class-variance-authority, tailwind-merge
- **애니메이션**: Framer Motion
- **상태관리**: Zustand (with Immer)
- **UI 컴포넌트**: Radix UI
- **유틸리티**: clsx, Next.js built-ins
- **테스팅**: Vitest, Testing Library

이 가이드를 따라 컴포넌트를 작성하면 프로젝트의 일관성을 유지하고 코드 품질을 향상시킬 수 있습니다.
