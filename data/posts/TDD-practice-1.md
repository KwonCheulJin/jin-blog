---
title: TDD 실천법과 도구
date: '2021-12-25'
category: TDD JUnit
description: 책을 활용한 TDD익숙해지기 (CHAPTER.1)
path: TDD-practice-1
featured: true
---

# github link - [TDD_practice](https://github.com/KwonCheulJin/TDD_practice)

# Chapter 1 - TDD(Test Driven Development - 테스트 주도 개발)

## - 목표

> - TDD에 대한 전반적인 지식을 쌓는다.
> - TDD를 익숙하게 사용하도록 숙달한다.
> - 일주일에 1챕터 이상 진행한다.

## - 책을 읽게 된 계기

> NEXTSETP에서 자바 플레이 그라운드 - 자바 with TDD, 클린코드 수업을 첫 번째 미션을 진행했었는데TDD에 대한 충분한 이해가 부족하다고 판단되었고 보충을 한 뒤 다시 수업을 들어야 겠다고 생각했다. 그래서 수업에 대한 다른 사람들의 질문을 볼 수 있는 SLACK에 가입을 하였고 그 곳에서 어떤 분이 질문 한 곳에서 박재성님의 답변에 절판된 TDD 실천법과 도구 책에 대한 pdf로 공개되어 있는 블로그를 알게되어서 시작하게 되었다.

## - 작성 방법

> 책에 대한 내용을 나열하기 보다는 실습 위주의 내용을 복습 차원으로 기록을 할 것이다.
> 책에서는 예제를 eclipse IDE 를 활용하였지만 나는 IntelliJ IDEA를 활용하여 실습을 진행 하였다.

## - 테스트 주도 개발의 진행 방식

> - 질문(Ask): 테스트 작성을 통해 시스템에 질문한다.(테스트 수행 결과는 실패)
> - 응답(Respond): 테스트를 통과하는 코드를 작성해서 질문에 대답한다.(테스트 성공)
> - 정제(Refine): 아이디어를 통합하고, 불필요한 것은 제거하고, 모호한 것은 명확히 해서 대답을 정제한다.(리펙토링)
> - 반복(Repeat): 다음 질문을 통해 대화를 계속 진행한다.

## 은행 계좌(Account) 클래스 만들기

### 1. 계좌 생성 테스트

### `[질문] -> 응답 -> 정제`

> - 구현해야 할 기능을 파악하고, 목록을 작성한다.
> - 계좌 생성 기능을 구현하기 위한 최초의 테스트 케이스를 만들고 실패하는 모습을 확인한다.

---

> - 클래스 이름은 Account
> - 기능은 세 가지
>   - 잔고 조회
>   - 입금
>   - 출금
>
> * 금액은 원 단위로(예: 천 원 = 1000)

#### - 프로젝트 생성

IntelliJ 메뉴에서 [File] -> [New] -> [Project]를 선택해서 프로젝트를 생성한다.
<br> 나는 maven 대신 gradle로 프로젝트를 생성했다.

![create-project.png](/images/TDD-practice-1/create-project.png)

![project-name.png](/images/TDD-practice-1/project-name.png)

Account 클래스를 만든적이 없어서 당연한 에러가 난다.<br>
이런 식으로 진행하는 이유는 테스트 케이스 작성 시 흐름을 잃지 않기 위해서라고 책에서 기술하고 있다.

![accountTestClass.png](/images/TDD-practice-1/accountTestClass.png)

![mainMethodTest.png](/images/TDD-practice-1/mainMethodTest.png)

IntelliJ에서는 동인한 오류 화면을 표시해 준다.

![accountClassSymbolError.png](/images/TDD-practice-1/accountClassSymbolError.png)

이제, 시스템의 메시지에 응답해서 계좌가 생성 테스트 케이스를 통과하는 코드를 작성해본다.

### `질문 -> [응답] -> 정제`

![createAccountClass.png](/images/TDD-practice-1/createAccountClass.png)

![mainJavaDir.png](/images/TDD-practice-1/mainJavaDir.png)

main > java package에 Account Class를 생성

