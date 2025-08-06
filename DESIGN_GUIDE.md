# 블로그 디자인 가이드

Jin's Next.js Blog 프로젝트의 디자인 시스템과 스타일 가이드라인입니다.

## 목차
- [디자인 원칙](#디자인-원칙)
- [컬러 시스템](#컬러-시스템)
- [타이포그래피](#타이포그래피)
- [레이아웃 시스템](#레이아웃-시스템)
- [컴포넌트 스타일](#컴포넌트-스타일)
- [애니메이션](#애니메이션)
- [반응형 디자인](#반응형-디자인)
- [다크 모드](#다크-모드)
- [접근성](#접근성)

## 디자인 원칙

### 1. 핵심 가치
- **명료성**: 깔끔하고 직관적인 인터페이스
- **일관성**: 통일된 디자인 언어와 패턴
- **접근성**: 모든 사용자를 위한 포용적 디자인
- **성능**: 빠르고 효율적인 사용자 경험
- **반응성**: 모든 디바이스에서 최적화된 경험

### 2. 디자인 스타일
- **모던 미니멀**: 필요한 요소만 사용하는 깔끔한 디자인
- **콘텐츠 우선**: 내용을 방해하지 않는 디자인
- **개발자 친화적**: 코드와 기술 콘텐츠에 최적화
- **프로페셔널**: 깔끔하고 신뢰할 수 있는 느낌

## 컬러 시스템

### 1. 메인 컬러 팔레트

#### Primary Colors
```css
/* Pink 계열 (Primary) */
--primary-50: #fdf2f8
--primary-100: #fce7f3
--primary-200: #fbcfe8
--primary-300: #f9a8d4
--primary-400: #f472b6
--primary-500: #ec4899  /* 메인 핑크 */
--primary-600: #db2777
--primary-700: #be185d
--primary-800: #9d174d
--primary-900: #831843

/* Dark 모드 Primary */
--primary-dark: #58E6D9  /* 터키즈 블루 */
```

#### Neutral Colors
```css
/* Light 모드 */
--light: #f5f5f5     /* 배경색 */
--dark: #1b1b1b      /* 텍스트/다크모드 배경 */

/* Gray 계열 */
--gray-50: #fafafa
--gray-100: #f4f4f5
--gray-200: #e4e4e7
--gray-300: #d4d4d8
--gray-400: #a1a1aa
--gray-500: #71717a
--gray-600: #52525b
--gray-700: #3f3f46
--gray-800: #27272a
--gray-900: #18181b
```

### 2. 시맨틱 컬러

#### Feedback Colors
```css
/* Success */
--success: #22c55e
--success-light: #dcfce7

/* Error/Destructive */
--destructive: #ef4444
--destructive-light: #fef2f2

/* Warning */
--warning: #f59e0b
--warning-light: #fef3c7

/* Info */
--info: #3b82f6
--info-light: #dbeafe
```

### 3. shadcn/ui 컬러 토큰
```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --card: 0 0% 100%;
  --card-foreground: 222.2 84% 4.9%;
  --popover: 0 0% 100%;
  --popover-foreground: 222.2 84% 4.9%;
  --primary: 222.2 47.4% 11.2%;
  --primary-foreground: 210 40% 98%;
  --secondary: 210 40% 96.1%;
  --secondary-foreground: 222.2 47.4% 11.2%;
  --muted: 210 40% 96.1%;
  --muted-foreground: 215.4 16.3% 46.9%;
  --accent: 210 40% 96.1%;
  --accent-foreground: 222.2 47.4% 11.2%;
  --destructive: 0 84.2% 60.2%;
  --destructive-foreground: 210 40% 98%;
  --border: 214.3 31.8% 91.4%;
  --input: 214.3 31.8% 91.4%;
  --ring: 222.2 84% 4.9%;
  --radius: 0.5rem;
}
```

## 타이포그래피

### 1. 폰트 계층

#### 기본 폰트
- **Sans**: `var(--font-sans)` - 기본 시스템 폰트
- **Mont**: `var(--font-mont)` - Montserrat (제목 및 강조)

#### 타입 스케일
```css
/* Headings */
.text-5xl { font-size: 3rem; }      /* 48px - H1 */
.text-4xl { font-size: 2.25rem; }   /* 36px - H2 */
.text-3xl { font-size: 1.875rem; }  /* 30px - H3 */
.text-2xl { font-size: 1.5rem; }    /* 24px - H4 */
.text-xl { font-size: 1.25rem; }    /* 20px - H5 */
.text-lg { font-size: 1.125rem; }   /* 18px - H6 */

/* Body Text */
.text-base { font-size: 1rem; }     /* 16px - Body */
.text-sm { font-size: 0.875rem; }   /* 14px - Small */
.text-xs { font-size: 0.75rem; }    /* 12px - Caption */
```

#### 폰트 웨이트
```css
.font-light { font-weight: 300; }
.font-normal { font-weight: 400; }
.font-medium { font-weight: 500; }
.font-semibold { font-weight: 600; }
.font-bold { font-weight: 700; }
.font-extrabold { font-weight: 800; }
```

### 2. 텍스트 스타일 사용법

#### 제목 (Headings)
```jsx
// 메인 제목
<h1 className="text-5xl font-bold text-dark dark:text-light font-mont">
  메인 제목
</h1>

// 섹션 제목
<h2 className="text-3xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
  섹션 제목
</h2>

// 서브 제목
<h3 className="text-xl font-medium text-gray-800 dark:text-gray-200 mb-3">
  서브 제목
</h3>
```

#### 본문 텍스트
```jsx
// 기본 본문
<p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">
  본문 텍스트
</p>

// 강조 텍스트
<p className="text-lg font-medium text-primary-600 dark:text-primary-400">
  강조 텍스트
</p>

// 메타 정보
<span className="text-sm text-gray-500 dark:text-gray-400">
  메타 정보
</span>
```

## 레이아웃 시스템

### 1. Container 시스템
```css
.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* 반응형 Container */
@media (max-width: 640px) {
  .container {
    padding: 0 1rem;
  }
}
```

### 2. Grid 시스템
```jsx
// 메인 레이아웃 그리드
<div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
  <aside className="lg:col-span-3">
    {/* 사이드바 */}
  </aside>
  <main className="lg:col-span-9">
    {/* 메인 콘텐츠 */}
  </main>
</div>

// 카드 그리드
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* 카드 아이템들 */}
</div>
```

### 3. 스페이싱 시스템
```css
/* Margin/Padding Scale */
.space-1 { margin/padding: 0.25rem; }  /* 4px */
.space-2 { margin/padding: 0.5rem; }   /* 8px */
.space-3 { margin/padding: 0.75rem; }  /* 12px */
.space-4 { margin/padding: 1rem; }     /* 16px */
.space-6 { margin/padding: 1.5rem; }   /* 24px */
.space-8 { margin/padding: 2rem; }     /* 32px */
.space-12 { margin/padding: 3rem; }    /* 48px */
.space-16 { margin/padding: 4rem; }    /* 64px */
.space-20 { margin/padding: 5rem; }    /* 80px */
.space-24 { margin/padding: 6rem; }    /* 96px */
```

## 컴포넌트 스타일

### 1. 버튼 시스템

#### Primary Button
```jsx
<button className="
  inline-flex items-center justify-center
  px-4 py-2 rounded-md
  bg-primary-500 hover:bg-primary-600
  text-white font-medium
  transition-colors duration-200
  focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
  disabled:opacity-50 disabled:pointer-events-none
">
  Primary Button
</button>
```

#### Secondary Button
```jsx
<button className="
  inline-flex items-center justify-center
  px-4 py-2 rounded-md
  border border-gray-300 dark:border-gray-600
  bg-white dark:bg-gray-800
  text-gray-700 dark:text-gray-300
  hover:bg-gray-50 dark:hover:bg-gray-700
  font-medium transition-colors duration-200
">
  Secondary Button
</button>
```

#### Ghost Button
```jsx
<button className="
  inline-flex items-center justify-center
  px-4 py-2 rounded-md
  text-gray-700 dark:text-gray-300
  hover:bg-gray-100 dark:hover:bg-gray-800
  font-medium transition-colors duration-200
">
  Ghost Button
</button>
```

### 2. 카드 컴포넌트
```jsx
<div className="
  bg-white dark:bg-gray-800
  border border-gray-200 dark:border-gray-700
  rounded-lg shadow-sm
  p-6
  hover:shadow-md transition-shadow duration-200
">
  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
    카드 제목
  </h3>
  <p className="text-gray-600 dark:text-gray-400">
    카드 내용
  </p>
</div>
```

### 3. 입력 필드
```jsx
<input className="
  w-full px-3 py-2
  border border-gray-300 dark:border-gray-600
  rounded-md
  bg-white dark:bg-gray-800
  text-gray-900 dark:text-gray-100
  placeholder-gray-500 dark:placeholder-gray-400
  focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
  transition-colors duration-200
" />
```

### 4. 특수 효과

#### 글래스모피즘 효과
```css
.modal-effect {
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(7px);
  -webkit-backdrop-filter: blur(7px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
}
```

#### 뉴모피즘 효과
```css
.reverse-effect {
  background: #eef0f4;
  box-shadow:
    inset 2.1px 2.1px 8px #77787a,
    inset -2.1px -2.1px 8px #ffffff;
}
```

#### 패턴 배경
```css
/* Light 모드 원형 패턴 */
.bg-circularLight {
  background-image: repeating-radial-gradient(
    rgba(0,0,0,0.4) 2px, 
    #f5f5f5 5px, 
    #f5f5f5 100px
  );
}

/* Dark 모드 원형 패턴 */
.bg-circularDark {
  background-image: repeating-radial-gradient(
    rgba(255,255,255,0.5) 2px, 
    #1b1b1b 8px, 
    #1b1b1b 100px
  );
}
```

## 애니메이션

### 1. 트랜지션 기본값
```css
/* 기본 트랜지션 */
.transition-default {
  transition: all 0.2s ease-in-out;
}

/* 색상 트랜지션 */
.transition-colors {
  transition: color 0.2s ease-in-out, 
              background-color 0.2s ease-in-out, 
              border-color 0.2s ease-in-out;
}

/* 그림자 트랜지션 */
.transition-shadow {
  transition: box-shadow 0.2s ease-in-out;
}
```

### 2. Framer Motion 패턴

#### 페이드 인 애니메이션
```jsx
const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.3 }
};

<motion.div variants={fadeIn} initial="initial" animate="animate">
  Content
</motion.div>
```

#### 스태거 애니메이션
```jsx
const container = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 }
};

<motion.div variants={container} animate="animate">
  {items.map((item, index) => (
    <motion.div key={index} variants={item}>
      {item}
    </motion.div>
  ))}
</motion.div>
```

## 반응형 디자인

### 1. 브레이크포인트
```css
/* 모바일 우선 (Mobile First) */
xs: { max: '479px' }   /* Extra Small */
sm: { max: '639px' }   /* Small */
md: { max: '767px' }   /* Medium */
lg: { max: '1023px' }  /* Large */
xl: { max: '1279px' }  /* Extra Large */
2xl: { max: '1535px' } /* 2X Large */
```

### 2. 반응형 패턴

#### 텍스트 크기
```jsx
<h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold">
  반응형 제목
</h1>
```

#### 그리드 레이아웃
```jsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
  {/* 그리드 아이템들 */}
</div>
```

#### 스페이싱
```jsx
<div className="p-4 sm:p-6 lg:p-8 xl:p-12">
  {/* 반응형 패딩 */}
</div>
```

## 다크 모드

### 1. 다크 모드 설정
```jsx
// next-themes 사용
import { useTheme } from 'next-themes';

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  
  return (
    <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      {theme === 'dark' ? '🌞' : '🌙'}
    </button>
  );
}
```

### 2. 다크 모드 스타일 패턴

#### 배경 및 텍스트
```jsx
<div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
  Content
</div>
```

#### 테두리 및 그림자
```jsx
<div className="
  border border-gray-200 dark:border-gray-700
  shadow-sm dark:shadow-gray-800
">
  Content
</div>
```

#### 상호작용 요소
```jsx
<button className="
  bg-gray-100 hover:bg-gray-200 
  dark:bg-gray-800 dark:hover:bg-gray-700
  text-gray-900 dark:text-gray-100
">
  Button
</button>
```

## 접근성

### 1. 컬러 접근성
- **명도 대비**: WCAG AA 기준 4.5:1 이상 유지
- **컬러 의존성 금지**: 색상만으로 정보를 전달하지 않음
- **포커스 표시**: 명확한 포커스 링 제공

```css
/* 포커스 링 */
.focus-ring {
  focus:outline-none 
  focus:ring-2 
  focus:ring-primary-500 
  focus:ring-offset-2
}
```

### 2. 키보드 네비게이션
```jsx
// 키보드 접근 가능한 버튼
<button 
  className="focus:outline-none focus:ring-2 focus:ring-primary-500"
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      // 실행 로직
    }
  }}
>
  Accessible Button
</button>
```

### 3. 스크린 리더 지원
```jsx
// 의미 있는 alt 텍스트
<img src="profile.jpg" alt="프로필 사진: 개발자 진철진" />

// ARIA 레이블
<button aria-label="메뉴 열기">
  <MenuIcon />
</button>

// 헤딩 구조 유지
<h1>메인 제목</h1>
  <h2>섹션 제목</h2>
    <h3>서브섹션 제목</h3>
```

## 코드 하이라이팅

### 1. 코드 블록 스타일
```jsx
// react-syntax-highlighter 사용
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow, prism } from 'react-syntax-highlighter/dist/esm/styles/prism';

<SyntaxHighlighter
  language="typescript"
  style={tomorrow}
  customStyle={{
    borderRadius: '0.5rem',
    fontSize: '0.875rem',
    lineHeight: '1.5'
  }}
>
  {code}
</SyntaxHighlighter>
```

### 2. 인라인 코드
```jsx
<code className="
  px-1.5 py-0.5 
  bg-gray-100 dark:bg-gray-800 
  text-primary-600 dark:text-primary-400
  rounded text-sm font-mono
">
  inline code
</code>
```

## 성능 최적화

### 1. 이미지 최적화
```jsx
import Image from 'next/image';

<Image
  src="/image.jpg"
  alt="설명"
  width={800}
  height={600}
  className="rounded-lg"
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
  priority={isAboveFold}
/>
```

### 2. 폰트 최적화
```jsx
// next/font 사용
import { Inter, Montserrat } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-mont',
});
```

---

이 디자인 가이드를 따라 일관성 있고 접근성이 좋은 사용자 인터페이스를 구축해 주세요. 새로운 디자인 패턴이나 컴포넌트를 추가할 때는 이 문서를 업데이트하는 것을 잊지 마세요.