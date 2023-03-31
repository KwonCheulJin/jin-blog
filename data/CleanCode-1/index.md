---
emoji: 👍
title: 제로베이스-한달한권 클린코드(Chapter.1, 2)
date: '2022-01-02 15:17:00'
author: 촬스
tags: 블로그 Java CleanCode TIL
categories: CleanCode
---

## - 목표

> - CleanCode에 대한 전반적인 지식을 쌓는다.
> - CleanCode를 작성하기 위한 방법을 습득한다.
> - 제로베이스 한달한권 강의를 커리큘럼을 특별한 일이 없으면 지키도록한다.

## - 책을 읽게 된 계기

> 일하면서 매일 작성하는 내 코드가 프로젝트가 종료되고 나중에 다른 사람이 내 코드를 봤을 때 이해를 잘 하고 유지보수를 잘 할 수 있을까에 대한 의문이 항상 있었다. 클린코드라는 책을 예전부터 알고 있었지만 우선순위를 계속 뒤로 미루던 상황에서 TDD를 먼저 공부하려고 하다가 현재 나에게 시급한거는 깨끗한 코드를 작성하는게 좀 더 우선시 되어야 하겠다고 생각해서 먼저 진행하던 TDD에 대한 기록은 잠시 접어두고 고민하던 중 제로베이스의 한달한권 광고를 보게되어 시작하게 되었다. 이렇게 시작하지 않으면 계속 미뤄질 것 같아서 새해를 기점으로 바로 시작한다.

# Chapter 1 - 깨끗한 코드

## 01. 나쁜 코드

### 성능이 나쁜 코드

- 불필요한 연산이 들어가서 개선의 여지가 있는 코드

### 의미가 모호한 코드

- 이해하기 어려운 코드
- 네이밍과 그 내용이 다른 코드

### 중복된 코드

- 비슷한 내용인데 중복되는 코드들은 버그를 낳는다.

### 나쁜 코드가 나쁜 이유

#### 깨진 유리창 법칙

- 깨진 유리창 하나를 방치해 두면, 그 지점을 중심으로 범죄가 확산되기 시작한다는 이론처럼 나쁜 코드는 깨진 유리창처럼 계속 나쁜 코드가 만들어지도록 한다.

#### 생산성 저하

- 나쁜 코드가 쌓일 수록 기술부채를 만들어 기존의 코드 수정을 더 어렵게 한다.

#### 새로운 시스템을 만들어야 한다.

- 현시스템을 유지보수하며 대체할 새로운 시스템 개발은 현실적으로 매우 어렵다.

### 나쁜 코드를 짜는 이유

#### 일정이 촉박해서

- 일정 안에 새로운 기능을 완성해야 한다.
- 하지만 생산성 저하로 오히려 일정을 못맞춘다.

#### 영향 범위가 넓어서

- 생각보다 영향 범위가 넓어서 건드렸다가 다른 부분에 버그가 발생할까봐
- 하지만 기술부채는 부메랑처럼 우리에게 돌아온다.

## 02. 깨끗한 코드란?

### 비야네 스트롭스트룹

> 나는 우아하고 효율적인 코드를 좋아한다. 논리가 간단해야 버그가 숨어들지 못한다. 의존성을 최대한 줄여야 유지보수가 쉬워진다. 오류는 명백한 전략에 의거해 철저히 처리한다. 성능을 최적으로 유지해야 사람들이 원칙 없는 최적화로 코드를 망치려는 유혹에 빠지지 않는다. 깨끗한 코드는 한가지를 제대로 한다.

### 그레디 부치

> 깨끗한 코드는 단순하고 직접적이다. 깨끅한 코드는 잘 쓴 문장처럼 읽힌다. 깨끗한 코드는 결코 설계자의 의도를 숨지기 않는다. 오히려 명쾌한 추상화와 단순한 제어문으로 가득하다.

### '큰<sup>big</sup>' 데이브 토마스

> 깨끗한 코드는 작성자가 아닌 사람도 읽기 쉽고 고치기 쉽다. 단위 테스트 케이스와 인수 테스트 케이스가 존재한다. 깨끗한 코드에는 의미있는 이름이 붙는다. 특정 목적을 달성하는 방법은 (여러 가지가 아니라) 하나만 제공한다. 의존성은 최소이며 각 의존성을 명확히 정의한다. API는 명확하며 최소로 줄였다. 언어에 따라 필요한 모든 정보를 코드만으로 명확히 표현할 수 없기에 코드는 문학적으로 표현해야 마땅하다.

### 마이클 페더스

> 깨끗한 코드의 특징은 많지만 그 중에서도 모두를 아우르는 특징이 하나 있다. 깨끗한 코드는 언제나 누군가 주의 깊에 짯다는 느낌을 준다. 고치려고 살펴봐도 딱히 손 댈 곳이 없다. 작성자가 이미 모든 사항을 고려했으므로, 고칠 궁리를 하다보면 언제나 제자리로 돌아온다. 그리고는 구군가 남겨준 코드, 누군가 주의 깊게 짜놓은 작품에 감사를 느낀다.

### 론 제프리스

> - 모든 테스트를 통과한다.
> - 중복이 없다.
> - 시스템 내 모든 설계 아이디어를 표현한다.
> - 클래스, 메서드, 함수 등을 최대한 줄인다.
> - 중복을 피하라, 한 기능만 수행하라, 제대로 표현하라, 작게 추상화 하라

### 워드 커닝햄