![throwException.png](/images/TDD-practice-1/throwException.png)

예외(Exception)를 호출하는 쪽으로 던져버리도록 한다.

```java
class AccountTest {

    public void testAccount() throws Exception {
        Account account = new Account();

        if (account == null) {
            throw new Exception("계좌생성 실패");
        }

    }

    public static void main(String[] args) {
        AccountTest test = new AccountTest();
        try {
            test.testAccount();
        } catch (Exception e) {
            System.out.println("실패(X)");
            return;
        }
        System.out.println("성공(O)");
    }

}
```

![testSuccess.png](/images/TDD-practice-1/testSuccess.png)

#### [**저자한마디**]

> **최대한 빨리 실패하기** <br>
> TDD에서는 테스트 자동화를 통해서 개발이 시작된 시점부터 완료될 때까지 가능한 한 빠른 시점 내에 그리고 자주 실패를 경험하도록 유도하고 있다.
> 심지어는 개발이 시작되기도 전에 실패가 발생하는 상황부터 보고 시작하라고 하니 말 다했다.
> 그런데 이런 방식은 사실 일반적인 문제 해결 방식과는 조금 다르다.
> 보통은 작업의 중간 과정에서조차도 실패를 하지 않기 위해 최대한 노력하는 경우가 더 많다.
> 하지만 TDD는 실패를 통해 배움을 늘려가는 기법이다.
> OK조건을 사전에 정해독 빠르게 실패를 경험하며, 그 조건을 등대로 삼아 실패 상황을 최대한 빨리 극복하고자 노력한다.
> 성공한 항목과 실패한 항목이 명확하고, 작업해야 하는 부분이 확실하다.
> 성공에 필요 조건을 만들고, 실패하는 조건 항목을 성공시킨다.
> 그래서 빨리 실패하면 실패할수록 좀 더 성공에 가까워지는 묘한 개발 방식이다.

### `질문 -> 응답 -> [정제]`

> - 리팩토링을 적용할 부분이 있는지 찾아본다.
> - ToDo 목록에서 완료된 부분을 지운다.

---

> ~~- 클래스 이름은 Account~~
>
> - 기능은 세 가지
>   - 잔고 조회
>   - 입금
>   - 출금
>
> * 금액은 원 단위로(예: 천 원 = 1000)

현재 코드에서 JUnit 단위 테스트 프레임워크를 적용해서
단위 테스트 프레임워크를 사용하면 어떤 부분이 구조화되고,
어떤 장점을 갖게 되는지 살펴 볼 것이다.

```java
class AccountTest {

    @Test
    public void testAccount() throws Exception {
        Account account = new Account();
        if (account == null) {
            throw new Exception("계좌생성 실패");
        }
    }

}
```

`@Test`어노테이션을 추가하고 `JUnit`을 import 해주면 `JUnit`을 사용가능해진다.
<br>
이제 `main method`는 제외하고 테스트를 다시 실행해보자.

![addJunitTest.png](/images/TDD-practice-1/addJunitTest.png)

테스트가 성공 하였다. 다음은 테스트 코드를 좀 더 간결하게 변경을 해준다.
<br>
`testAccount()`메소드 안의 if문은 시나리오 흐름상 '검증'이라는 부분을 표현하기 위해 사용했을 뿐 현재는 의미가 없기 때문에 제외하겠다.

```java
class AccountTest {

    @Test
    public void testAccount() throws Exception {
        Account account = new Account();
    }
}
```

테스트 케이스 항목이 극단적으로 간단해졌다. <br>
이제 다음 테스트로 넘어가 보자.

### 2. 잔고 조회 테스트

### `[질문] -> 응답 -> 정제`

> - 잔고 조회(getBalance)기능 작성을 위한 테스트 케이스를 작성한다.
> - 테스트 수행 결과가 오류(error)로 표시된 항목은 실패(failure) 항목으로 만든다.

다음은 세가지 기능 중에서 잔고 조회 부분이다. <br>
잔고 조회 기능은 어떻게 하면 제대로 구현됐는지 확인이 가능할까? <br>
테스트 시나리오를 조금 발전시켜 보자.

