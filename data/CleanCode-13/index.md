---
emoji: 👍
title: 제로베이스-한달한권 클린코드(Chapter.17)
date: '2022-01-30 20:52:00'
author: 촬스
tags: 블로그 Java CleanCode TIL
categories: CleanCode
---

# Chapter 17 - 냄새와 휴리스틱(클린코드 규칙들 총정리)

## 01. 철학

### 나쁜 코드가 나쁜 이유

- 생산성 저하
  - 나쁜 코드는 팀 생산성을 저하시킨다.
  - 기술부채를 만들어 수정을 더 어렵게 한다.

### 클린 코드

- 성능이 좋은 코드
- 의미가 명확한 코드 = 가독성이 좋은 코드
- 중복이 제거된 코드

### 창발적 설계 4번째 규칙

- 실용적 관점에서 타협한다.
  - 여러가지 규칙에 극단적으로 심취해 클래스와 메서드를 무수하게 만들지 말라.
  - 결국 좋은 코드를 만드는 이유는 생산성을 올리기 위한 것이다.
  - 실용적인 관점에서 타협해야 한다.

### 보이스카우트 룰

> 전보다 더 깨끗한 코드로 만든다

## 02. 공동 창작 매너

1. 네이밍
2. 함수
3. 주석
4. 포맷팅

- 위 4가지 관점을 생각하면서 개발하도록 노력한다.

`함께 코드를 공동 창작하고 소비하는 나와 동료 개발자들을 위한 매너`

### Team Coding Convention

- 팀의 코딩 스타일에 관한 약속
  `우리 팀의 컨벤션이 가장 중요하다`

## 03. 객체 지향 패턴

### 캡슐화(Encapsulation)

- 객체의 실제 구현을 외부로부터 감추는 방식

### 외부 코드와 호환하기 - Adapter 패턴

- 외부 코드를 호출할 때, 우리가 정의한 인터페이스 대로 호출하기 위해 사용하는 패턴

### 높은 결합도, 낮은 응집도

#### 결합도 - 다른 모듈간의 의존도

#### 응집도 - 모듈 내부의 기능 집중도

### SOLID 원칙

#### 객체지향 설계의 5가지 원칙

> S : SRP(Single Responsibility Principle) - 단일 책임 원칙 <br>
> O : OCP(Open Close Principle) - 개방-폐쇄 원칙 <br>
> L : LSP(Liskov's Substitution Principle) - 리스코프 치환 원칙 <br>
> I : ISP(Interface Segregaion Principle) - 인터페이스 분리 원칙 <br>
> D : DIP(Dpendency Inversion Principle) - 의존성 역전 원칙

### Chapter.3 - [https://www.devkcj.com/CleanCode-2/](https://www.devkcj.com/CleanCode-2/)

## 04. 오류 처리

### Unchecked Exeption을 사용하자

> 안정적인 소프트웨어를 제작하는 요소로 확인된 예외가 반드시 필요하지는 않다는 사실이 분명해졌다. <br>
> C#은 확인된 예외를 지원하지 않는다 영웅적인 시도에도 불구하고 <br>
> C++역시 확인된 예외를 지원하지 않는다. 파이썬이나 루비도 마찬가지다. <br>
> 그럼에도 불구하고 C#, C++, 파이썬, 루비는 안정적인 소프트웨어를 구현하기에 무리가 없다.

### Chapter.7 - [https://www.devkcj.com/CleanCode-6/](https://www.devkcj.com/CleanCode-6/)

## 05. 테스트

### Test Pyramid

- Unit Test: 프로그램 내부의 개별 컴포넌트의 동작을 테스트한다. 배포하기 전에 자동으로 실행되도록 많이 사용한다.

- Integration Test: 프로그램 내부의 개별 컴포넌트들을 합쳐서 동작을 테스트한다. Unit Test는 각 컴포넌트를 고립시켜 테스트 하기 때문에 컴포넌트의 interaction을 확인하는 Integration Test가 필요하다.

- E2E Test: End to End Test. 실제 유저의 시나리오대로 네트워크를 통해 서버의 Endpoint를 호출해 테스트한다.

### FIRST 원칙

#### F(Fast): 빠르게

- 테스트는 빨리 돌아야 한다. 자주 돌려야 하기 때문이다.

#### I(Independent): 독립적으로

- 각 테스트를 독립적으로 작성한다. 서로에게 의존하면 실패한 원인을 찾기 어려워진다.(다른 테스트의 실패로 인한건지, 코드 오류인지)

#### R(Repeatable): 반복가능하게

- 테스트는 어떤 환경에서도 반복가능해야 한다. 실제 환경, QA환경, 모든 환경에서 돌아가야 한다.

#### S(Self-Validating): 자가검증하는

- 테스트는 bool값으로 결과를 내야 한다.

#### T(Timely): 적시에

- 테스트 하려는 실제 코드를 구현하기 직전에 구현한다.

### Chapter.9 - [https://www.devkcj.com/CleanCode-8/](https://www.devkcj.com/CleanCode-8/)

## 06. 개선

### 점진적으로 개선하기

1. 코드가 나빠지고 있음을 느꼈을 때 기능을 추가하지 않고 개선을 시작한다.

2. 테스트 코드를 작성한다.

- 변경을 가한 후에도 시스템이 변경 전과 똑같이 돌아가야 한다.
- 테스트 코드가 없다면 작성하고, 코드를 수정하기 전 상태에서 모든 테스트가 통과해야 한다.

3. 점진적으로 개선한다.

- 책임에 따라 클래스를 나누고, 코드를 옮긴다. 테스트가 깨지지 않도록 확인하며 자잘한 변경을 조금씩 진행한다.

### Chapter.14 - [https://www.devkcj.com/CleanCode-12/](https://www.devkcj.com/CleanCode-12/)

```toc

```
