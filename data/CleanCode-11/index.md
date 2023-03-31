---
emoji: 👍
title: 제로베이스-한달한권 클린코드(Chapter.12)
date: '2022-01-27 21:45:00'
author: 촬스
tags: 블로그 Java CleanCode TIL
categories: CleanCode
---

# Chapter 12 - 창발성(Emergence)

## 창발성 - 하위 계층에는 없는 특성이나 행동이 상위 계층(전체 구조)에서 자발적으로 돌연히 출연하는 현상

- 각각의 개미는 집을 지을 능력이 없지만, 작은 개미들의 상호작용을 통해 집이라는 결과물이 나오는 것처럼 작은 요소들의 상호작용의 반복이 전체구조에 영향을 미친다.

## 01. 창발적 설계란

### 단순한 4가지를 반복하다보면 전체적으로 깨끗한 코드가 만들어진다.

> <h4 style="text-align: end">켄트 백</h4> 
> 1. 모든 테스트를 실행한다.<br>
> 2. 중복을 없앤다.<br>
> 3. 프로그래머 의도를 표현한다.<br>
> 4. <strike>클래스와 메서드 수를 최소로 줄인다.</strike> 실용적 관점에서 타협한다.<br>

## 02. 모든 테스트를 실행한다.

#### 테스트를 작성할 수록 설계 품질이 좋아진다.

- 모든 테스트 케이스를 항상 통과하는 시스템은 '테스트가 가능한 시스템'이다. 테스트가 불가능한 시스템은 검증도 불가능하고, 절대 출시하면 안된다.
- 테스트가 가능한 시스템을 만들려고 애쓰면 설계 품질이 높아진다. 크기가 작고 목적 하나만 수행하는 클래스가 나온다.
- 결합도가 높으면 테스트 케이스를 작성하기 어렵기 때문에 결합도를 낮추는 설계를 하게 된다.
- '모든 테스트를 실행한다'는 규칙을 따르면 시스템은 낮은 결합도와 높은 응집력이라는 목표를 저절로 달성할 수 있다.

## 03. 중복을 없앤다.

### 기존의 코드를 최대한 재활용한다.

```java
int size(){}
boolean isEmpty(){}

// 각 메서드를 따로 구현하는 방법도 있지만, 중복을 업애기 위해 서로 호출하도록 한다.

boolean isEmpty() {
  return this.size() == 0;
}
```

```java
public void scaleToOneDeimension(float desiredDimension, float imageDimension) {
  if(Math.abs(desiredDimension - imageDimension) < errorThreshold)
    return;
  float scalingFactor = desiredDimension / imageDimension;
  scalingFactor = (float)(Math.floor(scalingFactor * 100) * 0.01f);

  RenderedOpnewImage = ImageUtilities.getScaledImage(image, scalingFactor, scalingFactor);
  image.dispose();
  System.gc();
  image = newImage;

  public synchronized void rotate(int degrees) {
    RenderedOpnewImage = ImageUtilities.getScaledImage(image, degrees);
    image.dispose();
    System.gc();
    image = newImage;
  }
}
```

<h3 style="text-align: center;">중복된 코드를 별도의 메서드로 분리한다.</h3>
<h3 style="text-align: center;">⬇️</h3>

```java
public void scaleToOneDeimension(float desiredDimension, float imageDimension) {
  if(Math.abs(desiredDimension - imageDimension) < errorThreshold)
    return;
  float scalingFactor = desiredDimension / imageDimension;
  scalingFactor = (float)(Math.floor(scalingFactor * 100) * 0.01f);
  replaceImage(ImageUtilities.getScaledImage(image, scalingFactor, scalingFactor));


  public synchronized void rotate(int degrees) {
    replaceImage(ImageUtilities.getScaledImage(image, degrees));
  }

  private void replaceImage(RenderedOpnewImage) {
    RenderedOpnewImage =
    image.dispose();
    System.gc();
    image = newImage;
  }
}
```

