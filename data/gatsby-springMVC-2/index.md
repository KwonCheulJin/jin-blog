---
emoji: 😓
title: Spring Boot + Mybatis + MariaDB 연결하기
date: '2021-10-06 21:33:00'
author: 촬스
tags: 블로그 Java SpringMVC TIL
categories: SpringMVC
---

오늘은 회사에서 VCMS 프로토타입 개발 진행을 하게되어서 처음으로 AWS RDS MariaDB에 연동하는 작업을 진행하였다. DB 쿼리 작업을 수월하게 도와주는 Mybatis도 이용하였다.

설정하는 과정 중에 겪었던 문제점을 잊지 않기 위해서 기록한다.

## 1. DB 연동하기

- `application.properties`에서 DB 설정 및 Mybatis 설정을 해준다.

```yml
#mariadb 설정
spring.datasource.driver-class-name=org.mariadb.jdbc.Driver
spring.datasource.url=jdbc:mariadb://aws rds 주소:3306/db이름
spring.datasource.username=username
spring.datasource.password=password

# mapper.xml 위치 지정
mybatis.mapper-locations:classpath:mappers/*.xml
# model 프로퍼티 camel case 설정
mybatis.configuration.map-underscore-to-camel-case=true
# 패키지 명을 생략할 수 있도록 alias 설정
mybatis.type-aliases-package.com.prototype.domain.entity
# mapper 로그레벨 설정
logging.level.com.prototype.domain.repository=TRACE
```

- 내가 사용에 필요한 부분을 설정해주었다.

## 2. DB 연동 TEST

```java
public class MariadbConnectionTest {

 // MySQL Connector 의 클래스. DB 연결 드라이버 정의
    private static final String DRIVER = "org.mariadb.jdbc.Driver";
    // DB 경로
    private static final String URL = "jdbc:mariadb://aws rds 주소:3306/db이름";
    private static final String USER = "username";
    private static final String PASSWORD = "password";

    @Test
    public void testConnection() throws Exception {
        // DBMS에게 DB 연결 드라이버의 위치를 알려주기 위한 메소드
        Class.forName(DRIVER);
        try {
            Connection connection = DriverManager.getConnection(URL, USER, PASSWORD);
            System.out.println(connection);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```

- test를 통해서 db와 연결되는지 확인을 한다.

## 3. Mybatis 사용을 위한 Entity / Repository class 추가

`main > java > com > prototype > domain > entity > Member`

### Member

```java
@Data
public class Member {

    private int no;
    private String grade;
    private String name;
    private String id;
    private String department;
    private String email;
    private String phoneNumber;
    private Date dateOfSignUp;

}
```

- 클래스 레벨에서 `@Data` 어노테이션을 붙여주면, 모든 필드를 대상으로 접근자와 설정자가 자동으로 생성되고, `final` 또는 `@NonNull` 필드 값을 파라미터로 받는 생성자가 만들어지며, `toStirng`, `equals`, `hashCode` 메소드가 자동으로 만들어진다.

`main > java > com > prototype > domain > repository > MemberRepository`

### MemberRepository

```java
@Mapper
public interface MemberRepository {
    List<Member> allMember();
}
```

- `@Mapper`는 MyBatis의 mappers를 위한 marker interface로 사용

## 4. Mybatis `mapper.xml` 설정

`main > resources > mappers > mapper.xml`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd" >

<mapper namespace="com.prototype.domain.repository.MemberRepository">
    <select id="allMember" resultType="Member">
        SELECT * FROM member
    </select>
</mapper>
```

> `네임스페이스(Namespaces)`가 이전버전에서는 사실 선택사항이었다. 하지만 이제는 패키지경로를 포함한 전체 이름을 가진 구문을 구분하기 위해 필수로 사용해야 한다.
> `네임스페이스`는 인터페이스 바인딩을 가능하게 한다. 네임스페이스을 사용하고 자바 패키지의 네임스페이스을 두면 코드가 깔끔해지고 마이바티스의 사용성이 크게 향상될 것이다.

- `mybatis.type-aliases-package.com.prototype.domain.entity`
- 패키지 명을 생략할 수 있도록 alias 설정하여서 `resultType`에 `Member` 짧게 넣을 수 있다.

## 5. DB에서 가져온 데이터를 JSON형태로 보여주기

`main > java > com > prototype > domain > controller > MemberController`

### MemberController

```java
@Slf4j
@RestController
@RequestMapping("/api")
public class MemeberController {

    @Autowired
    MemberRepository memberRepository;

    @GetMapping("/member")
    public List<Member> allMember() {
        log.info("allmember = {}", memberRepository.allMember());

        return memberRepository.allMember();
    }
}
```

- `@Slf4j`는 log를 출력하기 위한 어노테이션
- `@RestController`는 Spring MVC Controlle에 `@ResponseBody`가 추가된 것이다. `RestController`의 주용도는 `Json` 형태로 객체 데이터를 반환하는 것이다.
- `@RequesMapping`은 요청에 대해 어떤 Controller, 어떤 메소드가 처리할지를 맵핑하기 위한 어노테이션(class위에 선언시 공통 url을 선언할 수 있다)
- `@Autowired`은 필요한 의존 객체의 `타입`에 해당하는 빈을 찾아 자동 주입한다.
- `@GetMapping`은 `@GetMapping : @RequestMapping(method = RequestMethod.GET)` 의 축약형

오늘 경험한 것을 다시 한번 정리해보니깐 조금 정리가 되는 듯하다. 회사에서 연동시에 계속 에러가 발생해서 한참을 검색해도 해결이 되지않았는데 가장 큰 실수를 한 부분이 db 설정 부분에서 밑줄친 부분을 누락해서 생기는 에러였다.

<p align ="center"> 
spring.datasource.url=jdbc:mariadb://aws rds 주소<b><u>:3306/db이름</u></b>
</p>

다시는 까먹지 않을 정도의 임팩트였다.

조금씩 느리더라도 오늘같이 배워가면서 지속적으로 성장 할 수 있게 노력하자!

```toc

```
