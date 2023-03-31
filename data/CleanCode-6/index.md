---
emoji: 👍
title: 제로베이스-한달한권 클린코드(Chapter.7)
date: '2022-01-12 20:20:00'
author: 촬스
tags: 블로그 Java CleanCode TIL
categories: CleanCode
---

# Chapter 7 - 오류 처리

## 01. 예외 처리 방식

### 오류 코드를 리턴하지 말고, 예외를 던져라

```java
public class DeviceController {
...
  public void sendShutDown() {
    //Check the state of the device
    if(handle != DeviceHandle.INVALID) {
      //Save the device status to the record field
      retrieveDeviceRecord(handle);
      // If not suspended, shut down
      if(record.getStatus() != DEVICE_SUSPENDED) {
        pauseDevice(handle);
        clearDeviceWorkQueue(handle);
        closeDevice(handle);
      } else {
        logger.log("Device suspended. Unable to shut down");
      }
    } else {
        logger.log("Invalid handle for : " + DEV1.toString());
    }
  }
...
}
```

<h3 style="text-align: center;"> ⬆️ Bad Case </h3>

- 옛날에는 오류를 나타낼 때 에러코드를 던졌다.
- 하지만 예외를 던지는 것이 명확하고, 처리 흐름이 깔끔해진다.

```java
public class DeviceController {
...
  public void sendShutDown() {
    try {
      tryToShutDown();
    } catch (DeviceShutDownError e) {
      logger.log(e);
    }
  }
  private void tryToShutDown() throws DeviceShutDownError {
      DeviceHandle handle = getHandle(DEV1);
      DeviceRecord record = retrieveDeviceRecord(handle);
      pauseDevice(handle);
      clearDeviceWorkQueue(handle);
      closeDevice(handle);
  }

  private DeviceHandle getHandle(DeviceId id) {
    ...
    throw new DeviceShutDownError("Invalid handle for: " + id.toString());
    ...
  }
...
}
```

<h3 style="text-align: center;"> ⬆️ Good Case </h3>

- 오류가 발생한 부분에서 예외를 던진다. (별도의 처리가 필요한 예외라면 checked Exception으로 던진다.)
- checked exception에 대한 예외처리를 하지 않는다면 메서드 선언부에 throws를 명시해야 한다.
- 예외를 처리할 수 있는 곳에서 catch하여 처리한다.

## 02. Unchecked Exception을 사용하라

### Checked vs Unchecked Exeption

- Exception을 상속하면 Checked Exeption 명시적인 예외처리가 필요하다
  - (예) IOException, SQLException
- RuntimeException을 상속하면 Unchecked Exeption 명시적인 예외처리가 필요하지 않다.
  - (예) NullPointException, IllegalArgumentException, IndexOutOfBoundException

### &lt;Effective Java&gt; Exception에 관한 규약

> 자바 언어 명세가 요구하는 것은 아니지만, 업계에 널리 퍼진 규약으로 <br> > `Error클래스를 상속해 하위 클래스를 만드는 일은 자제하자.` <br>
> 즉, 사용자가 직접 구현하는 unchecked throwable은 모두 `RuntimeException의 하위 클래스`여야 한다. <br>
> Exception, RuntimeException, Error를 상속하지 않는 throwable을 만들 수도 있지만, 이러한 throwable은 정상적인 사항보다 나을 게 하나도 없으면서 API 사용자를 헷갈리게 할 뿐이므로 절대로 사용하지 말자.

### Checked Exeption이 나쁜 이유

```java
public class DeviceController {
...
  public void sendShutDown() { // 3
    try {
      tryToShutDown();
    } catch (DeviceShutDownError e) {
      logger.log(e);
    }
  } // 3
  private void tryToShutDown() throws DeviceShutDownError { // 2
      DeviceHandle handle = getHandle(DEV1);
      DeviceRecord record = retrieveDeviceRecord(handle);
      pauseDevice(handle);
      clearDeviceWorkQueue(handle);
      closeDevice(handle);
  }

  private DeviceHandle getHandle(DeviceId id) {
    ...
    throw new DeviceShutDownError("Invalid handle for: " + id.toString()); // 1
    ...
  }
...
}
```

1. 특정 메소드에서 checked exception을 throw하고 상위 메소드에서 그 exception을 catch한다면 모든 중간단계 메소드에 exception을 throws해야 한다.
2. OCP(계방 폐쇄 원칙) 위배
   - 상위 레벨 메소드에서 하위 레벨 메소드의 디테일에 대해 알아야 하기 때문에 OCP 원칙에 위배된다.
3. 필요한 경우 checked exception을 사용해야 되지만 일반적인 경우 득보다 실이 많다.

### Unchecked Exeption을 사용하자