<h3 style="text-align: center;">별도의 클래스로 분리하면 추후 재활용성이 높아진다.</h3>

### Template Method 패턴

#### 알고리즘의 구조를 상위 클래스의 메서드에서 정의하고, 하위 클래스에서 자신에 맞게 세부 알고리즘을 정의한다.

- 구현하려는 알고리즘에 일정한 단계가 있고, 세부 단계마다 조금씩 구현 내용이 다를 때 사용한다.
- 알고리즘의 여러 단계를 각 메서드로 선언하고, 그 알고리즘을 수행할 템플릿 메서드를 만든다.
- 하위 클래스에서는 나눠진 메서드(단계)를 구현한다.

```java
public class VactionPolicy {
  public void accrueUSDDivisionVacation() {
    //지금까지 근무한 시간을 바탕으로 휴가 일수를 계한하는 코드
    // ...
    // 휴가 일수가 미국 최소 법정 일수를 만족하는지 확인하는 코드
    // ...
    // 휴가 일수를 급여 대장에 적용하는 코드
    // ...
  }
  public void accrueEUDDivisionVacation() {
    //지금까지 근무한 시간을 바탕으로 휴가 일수를 계한하는 코드
    // ...
    // 휴가 일수가 유럽연합 최소 법정 일수를 만족하는지 확인하는 코드
    // ...
    // 휴가 일수를 급여 대장에 적용하는 코드
    // ...
  }
}
```

<h3 style="text-align: center;">최소 법정 일수를 계산하는 코드를 제외하면 두 메서드는 거의 동일하다.</h3>
<h3 style="text-align: center;">중복을 줄이기 위해 템플릿 메서드 패턴을 적용해 본다.</h3>
<h3 style="text-align: center;">⬇️</h3>

```java
abstract public class VactionPolicy {
  public void accrueVacation() {
    calculateBaseVacationHours();
    alterForLegalMinimums();
    applyToPayroll();
  }

  private void calculateBaseVacationHours() {/*...*/};
  abstract protected void alterForLegalMinimums();
  private void applyToPayroll() {/*...*/};
}

public class USVacationPolicy extends VactionPolicy {
  @Override protected void alterForLegalMinimums() {
    // 미국 최소 법정 일수를 사용
  }
}
public class EUVacationPolicy extends VactionPolicy {
  @Override protected void alterForLegalMinimums() {
    // 유럽연합 최소 법정 일수를 사용
  }
}
```

- 공통된 알고리즘을 accrueVacation 템플릿 메서드에 담고, 동일한 내용에 대해서는 메서드를 구현하고 다른 내용 (미국/유럽연합)은 하위 클래스가 구현하도록 abstract 메서드로 만든다.
- 하위 클래스 USVacationPolicy, EUVacationPolicy는 각자의 알고리즘을 구현한다.

## 04. 의도를 표현한다.

1. 좋은 이름을 선택한다.
2. 함수와 클래스 크기를 가능한 줄인다. 작은 클래스와 작은 함수는 이름짓기도 쉽다.
3. 표준 명칭을 사용한다. 다른 개발자가 보고 바로 이해할 수 있도록 디자인 패턴을 사용했다면 그 이름을 클래스에 넣어준다.
4. 단위 테스트 케이스를 꼼꼼하게 작성한다.
5. 다른 사람을 위해 조금이라도 더 읽기 쉽게 만드려고 노력한다.

## 05. 실용적 관점에서 타협한다.

### 과도한 설계를 하지말자

- 여러가지 규칙에 극단적으로 심취해 클래스와 메서드를 무수하게 만들지 말라.
- 결국 좋은 코드를 만드는 이유는 생산성을 올리기 위한 것이다.
- 실용적인 관점에서 타협해야 한다.
  > `개집 짓는데 사람 집 지으면 안된다.`

`요즘 많이 듣는 말 복잡하게 생각하지 말고 심플하게 하려고 노력해라!`

```toc

```