---

> ~~- 클래스 이름은 Account~~
>
> - 기능은 세 가지
>   - 잔고 조회
>     - 10000원으로 계좌 생성
>     - 잔고 조회 결과 일치
>   - 입금
>   - 출금
>
> * 금액은 원 단위로(예: 천 원 = 1000)

이번엔 잔고 조회 시나리에 맞춰 테스트 메소를 작성해 보도록 하겠다.

![getBalance.png](/images/TDD-practice-1/getBalance.png)

![createGetBalance.png](/images/TDD-practice-1/createGetBalance.png)

`fail()`은 JUnit에서 제공하는 메소드로 fail 메소드가 호출되면 해당 테스트 케이스는 그 순간 무조건 실패한다.<br>
`fail` 메소드 대신에 `throw new Exception();` 형태로 작성할 수 있다.<br>
`getBalance` 메소드를 위와 같이 작성하면 생성자가 없기 때문에 에러가 발생한다. <br>
그리고 `account` 클래스 내에 `getBalance` 메소드도 존재 하지 않기 때문에 IntelliJ에서는 친절하게 빨간 글씨로 표시를 해준다. <br>
그래서 `account` 클래스 안에 생성자와 `getBalance` 메소드를 만들어 주자.

```java
public class Account {

    public Account(int i) {

    }

    public int getBalance() {
        return 0;
    }
}
```

이렇게 위와 같이 인자(argument)로 `int`를 갖는 생성자와 getBalance() 메소드를 생성해 주면 아래와 같이 처음에 클래스 생성때 만들어 놓았던 테스트에서 에러가 발생한다.

![testAccountError.png](/images/TDD-practice-1/testAccountError.png)

이유는 `Account` 클래스 안에 인자(argument)로 `int`를 갖는 생성자만 생기고 인자를 갖지 않는 기본생성자는 가지고 있지 않기 때문에 오류가 발생한다.

책의 예제에서는 '초기 예치금액 없이 계좌를 만들 수 없다'라는 조건을 가지고 실습을 진행하고 있어서 기본 생성자를 생성하지 않고 `testAccount` 메소드를 수정해 준다.

```java
@Test
void testAccount() throws Exception {
    Account account = new Account(10000);
}
```

### `질문 -> [응답] -> 정제`

> - 앞서 작성된 테스트 케이스를 이용해 잔고 조회 기능을 구현한다.
> - 테스트 실패 시에 메시지를 보여줄 수 있는 구조를 생각해본다.

여기서는 계좌의 잔고를 알려주는 `getBalance` 메소를 구현한다. 그런데 약간 비겁하게 앞서 작성한 테스트 케이스의 맹점을 노려작성 하였다.

```java
public class Account {

    public Account(int i) {

    }

    public int getBalance() {
        return 10000;
    }
}
```

단순하게 `getBalance` 메소드 호출 시에 10000을 돌려주도록 하드코딩으로 수정하였다.

당연히 테스트는 통과를 하게 된다. <br>

여기서 저자는 테스트 작성을 이렇게 한 이유가 있다.

1. `테스트 케이스를 엉성하게 만들면 테스트 자체를 신뢰할 수 없게 된다.`라는 점을 말하려고 한 것이다.
2. 그 다음으로는 `테스트 케이스를 통한 제품 코드 구현을 하드코딩으로 시작하는 것도 괜찮은 출발점` 이라는 것을 알려주고 싶어서이다.

<br> 이외의 자세한 내용은 책에 있으므로 생략하겠다.

다음으로 로직 검증을 위한 테스트 케이스를 추가해보자.

```java
@Test
void testGetBalance() {
    Account account = new Account(10000);
    if (account.getBalance() != 10000) {
        fail();
    }
    account = new Account(1000);
    if (account.getBalance() != 1000) {
        fail();
    }
    account = new Account(0);
    if (account.getBalance() != 0) {
        fail();
    }
}
```

테스트 케이스를 보강 후 다시 테스트를 진행해 보자.

![getBalanceError.png](/images/TDD-practice-1/getBalanceError.png)