> 안정적인 소프트웨어를 제작하는 요소로 확인된 예외가 반드시 필요하지는 않다는 사실이 분명해졌다. <br>
> C#은 확인된 예외를 지원하지 않는다 영웅적인 시도에도 불구하고 <br>
> C++역시 확인된 예외를 지원하지 않는다. 파이썬이나 루비도 마찬가지다. <br>
> 그럼에도 불구하고 C#, C++, 파이썬, 루비는 안정적인 소프트웨어를 구현하기에 무리가 없다.

## 03. Exeption 잘 쓰기

### 예외에 메시지를 담기

```java
public class DeviceController {
...
  private DeviceHandle getHandle(DeviceId id) {
    ...
    throw new DeviceShutDownError("Invalid handle for: " + id.toString());
    ...
  }
...
}
```

- 오류가 발생한 원인과 위치를 찾기 쉽도록, 예외를 던질 때는 전후 상황을 충분히 덧붙인다.
- 실패한 연산 이름과 유형 등 정보를 담아 예외를 던진다.

### exception wrapper

```java
ACMEport port = new ACMEport(12);
try{
  port.open();
} catch(DeviceResponseException e) {
  reportPortError(e);
  logger.log("Device response exception", e);
} catch(ATM1212UnlockedEcveption e) {
  reportPortError(e);
  logger.log("Unlock exception", e);
} catch(GMXError e) {
  reportPortError(e);
  logger.log("Device response exception", e);
} finally {
  ...
}
```

- 로그를 찍을 뿐 할 수 있는게 없다.

```java
LocalPort port = new Localport(12);
try{
  port.open();
} catch(PortDeviceFailure e) {
  reportPortError(e);
  logger.log(e.getMessage(), e);
} finally {
  ...
}

public class Localport {
  private ACMEport innerPort;
  public Localport(int portNumber) {
    innerPort = new ACMEport(portNumber);
  }

  public void open(){
    try{
      innerPort.open();
    } catch(DeviceResponseException e) {
      throw new PortDeviceFailure(e);
    } catch(ATM1212UnlockedEcveption e) {
      throw new PortDeviceFailure(e);
    } catch(GMXError e) {
      throw new PortDeviceFailure(e);
    }
  }
}
```

#### 예외를 감싸는 클래스를 만든다.

- port.open() 시 발생하는 checked exception들을 감싸도록 port를 가지는 LocalPort 클래스를 만든다.
- port.open()이 던지는 checked exception들을 하나의 PortDeviceFailure exception으로 감싸서 던진다.

## 04. 실무 예외 처리 패턴

### getOrElse - 예외 대신 기본값을 리턴한다.

1. null이 아닌 기본값을 리턴한다.

```java
List<Employee> employees = getEmployee();
if(employees != null) {
  for(Employee e : employees) {
    totalPay += e.getPay()
  }
}
```

<h3 style="text-align: center;"> ⬆️ Bad Case </h3>
- getEmployees를 설계할 때, 데이터가 없는 경우를 null로 표현했는데 null을 리턴한다면 이후 코드에서 모두 null 체크가 있어야 한다.

```java
List<Employee> employees = getEmployee();
for(Employee e : employees) {
  totalPay += e.getPay()
}

public List<Employee> getEmployees() {
  if(.. there are no employees ..) {
    return Collection.emptyList();
  }
}
```

<h3 style="text-align: center;"> ⬆️ Good Case </h3>
- 복수형의 데이터를 가져올 때는 데이터의 없음을 의미하는 컬렉션을 리턴하면 된다. null 보다 size가 0인 컬렉션이 훨씬 안전하다.

### 빈 컬렉션, 빈 문자열을 적용할 수 없는 경우

2. 도메인에 맞는 기본값을 가져온다.

```java
UserLevel userLevel = null;
try {
  User user = userRepository.findByUserId(userId);
  userLevel = user.getUserLevel();
} catch (UserNotFoundException e) {
  userLevel = UserLevel.BASIC;
}
// userLevel을 이용한 처리
```

- 호출부에서 예외 처리를 통해 userLevel 값을 처리한다. 그러나 코드를 계속 읽어 나가면서 논리적인 흐름이 끊긴다.
<h3 style="text-align: center;"> ⬇️ </h3>

`호출부`

```java
UserLevel userLevel = userService.getUserLevelOrDefault(userId);
// userLevel을 이용한 처리
```

---

```java
pubilc class UserService {
  private static final UserLevel USER_BASIC_LEVEL = UserLevel.BASIC;

  public UserLevel getUserLevelOrDefault(Long userId) {
    try {
      User user = userRepository.findByUserId(userId);
      return user.getUserLevel();
    } catch (UserNotFoundException e) {
      return USER_BASIC_LEVEL;
    }
  }
}
```

- 예외 처리를 데이터를 제공하는 쪽에서 처리해 호출부 코드가 심플해진다.
- 코드를 읽어가며 논리적인 흐름이 끝기지 않는다.
- 도메인에 맞는 기본값을 도메인 서비스에서 관리한다.

