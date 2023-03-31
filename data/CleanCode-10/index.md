---
emoji: 👍
title: 제로베이스-한달한권 클린코드(Chapter.11)
date: '2022-01-24 20:38:00'
author: 촬스
tags: 블로그 Java CleanCode TIL
categories: CleanCode
---

# Chapter 11 - 시스템

## 01. 관심사 분리

### construction(생성)과 use(사용)을 나눠서 사용해야한다.

- 소프트웨어 시스템은(어플리케이션 객체를 제작하고 의존성을 서로'연결'하는) `준비 과정`과 (준비 과정 이후에 이어지는) `런타임 로직`을 분리해야 한다.

- `객체의 생성과 객체를 사용하는 부분을 분리한다.`

### 시작에 대한 관심사 분리

#### 객체의 생성은 시작 단계에서, 비즈니스 로직은 객체를 사용하는데 집중한다.

- 시작 단계는 모든 어플리케이션이 풀어야 할 관심사이다.
- main 함수에서 시스템에 필요한 객체를 생성한 후 어플리케이션에 넘긴다.
- 어플리케이션은 그저 만들어진 객체를 사용한다.
- 모든 객체가 잘 생성되었다고 가정하고, 객체를 이용한 개발에 집중할 수 있다.

### 요청에 대한 관심사 분리

#### Spring 프레임 워크를 통해 요청에 대한 관심사를 분리해 요청 처리에 대한 비즈니스 로직에 집중할 수 있다.

#### Filter, Intercepter, AOP

- 서블릿 필터는 DispatcherServlet 이전에 실행이 되는데 요청 내용을 변경하거나, 요청을 처리하기 전에 작업을 수행할 수 있다.
- Filter와 Intercepter는 Servlet단위에서 실행된다. 반면 AOP는 메소드 앞에서 Proxy패턴으로 실행된다.
- 인터셉터는 여러 개를 사용할 수 있고 로그인 처리, 권한체크, 프로그램 실행시간 계산작업, 로그확인 등의 업무처리에 활용된다.
- AOP는 메서드 앞에서 Proxy패턴으로 실행된다. 주로 '로깅', '트랜잭션', '에러처리'등 비즈니스 단의 메서드에서 조금 더 세밀하게 조정하고 싶을 때 사용한다. AOP는 주소, 파라미터, 애노테이션 등 다양한 방법으로 대상을 지정할 수 있다.

## 02. Dependency Injection(의존성 주입)

### 객체 의존성을 DI 컨테이너에 맡긴다.

- Setter 메소드 or 생성자 인수를 통해 의존성 주입한다.
- DI컨테이너는 요청이 들어올 때 필요한 객체의 인스턴스를 만든 후 의존성 설정한다.
  - 예: Spring IoC Container

### Spring IoC Container

- DI컨테이너가 객체를 알아서 wiring 해준다.

## 03. Cross Cutting Concerns(횡단 관심 분리)

### 어플리케이션 전반에서 가지는 공통적인 관심사를 분리한다.

- 비즈니스 로직 외에 Logging, Transaction 관리, Security 등 신경써야 할 관심사들이 많다.
- 관심사들은 많은 어플리케이션 레이어에 퍼져있는데, 이 관심사들을 분리해 처리하는 것일 효율적이다.

### 횡단 관심사 분리의 필요성

```java
public Response executeBusinessLogic(Request request) {
    // 공통 기능
    checkAuth(request)

    // 비즈니스 로직
    Response response = businessLogic(userName, messsage)

    // 공통 기능
    logging(response)
}
```

<h3 style="text-align: center;">⬇️</h3>

```java
public Response executeBusinessLogic(Request request) {
    // 비즈니스 로직
    Response response = businessLogic(userName, messsage)
}
// 공통 기능은 별도의 코드에서 관리한다.
```

`아직 MVC만 반복적인 작업을 하는 나로써는 이해가 쉽게 되지는 않는다. 그래도 끝까지 읽어보면 언젠가는 도움이 되는 날이 오겠지...?!`

```toc

```