테스트가 실패하면서 로직에 문제가 있음을 발견하고, `충분한 만큼`의 테스트 케이스가 작성됐다고 생각되면, 다시 `Account`클래스의 `getBalance`메소드를 제대로 다시 구현해보자

```java
public class Account {

    private int balance;

    public Account(int money) {
        this.balance = money;
    }

    public int getBalance() {
        return this.balance;
    }
}

```

![getBalanceSuccess.png](/images/TDD-practice-1/getBalanceSuccess.png)

책에서는 좀 더 상세하게 step-by-step으로 진행을 하는데 글이 너무 길어져 중간 과정은 조금 생략을 하였다.

잔고 조회 테스트도 성공을 해서 작업 목록에서 잔고 조회에 줄을 그어준다.

> ~~- 클래스 이름은 Account~~
>
> - 기능은 세 가지
>   - ~~잔고 조회~~
>     - 10000원으로 계좌 생성
>     - 잔고 조회 결과 일치
>   - 입금
>   - 출금
>
> * 금액은 원 단위로(예: 천 원 = 1000)

### `질문 -> 응답 -> [정제]`

> - 구현된 잔고 조회 로직에 대한 리펙토링 작업을 한다.
> - 본격적으로 JUnit 테스트 프레임워크를 사용한다.

클레스에 대한 리펙토링은 위에서 같이 진행을 하였기 때문에 생략하고 JUnit을 사용한 migration을 진행해 보려고 한다.

먼저 여기서는 JUnit에서 제공하는 `assertEquals()`라는 메소드를 이용해서 진행하였다.

> `assertEquals`(예상값, 실제값)<br> > `assertEquals`("설명", 예상값, 실제값)(JUnit4) - 책 예제<br> > `assertEquals`(예상값, 실제값, "설명")(JUnit5) - 현재<br>

> `assertEquals`(10000, account.getBalance());

> `assertEquals`("10000원으로 계좌 생성 후 잔고 조회",10000, account.getBalance()) - 책 예제;
> `assertEquals`(10000, account.getBalance(), "10000원으로 계좌 생성 후 잔고 조회") - 현재;

TDD를 진행하는데 있어 `assertEquals`라는 특정 메소드 자체가 중요한건 아니다. `assertEquals` 같은 메소드를 쓰지 않았다고 해서 테스트 주도 개발이 아닌 건 아니다. 자동화된 테스트 케이스를 미리 만들면서 개발한다면 System.out.println()등을 사용해도 TDD라 불릴 수 있다. TDD에서 중요한 건 `목표 이미지를 미리 세운다 -> 자동화된 테스트 케이스를 작성한다 -> 만족시키는 로직을 작성하고 정련한다.` 이다.

앞으로는 if문 대신에 `assertEquals` 메소드를 적극 사용해보자.

```java
@Test
void testGetBalance() {
    Account account = new Account(10000);
    assertEquals(10000, account.getBalance());
    account = new Account(1000);
    assertEquals(1000, account.getBalance());
    account = new Account(0);
    assertEquals(0, account.getBalance());
}
```

![assertEquals.png](/images/TDD-practice-1/assertEquals.png)
이상없이 테스트를 성공하였다

### 3. 입금과 출금 테스트

### `[질문] -> 응답 -> 정제`

> - 입금과 출금 기능을 구현하기 위한 테스트 케이스를 작성한다.

---

> ~~- 클래스 이름은 Account~~
>
> - 기능은 세 가지
>   - ~~잔고 조회~~
>     - 10000원으로 계좌 생성
>     - 잔고 조회 결과 일치
>   - 입금
>     - 10000원으로 계좌 생성
>     - 1000원 입금
>     - 잔고 11000원 확인
>   - 출금
>     - 10000원으로 계좌 생성
>     - 1000원 출금
>     - 잔고 9000원 확인
>
> * 금액은 원 단위로(예: 천 원 = 1000)

```java
public void deposit(int money) {

}

public void withdraw(int money) {

}
```