### 도메인에 맞는 기본값이 없는 경우

### getOrElseThrow - null 대신 예외를 던진다.

1. null 체크 지옥에서 벗어나자.

```java
public void registerItem(Item item) {
  if(item != null) {
    ItemRepository registry = persistentStore.getItemRegistry();
    if(registry != null) {
      Item existing = registry.getItem(item.getId());
      if(existing.getBillingPeriod().hasRetailOwner()) {
        existing.register(item);
      }
    }
  }
}
```

- null 체크가 빠진 부분이 발생할 수 있다.
- persistentStore에 대한 null 체크가 빠져 있지만 알아챌 수 없다.
- 코드 가독성이 현저히 떨어진다.

2. 기본값이 없을 때 null 대신 예외를 던진다.

```java
User user = userRepository.findByUserId(userId);
if(user != null) {
  // user를 이용한 처리
}
```

- user를 사용하는 쪽에선 매번 null 체크를 해야한다.
- 가독성뿐 아니라 안정성도 떨어진다.
<h3 style="text-align: center;"> ⬇️ </h3>

`호출부`

```java
User user = userService.getUserOrElseThrow(userId);
// user을 이용한 처리
```

---

```java
pubilc class UserService {
  private static final UserLevel USER_BASIC_LEVEL = UserLevel.BASIC;

  public User getUserOrElseThrow(Long userId) {
    User user = userRepository.findByUserId(userId);
    if(user == null) {
      throw new IllegalArgumentException("User is not found. userId = " + userId);
    }
    return user;
  }
}
```

- 데이터를 제공하는 쪽에서 null 체크를 하여, 데이터가 없는 경우엔 예외를 던진다.
- 호출부에서 매번 null 체크를 할 필요 없이 안전하게 데이터를 사용할 수 있다.
- 호출부의 가독성이 올라간다.

### 파라미터의 null을 점검하라

```java
public class MetricsCalculator {
  public double xProjection(Point p1, Point p2) {
    return (p2.x - p1.x) * 1.5;
  }
}

// calculator.xProjection(null, new Point(12, 13));
// NullPointerException 발생한다.
```

- null을 리턴하는 것도 나쁘지만 null을 메서드로 넘기는 것은 더 나쁘다.
- null을 메서드의 파라미터로 넣어야 하는 API를 사용하는 경우가 아니면 null을 메서드로 넘기지 마라.
<h3 style="text-align: center;"> ⬇️ </h3>

```java
public class MetricsCalculator {
  public double xProjection(Point p1, Point p2) {
    if(p1 == null || p2 == null) {
      throw InvalidArgumentException("Invalid argument for MetricsCalculator.xProjection");
    }
    return (p2.x - p1.x) * 1.5;
  }
}
```

- null이 들어오면 unchecked exception을 발생시킨다.

```java
public class MetricsCalculator {
  public double xProjection(Point p1, Point p2) {
    assert p1 != null : "p1 should not be null";
    assert p2 != null : "p2 should not be null";

    return (p2.x - p1.x) * 1.5;
  }
}
```

- assert를 통해 null이 들어오면 에러를 발생시킨다.
- 실무에서는 에러를 던져주는 방법을 더 선호한다.

### 실무에서는 보통 자신의 예외를 정의한다.

```java
public class MyProjectException extends RuntimeException {
  private MyErrorCode errorCode;
  private String errorMessage;

  public MyProjectException(MyErrorCode errorCode) {
    //..
  }

  public MyProjectException(MyErrorCode errorCode, String errorMessage) {
    //..
  }
}

public enum MyErrorCode {
  private String defaultErrorMessage;

  INVALID_REQUEST("잘못된 요청입니다."),
  DUPLICATED_REQUEST("기본 요청과 중복되어 처리 할 수 없습니다."),
  //..
  INTERNAL_SERVER_ERROR("처리 중 에러가 발생했습니다.");
}

// 호출부
if (request.getUserName() == null) {
  throw new MyProjectException(ErrorCode.INVALID_REQUEST, "userName is null");
}
```

#### 장점

- 에러 로그에서 stacktrace 해봤을 때 우리가 발생시킨 예외라는 것을 바로 인지할 수 있다.
- 다른 라이브러리에서 발생한 에러와 섞이지 않는다. 우리도 IllegalArgumentException을 던지는 것보다 우리 예외로 던지는게 어느 부분에서 에러가 났는 지 파악하기에 용이하다.
- 우리 시스템에서 발생한 에러의 종류를 나열할 수 있다.

`오류 처리에 대한 방식을 최근에 프로젝트 하면서 여러가지 일을 겪다보니 중요하다고 많이 느끼고 있었다. 내가 직접 Exception을 만들어서 사용하는 경우를 아직 겪어보지 않아서 오늘 배운 부분에 대해서 잘 이해하고 있다가 비슷한 케이스가 발생했을 때 적용을 해봐야 겠다.`

```toc

```
