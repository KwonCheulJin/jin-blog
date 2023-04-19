---
title: 제로베이스-한달한권 클린코드 DAY4
date: '2022-01-08'
category: CleanCode
description: Chapter.5
path: CleanCode-4
image: CleanCode
featured: false
---

# Chapter 5 - 형식 맞추기

## 코드의 가독성에 필수적인 포멧팅

## 01. 포맷팅이 중요한 이유

```java
public void horriblyFormattedMethod() {
  System.out.println("First line");
      System.out.println("Second line");
    System.out.println("Third line");
  for (int i = 0; i <3; i++)
  System.out.println("number " + i);
}
```

- 위와 같이 형식이 맞춰져 있지 않은 코드를 보면 코드를 이해하기 난해한 경우가 생긴다.
- 위의 예제는 단순하지만 엄청 긴 문장의 매서드라면 어떨까?

```java
public void horriblyFormattedMethod() {
  System.out.println("First line");
  System.out.println("Second line");
  System.out.println("Third line");
  for (int i = 0; i <3; i++) {
    System.out.println("number " + i);
  }
}
```

### 가독성을 좋게 하기 위해서 포맷팅이 중요하다

- 코드를 수월하게 읽어나갈 수 있다.
- 아마추어처럼 보이지 않는다.
- 포맷팅으로 인해 코드를 잘못해석해 버그를 발생할 위험을 줄인다.

## 02. 클린코드 포맷팅

### 적절한 길이 유지하는게 좋다

#### 200라인에서 500라인 이하로 유지하는게 좋다

- 코드 길이를 200줄 정도로 제한하는 것은 반드시 지킬 엄격한 규칙은 아니지만, 일반적으로 큰 파일 보다는 작은 파일이 이해하기 쉽다.
  - 현업에서는 대부분의 코드들도 200라인 정도를 유지한다고 한다.
- 코드 길이가 200라인을 넘어간다면, 클래스가 여러 개의 일을 하고 있을 수 있다.
  - SRP(Single Responbility Principle - 단일 책임 원칙)위배 했을 가능성이 크다.

### 밀접한 개념은 서로 가까이 둔다

```java
package fitnesse.wikitext.widgets;

import java.util.regex.*;

public class BoldWidget extends ParentWidget {
  public static final String REGEXP = "'''.+?'''";
  private static final Pattern pattern = Pattern.compile("'''(.+?)'''", Pattern.MULTILINE + Pattern.DOTALL);

  public BoldWidget(ParentWidget parent, String text) throws Exception {
    super(parent);
    Matcher match = pattern.matcher(text);
    match.find();
    addChildWidgets(match.group(1));
  }

  public String render() throws Exception {
    StringBuffer html = new StringBuffer("<b>");
    html.append(childHtml()).append("</b>");
    return html.toString();
  }
}
```

- 행 묶음은 완결된 생각 하나를 표현하기 때문에 개념은 빈 행으로 분리한다.
- 변수는 사용되는 위치에서 최대한 가까이 선언한다.

## 03. Java Class Declarations

![javaclassdeclarations.png](/images/CleanCode-4/javaclassdeclarations.png)

### Reference From [https://www.oracle.com/java/technologies/javase/codeconventions-fileorganization.html#1852](https://www.oracle.com/java/technologies/javase/codeconventions-fileorganization.html#1852)

### Class 내부 코드 순서

1. static 변수
   - public -> prorected -> package level -> private 순서
2. instance 변수
   - public -> prorected -> package level -> private 순서
3. 생성자
4. 메서드
   - public 메서드에서 호출되는 private 메서드는 그 아래에 둔다. 가독성 위주로 그룹핑

```java
/*
 * Copyright 2000-2021 JetBrains s.r.o.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

 package java.blah;

 import java.blah.blahby.BlahBlah;

 /**
 *
 * Class description goes here.
 *
 * @author chars
 * @version 1.0.0
 *
**/
public class Blah extends SomeClass {

  public static int classVar1;

  private static Object classVar2;

  public Object instanceVar1;

  protected int instanceVar2;

  private Object[] instanceVar3;

  public Blah() {
    // ...implementation goes here...
  }

  public void doSomething() {
    // ...implementation goes here...
  }

  public void doSomethingElse(Object someParam) {
    // ...implementation goes here...
  }
}
```

## 04. Team Coding Convention

### 팀의 코딩 스타일에 관한 약속

### 개발 언어의 컨벤션이 우선이지만, 애매한 부분은 팀 컨벤션을 따른다

`MySQL Convention`

- 컬럼명은 snake_case로 네이밍한다.

`Team Convention`

- enum 타입으로 사용하는 varchar 타입의 경우 컬럼명은 \_type으로 끝나도록 네이밍 한다.

### 참고할 만한 컨벤션

<h3 style="text-align: center;"> Google java Style Guide </h3>
<h3 style="text-align: center;"><a href="https://google.github.io/styleguide/javaguide.html" > https://google.github.io/styleguide/javaguide.html </a></h3>
<h3 style="text-align: center;"> Naver Hackday Java Convention </h3>
<h3 style="text-align: center;"><a href="https://naver.github.io/hackday-conventions-java/" > https://naver.github.io/hackday-conventions-java/ </a></h3>