```java
@Test
void testDeposit() {
    Account account = new Account(10000);
    account.deposit(1000);
    assertEquals(11000, account.getBalance());
}

@Test
void testWithdraw(){
    Account account = new Account(10000);
    account.withdraw(1000);
    assertEquals(9000, account.getBalance());
}
```

![deposit-withdraw.png](/images/TDD-practice-1/deposit-withdraw.png)

새로 만든 구 개의 테스트가 모두 실패! 각 항목을 클릭해 예상값과 결과값이 어떻게 나와서 실패하는가를 확인한다.

### `질문 -> [응답] -> 정제`

> -입금과 출금 기능을 구현한다.

```java
public void deposit(int money) {
    this.balance += money;
}

public void withdraw(int money) {
    this.balance -= money;
}
```

`Account` 클래스에 두 메소드를 구현하고 테스트 실행!

![allSuccess.png](/images/TDD-practice-1/allSuccess.png)

> ~~- 클래스 이름은 Account~~
>
> - 기능은 세 가지
>   - ~~잔고 조회~~
>     - 10000원으로 계좌 생성
>     - 잔고 조회 결과 일치
>   - ~~입금~~
>     - 10000원으로 계좌 생성
>     - 1000원 입금
>     - 잔고 11000원 확인
>   - ~~출금~~
>     - 10000원으로 계좌 생성
>     - 1000원 출금
>     - 잔고 9000원 확인
>
> * 금액은 원 단위로(예: 천 원 = 1000)

구현이 된 부분은 ToDo목록에서 지운다.

### `질문 -> 응답 -> [정제]`

> - 중복해서 나타나는 계좌 클래스 생성 부분을 리팩토링한다.
> - 테스트에 사용할 객체를 초기화하기 위한 setUp 메소드를 구현한다.
> - ToDo 목록에서 작성된 부분을 제거한다.

Account 클래스의 최종 모습

```java
public class Account {

    private int balance;

    public Account(int money) {
        this.balance = money;
    }

    public int getBalance() {
        return this.balance;
    }

    public void deposit(int money) {
        this.balance += money;
    }

    public void withdraw(int money) {
        this.balance -= money;
    }
}
```

테스트 클래스의 최종 모습

```java
import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class AccountTest {

    private Account account;

    @BeforeEach
    public void setup() {
        account = new Account(10000);
    }

    @Test
    void testAccount() throws Exception {
    }

    @Test
    void testGetBalance() {
        assertEquals(10000, account.getBalance(),"10000원으로 계좌 생성 후 잔고 조회");

        account = new Account(1000);
        assertEquals(1000, account.getBalance());
        account = new Account(0);
        assertEquals(0, account.getBalance());
    }

    @Test
    void testDeposit() {
        account.deposit(1000);
        assertEquals(11000, account.getBalance());
    }

    @Test
    void testWithdraw(){
        account.withdraw(1000);
        assertEquals(9000, account.getBalance());
    }
}
```

책에서 리팩토링하는 부분은 제외를 하였다. 그리고 책에서는 `@Before` 어노테이션이 사용되었지만 JUnit5는 `@BeforeEach`로 변경이 되었다.

### TDD의 장점

> 1. 개발의 방향을 잃지 않게 유지해준다.
> 2. 품질 높은 소프트웨어 모듈 보유
> 3. 자동화된 단위 테스트 케이스를 갖게 된다.
> 4. 사용설명서 & 의사소통의 수단
> 5. 설계 개선
> 6. 보다 자주 성공한다.

1챕터를 블로그에 정리하는 시간도 만만치 않다. 먼저 TDD에 대해서 대략적인 흐름을 이해하는 시간이었고 테스트의 질문 -> 응답 -> 정제 순서대로 차근차근 진행을 하면서
프로그램의 안정성에 크게 기여하고 개발에 좀 더 집중할 수 있게 도와준다는 것을 알게 되었다.

현재 프로젝트를 진행하는 부분에는 쉽게 적용해서 할 수는 없겠지만 다음에 새로운 프로젝트나 추후 내가 원하는 자체서비스 회사를 갔을 때를 대비해서 꾸준히 익혀나가야겠다.