> 코드를 읽으면서 짐작했던 기능을 각 루틴이 그대로 수행한다면 깨끗한 코드라 불러도 되겠다. 코드가 그 문제를 풀기 위한 언어처럼 보인다면 아름다운 코드라 불러도 되겠다. 코드가

`개발 분야에서 아주 유명하고 노련한 프로그래머들의 의견이다.`
<br>이 의견들이 다 정답이라고 할 수는 없지만 나는 이 의견을 보고 과연 '나는 이렇게 하고 있는 걸까?' 라는 생각이 들었다. 아직 추상화에 대한 이해도가 많이 부족한 것 같고 나름의 노력은 한다고 생각하지만 일주일 전의 작성했던 코드도 다시 보면 '내가 왜 이렇게 했지?'라는 생각이 드는 일이 있었는데 이런 걸 보면 아직 깨끗한 코드를 작성하고 있지 않은 것 같다. 이 책을 보면서 조금씩 고쳐봐야겠다.

### 03. 클린코드

#### 1. 성능이 좋은 코드

#### 2. 의미가 명확한 코드 = 가독성이 좋은 코드

#### 3. 중복이 제거된 코드

# Chapter 2 - 의미 있는 이름

### 의도를 분명히 밝혀라

`좋은 이름을 지으려면 시간이 걸리지만 좋은 이름으로 절약하는 시간이 훨씬 더 많다. 그러므로 이름을 주의 깊게 살펴 더 나은 이름이 떠오르면 개선하기 바란다. 그러면 (자신을 포함해) 코드를 읽는 사람이 좀 더 행복해 지리라.`

변수나 함수 그리고 클래스 이름은 다음과 같은 굵직한 질문에 모두 답해야 한다.

- 변수(혹은 함수나 클래스)의 존재 이유는?
- 수행 기능은?
- 사용 방법은?

따로 주석이 필요하다면 의도를 분명히 드러내지 못했다는 말이다.

```java
int d; //경과 시간 (단위: 날짜)
```

이름 d는 아무 의미도 드러나지 않는다. 경과 시간이나 날짜라는 느낌이 안 든다. 측정하려는 값과 단위를 표현하는 이름이 필요하다.

```java
int elapsedTimeInDays;
int daysSinceCreation;
int daysSinceModification;
int fileAgeInDays;
```

의도가 드러나는 이름을 사용하면 코드 이해와 변경이 쉬워진다.

```java
int a;
String b;

//..

System.out.printf("User Requested %s. cout = %d", b, a);

// Console output
// User Requested book. count = 3
```

<p style="text-align: center;"> ⬇️ </p>

```java
int itemCount;
String itemName;

//..

System.out.printf("User Requested %s. count = %d", b, a);

// Console output
// User Requested book. count = 3
```

<p style="text-align: center;"> ⬇️ </p>

```java
class SalesItem {
  ItemCode code;
  int itemCount;
  String itemName;
}

//..

SalesItem selectedItem = salesItemRepository.getItemByCode(purchaseRequest.getItemCode());

System.out.printf("User Requested %s. count = %d",
                   selectedItem.getName(), selectedItem.getCount());

// Console output
// User Requested book. count = 3
```

### 루프 속 ijk 사용하지 않기

```java
for(int i = 0; i < messages.size(); i++) {
  //..
}
```

<p style="text-align: center;"> ⬇️ </p>

`advanced for문`

```java
for(String message : messages) {
  //..
}
```

<p style="text-align: center;"> ⬇️ </p>

`lamda`

```java
messages.stream().forEach(
  message -> //..
)
```

#### i,j,k 대신 맥락에 맞는 이름이 있다.

- i, j -> row, col / width, height

- i, j , k -> row, col, depth

### 통일성 있는 단어 사용하기

#### Member / Customer / User

#### Service / manager

#### Repository / Dao

### 변수명에 타입 넣지 않기

```java
String nameString(👎) -> name
int itemPriceAmount(👎) -> itemPrice

Account[] accountArray(👎) -> accounts
List<Account> accountList(👌) -> accounts, accountList
Map<Account> accountMap(👌)

public interface IShapeFactory(👎) -> ShapeFactory
// 옛날에 사용했던 방법 -> 접두어 I는 주의를 흐트리고 (나쁘게는)과도한 정보를 제공한다.
public class ShapeFactoryImpl(🔺) -> CircleFactory
// Impl을 붙여서 구현클레스라고 명시해주는 방법을 사용, 구현클레스의 정확한 이름으로 명시해주는게 좋을 수도 있다. (팀에서 정한 룰을 따르는게 제일 좋다.)
```

### Google Java Naming Guide

#### Package Naming Guide

`All lower case, no underscores`

```java
com.example.deepspace(👍)
com.example.deepSpace(👎)
com.example.deep_space(👎)
```

#### Class Naming Guide

`UpperCamelCase(대문자로 시작)`

```java
// 클래스는 명사, 명사구
Character, ImmutableList

// 인터페이스는 명사, 명사구, (형용사)
List, Readable

// 테스트 클래스는 Test로 끝나기
HashTest, HashIntegrationTest
```

#### Method Naming Guide

`lowerCamelCase(소문자로 시작)`

```java
// 메서드는 동사, 동사구
sendMessage, stop

// JUnit 테스트에 underscore 사용되기도 함
// <methodUnderTest>(테스트 대상이 되는 메서드)_<state>(상태)패턴
pop_emptyStack
```

```toc

```
