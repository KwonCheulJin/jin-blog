---
title: 제로베이스-한달한권 클린코드 DAY7
date: '2022-01-13'
category: CleanCode
description: Chapter.8
path: CleanCode-7
image: CleanCode
featured: false
---

# Chapter 8 - 경계

## 01. 경계란 - 우리코드와 외부코드 사이

- 오픈소스, 라이브러리를 안쓰는 프로젝트는 없다.
- 우리가 만든 코드에 외부에서 들어온 코드를 병합해야 한다.
- 외부 코드는 외부에서 만든 코드인데, 외부 시스템과 호출하거나 단순히 외부에서 만들어진 코드일 수 있다.
- 우리 코드와 외부 코드를 깔끔하게 통합시키기 위해 경계를 잘 지어야한다.

## 02. 경계 짓기 (1) 우리 코드를 보호하기

### 캡슐화(Encapsulation)

- 객체의 실제 구현을 외부로 부터 감추는 방식

### Sensor라는 값을 관리해야 하는 상황(Sensor는 외부에서 사용된다.)

- Sensor Id와 Sensor 객체로 저장하고 싶어서, Map을 사용한다.
- 하지만 Map을 그대로 사용하면 Map이 가진 clear() 및 다른 불필요한 메서드가 외부로 노출되어서 누군가 사용 할 수 있다.
- Sensor의 '외부'코드의 관점에서 Sensor 객체의 값들만 가져오도록 하기 위해서 캡슐화를 진행한다.

```java
Map<Sensor> sensors = new HashMap<Sensor>();
Sensor s = sensors.get(sensorId);
```

- 위처럼 Map을 직접 사용하게 되면 Map 인터페이스가 제공하는 clear 등 불필요한 기능이 노출된다.
- 외부 코드가 함부로 호출하면 sensor 데이터가 손상될 수 있고, 이는 우리 의도와 벗어난다.

<h3 style="text-align: center;"> ⬇️ </h3>

```java
public class Sensor {
  private Map<Sensor> sensors = new HashMap<Sensor>();

  public Sensor getById(String sensorId) {
    return sensors.get(sensorId);
  }
}
```

- 캡슐화를 통해서 Map을 감춘다.
- 원하는 기능만 제공하도록 한다.
- 적절한 경계로 우리 코드를 보호할 수 있다.

## 03. 경계 짓기 (2) 외부 코드와 호환하기

- 외부 코드를 호출할 때 우리가 원하는 방식으로 사용하고 싶다면 adapter 패턴을 사용한다.

## 04. 외부 라이브러리 테스트하기 - Learning Test

### Learning Test를 작성해 라이브러리를 테스트 한다

- 외부 코드를 배우고, 안정성도 미리 검증 할 수 있다.
  - 학습 테스트는 이해도를 높인다.
  - 외부 코드의 버전이 변경됐을 때, 우리 코드와 호환되는 지 확인할 수 있다.
