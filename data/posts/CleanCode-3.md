---
title: 제로베이스-한달한권 클린코드 DAY3
date: '2022-01-06'
category: CleanCode
description: Chapter.4
path: CleanCode-3
image: CleanCode
featured: false
---

# Chapter 4 - 주석

## 01. 주석을 최대한 쓰지 말자

### 주석은 나쁜 코드를 보완하지 못한다

- 코드에 주석을 추가하는 일반적인 이유는 코드 품질이 나쁘기 때문이다. 자신이 저지른 난장판을 주석으로 설명하지 말고 개선하는 데 시간을 보내야 한다.
- 코드로도 의도 표현이 가능하다!

```java
// 직원에게 복지 혜택을 받을 자격이 있는지 검사한다.
if((employee.flags & HOURLY_FLAG) && employee.age > 65)

// 의미있는 이름을 지으면 해결이 된다.
if(employee.isEligibleForFullBenefits())
```

### 주석은 방치된다

- 코드의 변화에 따라가지 못하고, 주석은 방치된다.
- 코드는 컴파일되어 호출되지만, 주석은 그저 주석이기 때문에 그 자리에 방치되고 결국 의미없는 텍스트가 되어버린다.

#### 복지 혜택에 연금 혜택 기준 기능이 추가된다면 주석은 변화에 따라가지 못한다

## 02. 좋은 주석

### 구현에 대한 정보를 제공한다

```java
// kk:mm:ss EEE, MMM dd, yyyy 형식

Pattern timeFormat =
  Pattern.compile("\\d*:\\d:\\d* \\w*, \\w* \\d \\d*");
```

### 의도와 중요성을 설명하는 주석

```java
// 스레드를 많이 생성하여 시스템에 영향을 끼쳐 테스트를 만들도록 함
for (int i = 0; i < 25000; i++) {
  SomeThread someThread = ThreadBuilder.builder().builder();
}

// 유저로부터 입력받을 값을 저장할 때 trim으로 공백제거 필요
String userName = userNameInput.trim();
```

### TODO, FIXME 주석

`//TODO, //FIXME`

- TODO: 앞으로 할 일. 지금은 해결하지 않지만 나중에 해야할 일을 미리 적어둘 때.
- FIXME: 문제가 있찌만, 당장 수정할 필요는 없을 때. 가능하면 빨리 수정하는게 좋다.

`IDE에서 하이라이팅되고, 별도의 윈도우에서 볼 수 있다.`

## 03. 주석보다 annotation

### java.lang.annotation

- annotation = 코드에 대한 메타데이터
- 코드의 실행 흐름에 간섭을 주기도 하고, 주석처럼 코드에 대한 정보를 줄 수 있다.

`@Deprecated:컴파일러가 waring을 발생시킴. IDE에서 사용시 표시됨`

`@NotThreadSafe:Thread Safe하지 않음을 나타냄 (책에서는 주석으로 표현했지만 어노테이션을 많이 사용)`

## 04. JavaDoc

### Java 코드에서 API 문서를 HTML 형식으로 생성해주는 도구

`오늘은 길지않은 내용이었지만 무분별하게 주석을 사용하는 것 보다는 좀 더 의미있는 이름을 짓는 것에 중점을 둬야한 다는 것을 알게된 시간이었다. 최근에 프로젝트 담당자분이 변경되셔서 변화가 있었는데 내가 잘하고 못한 부분에 대해서 많이 알려주셔서 이것저것 많이 배우고 있다. 오늘 기억해야 할 부분은 어떠한 파트의 MVC를 개발한다고 하면 매소드 명에 통일 성이있어야 한다. 통일되게 작성된다고 생각했는데 만들고 보니 그렇지 않은게 더러 있었다. 이점을 명심하고 클린코드에서 함수 챕터에서도 나오는 얘기이지만 함수는 되도록 한가지 기능만 하도록 구현하도록 하자. 오늘도 그 얘기를 듣고 역시 중요하다는 것을 느꼈다.`
