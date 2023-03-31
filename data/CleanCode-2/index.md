---
emoji: 👍
title: 제로베이스-한달한권 클린코드(Chapter.3)
date: '2022-01-04 22:17:00'
author: 촬스
tags: 블로그 Java CleanCode TIL
categories: CleanCode
---

# Chapter 3 - 함수

## 01. SOLID 원칙

> S : SRP(Single Responsibility Principle) - 단일 책임 원칙 <br>
> O : OCP(Open Close Principle) - 개방-폐쇄 원칙 <br>
> L : LSP(Liskov's Substitution Principle) - 리스코프 치환 원칙 <br>
> I : ISP(Interface Segregaion Principle) - 인터페이스 분리 원칙 <br>
> D : DIP(Dpendency Inversion Principle) - 의존성 역전 원칙

### SRP (Single Responsibility Principle) - 단일 책임 원칙

#### 한 클래스는 하나의 책임만 가져야 한다.

- 클래스는 하나의 기능만 가지며, 어떤 변화에 의해 클래스를 변경 해야 하는 이유는 오직 하나 뿐이어야 한다.
- SRP 책임이 분명해지기 때문에, 변경에 의한 연쇄작용에서 자유로워질 수 있다.
- 가독성 향상과 유지보수가 용이해진다.
- 실전에서는 쉽지 않지만 늘 상기해야 한다!

### OCP(Open Close Principle) - 개방-폐쇄 원칙

#### 소프트웨어 요소는 확장에는 열려 있으나 변경에는 닫혀 있어야한다.

- 변경을 위한 비용은 가능한 줄이고, 확장을 위한 비용은 가능한 극대화 해야 한다.
- 요구사항의 변경이나 추가사항이 발생하더라도, 기존 구성요소에는 수정이 일어나지 않고, 기존 구성 요소를 쉽게 확장해서 재사용한다.
- 객체지향의 추상화와 다형성을 활용한다.

### LSP(Liskov's Substitution Principle) - 리스코프 치환 원칙

#### 서브 타입은 언제나 기반 타입으로 교체할 수 있어야 한다.

- 서브 타입은 기반 타입이 약속한 규약(접근제한자, 예외 포함)을 지켜야 한다.
- 클래스 상속, 인터페이스 상속을 이용해 확장석을 획득한다.
- 다형성과 확장성을 극대화하기 위해 인터페이스를 사용하는 것이 더 좋다.
- 합성(composition)을 이용할 수도 있다.

### ISP(Interface Segregaion Principle) - 인터페이스 분리 원칙

#### 자신이 사용하지 않는 인터페이스는 구현하지 말아야 한다.

- 가능한 최소한의 인터페이스만 구현한다.
- 만약 어떤 클래스를 이용하는 클라이언트가 여러 개고, 이들이 클래스의 특정 부분만 이용한다면, 여러 인터페이스로 분류하여 클라이언트가 필요한 기능만 전달한다.
- SRP가 클래스의 단일 책임이라면, ISP는 인터페이스의 단일 책임

### DIP(Dpendency Inversion Principle) - 의존성 역전 원칙

#### 상위 모델은 하위 모델에 의존하면 안된다. 둘 다 추상화에 의존해야 한다.

#### 추상화는 세부 사항에 의존해서는 안된다. 세부 사항은 추상화에 따라 달라진다.

- 하위 모델의 변경이 상위 모듈의 변경을 요구하는 위계관계를 끊는다.
- 실제 사용관계는 그대로이지만, 추상화를 매개로 메시지를 주고 받으면서 관계를 느슨하게 만든다.

```java
class PaymentController {
  @RequestMapping(value = "/api/payment", method = RequestMethod.POST)
  public void pay(@RequestBody ShinhanCardDto.PaymentRequest req) {
    shinhanCardPaymentService.pay(req);
  }
}

class ShinhanCardPaymentService {
  public void pay(ShinhanCardDto.PaymentRequest req) {
    shinhanCardApi.pay(req);
  }
}
```

<h3 style="text-align: center;"> 새로운 카드사가 추가된다면? </h3>
<p style="text-align: center;"> ⬇️ </p>

```java
class PaymentController {
  @RequestMapping(value = "/api/payment", method = RequestMethod.POST)
  public void pay(@RequestBody CardPaymentCardDto.PaymentRequest req) {
    if(req.getType() == CardType.SHINHAN) {
      shinhanCardPaymentService.pay(req);
    } else if(req.getType() == CardType.WOORI) {
      wooriCardPaymentService.pay(req);
    }
  }
}
```

<h3 style="text-align: center;"> 확장에 유연하지 않다. </h3>
<h3 style="text-align: center;"> 그래서 둘 다 추상화된 인터페이스에 의존하도록 한다. </h3>
<p style="text-align: center;"> ⬇️ </p>

```java
class PaymentController {
  @RequestMapping(value = "/payment", method = RequestMethod.POST)
  public void pay(@RequestBody CardPaymentCardDto.PaymentRequest req) {
    final CardPaymentService cardPaymentService = cardPaymentFactory.getType(req.getType());
    cardPaymentService.pay(req);
  }
}

public interface CardPaymentService {
  void pay(CardPaymentCardDto.PaymentRequest req);
}

public class ShinhanCartdPaymentService implements CardPaymentService {
  @Override
  public void pay(CardPaymentDto.PaymentRequest req) {
    shinhanCardApi.pay(req);
  }
}
```

#### Reference from [https://cheese10yun.github.io/spring-solid-dip/](https://cheese10yun.github.io/spring-solid-dip/)

## 02. 간결한 함수 작성하기!

```java
public static String renderPageWithSetupsAndTeardowns(PageData pageData, boolean isSuite) throws Exception {
  boolean isTestPage = pageData.hasAttribute("Test");
  if(isTestPage) {
    WikiPage testPage = pageData.getWikiPage();
    StringBuffer newPageContent = new StringBuffer();
    includeSetupPages(testPage, newPageContent, isSuite);
    newPageContent.append(pageData.getContent());
    includeTeardownPages(testPage, newPageContent, isSuite);
    pageData.setContent(newPageContent.toString());
  }
  return pageData.getHtml();
}
```

<h3 style="text-align: center;">'함수가 길고, 여러가지 기능이 섞여있다...'</h3>
<p style="text-align: center;"> ⬇️ </p>

```java
public static String renderPageWithSetupsAndTeardowns(PageData pageData, boolean isSuite) throws Exception {
  if(isTestPage(pageData)) {
    includeSetupAndTeardownPages(pageData, isSuite);
    return pageData.getHtml();
}
```

<h3 style="text-align: center;">작게 쪼갠다.</h3>
<h3 style="text-align: center;">함수 내 추상화 수준을 동일하게 맞춘다.</h3>

### 02-1. 한 가지만 하기(SRP), 변경에 닫게 만들기(OCP)!

> 함수는 한 가지를 해야 한다. 그 한 가지를 잘 해야 한다. 그 한 가지만을 해야한다.

```java
public Money calculatePay(Employee e) throws InvalidEmployeeType {
  switch(e.type) {
    case COMMISSIONED:
      return calculateCommissionedPay(e);
    case HOURLY:
      return calculateHourlyPay(e);
    case SALARIED:
      return calculateSalariedPay(e);
    default:
      throw new InvalidEmployeeType(e.type);
  }
}
```

<h3 style="text-align: center;">계산도 하고, Money도 생성한다. 두가지 기능을 수행한다.</h3>
<h3 style="text-align: center;">여기서 새로운 직원 타입이 추가된다면 어떻게 될까? </h3>
<p style="text-align: center;"> ⬇️ </p>

```java
public abstract class Employee {
  public abstract boolean isPayday();
  public abstract Money calculatePay();
  public abstract void deliverPay(Money pay);
}

public interface EmployeeFactory {
  public Employee makeEmployee(EmployeeRecord r) throws InvalidEmployeeType;
}

public class EmployeeFactoryImpl implements EmployeeFactory {
  public Employee makeEmployee(EmployeeRecord r) throws InvalidEmployeeType {
    switch(r.type) {
      case COMMISSIONED:
        return new CommissionedEmployee(r);
      case HOURLY:
        return new HourlyEmployee(r);
      case SALARIED:
        return SalaliedEmployee(r);
      default:
        throw new InvalidEmployeeType(r.type);
    }
  }
}
```

<h3 style="text-align: center;">계산과 타입관리를 분리해준다.</h3>
<h3 style="text-align: center;">타입에 대한 처리는 최대한 Factory에서만 해준다.</h3>

### 02-2. 함수 인수

#### 인수의 갯수는 0~2개가 적당하다.

#### 3개 이상인 경우에는 어떤 방식이 좋을까?

```text
// 객체를 인자로 넘기기
Circle makeCircle(double x, double y, double radius); //❌
Circle makeCircle(Point center, double radius); //⭕️

// 가변 인자를 넘기기 -> 특별한 경우가 아니면 잘 사용하지 않는다고 한다.
String.format(String format, Object... args);
```

## 03. 안전한 함수 작성하기

### 부수 효과(Side Effect) 없는 함수

#### 부수 효과 - 값을 반환하는 함수가 외부 상태를 변경하는 경우

```java
public class UserValidator {
  private Cryptographer cryptographer;
  public boolean checkPassword(String userName, String password) {
    User user = UserGateway.findByName(userName);
    if(user != User.NULL) {
      String codedPhrase = user.getPhraseEncodedByPassword();
      String phrase = cryptographer.decrypt(codedPhrase, password);
      if("Valid Password".equals(phrase)) {
        Session.initialize(); <- 함수와 관계없는 외부 상태를 변경시킨다.
        return true;
      }
    }
    return false;
  }
}
```

## 04. 함수 리팩터링

<h3 style="text-align: center;">기능을 구현하는 서투른 함수를 작성한다.</h3>
<p style="text-align: center;">길고, 복잡하고, 중복도 있다.</p>
<p style="text-align: center;"> ⬇️ </p>

<h3 style="text-align: center;">테스트 코드를 작성한다.</h3>
<p style="text-align: center;">함수 내부의 분기와 엣지값마다 빠짐없이 테스트하는 코드를 짠다.</p>
<p style="text-align: center;"> ⬇️ </p>

<h3 style="text-align: center;">리팩터링 한다.</h3>
<p style="text-align: center;">코드를 다듬고, 함수를 쪼개고, 이름을 바꾸고, 중복을 제거한다.</p>

`책에는 더 많은 내용이 있지만 중요한 부분만 요약해서 설명을 한 부분을 정리 하였다. 나같은 개발초보는 확 와닿는 다 보다는 이렇게 하려고 노력을 해야 겠다는 생각이 많이 들었다. 요즘 개발하면서 함수가 뚱뚱해지고 여러가지 기능을 하는 함수를 정신없이 개발하다 보면 생기는 것 같다. 중간중간 리팩토링을 해주면서 함수를 기능 단위로 쪼개는 연습을 하고 있지만 쉽지는 않다. 의식하면서 코드를 작성하도록 계속 노력해야겠다.`

```toc

```
