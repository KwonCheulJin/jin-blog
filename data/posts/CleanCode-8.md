---
title: 제로베이스-한달한권 클린코드 DAY8
date: '2022-01-15'
category: CleanCode
description: Chapter.9
path: CleanCode-8
image: CleanCode
featured: false
---

# Chapter 9 - 단위 테스트

## 01. 테스트 코드의 중요성

1. 테스트 코드는 실수를 바로잡아준다.
2. 테스트 코드는 반드시 존재해야하며, 실제 코드 못지않게 중요하다.
3. 테스트 케이스는 변경이 쉽도록 한다. 코드에 유연성, 유지보수성, 재사용성을 제공하는 버팀목이 바로 단위테스트다. 테스트 케이스가 있으면 변경이 두렵지않다. 테스트 케이스가 없다면 모든 변경이 잠정적인 버그다. 테스트 커버리지가 높을수록 버드게 대한 콩보가 줄어든다.
4. 지저분한 테스트 코드는 테스트를 안하니만 못하다.

### &lt;Effective Unit Test&gt; 테스트의 중요성

> 테스트는 실사용에 적합한 설계를 끌어내준다. <br>
> 테스트를 작성해서 얻게 되는 가장 큰 수확은 테스트 자체가 아니다. 작성 과정에서 얻는 깨달음이다.

### 테스트는 자동화되어야 한다

## 02. 테스트의 종류

### Test Pyramid

- Unit Test: 프로그램 내부의 개별 컴포넌트의 동작을 테스트한다. 배포하기 전에 자동으로 실행되도록 많이 사용한다.

- Integration Test: 프로그램 내부의 개별 컴포넌트들을 합쳐서 동작을 테스트한다. Unit Test는 각 컴포넌트를 고립시켜 테스트 하기 때문에 컴포넌트의 interaction을 확인하는 Integration Test가 필요하다.

- E2E Test: End to End Test. 실제 유저의 시나리오대로 네트워크를 통해 서버의 Endpoint를 호출해 테스트한다.

## 03. Unit Test 작성

### 테스트 라이브러리를 사용하자

- [JUnit](https://junit.org/junit5/):forunittest
- [Mockito](https://site.mockito.org/):formockingdependencies
- [Wiremock](http://wiremock.org/):forstubbingoutexternalservices
- [Pact](https://docs.pact.io/):forwritingCDCtests
- [Selenium](https://www.selenium.dev/):forwritingUI-drivenend-to-endtests
- [REST-assured](https://github.com/rest-assured/rest-assured):forwritingRESTAPI-drivenend-to-endtests

### Test Double

- 테스트에서 원본 객체를 대신하는 객체

#### Stub

- 원래의 구현을 최대한 단순한 것으로 대체한다.

- 테스트를 위해 프로그래밍된 항목에만 응답한다.

#### Spy

- Stub의 역할을 하면서 호출에 대한 정보를 기록한다.

- 이메일 서비스에서 메시지가 몇 번 전송되었는지 확인할 때

#### Mock

- 행위를 검증하기 위해 가짜 객체를 만들어 테스트하는 방법

- 호출에 대한 동작을 프로그래밍할 수 있다.

- Stub은 상태를 검증하고 Mock은 행위를 검증한다.

### given-when-then 패턴을 사용하자

- given : 테스트에 대한 pre-condition

- when : 테스트하고 싶은 동작 호출

- then : 테스트 결과 확인

```java
public void testGetPageHierarchyAsXml() throws Exception {
  givenPages("PageOne", "PageOne.ChildOne", "PageTwo");

  whenRequestIsIssued("root", "type:pages");

  thenResponseShouldBeXml();
}

public void testGetPageHierarchyHasRightTags() throws Exception {
  givenPages("PageOne", "PageOne.ChildOne", "PageTwo");

  whenRequestIsIssued("root", "type:pages");

  thenResponseShouldContain(
    "<name>PageOne</name>", "<name>PageTwo</name>", "<name>ChildOne</name>"
  );
}
```

### Spring Boot Application Test 예제

Code from - [https://martinfowler.com/articles/practical-test-pyramid.html](https://martinfowler.com/articles/practical-test-pyramid.html)

#### ExampleController - main Code

```java
@RestController
public class ExampleController {

    private final PersonRepository personRepo;

    @Autowired
    public ExampleController(final PersonRepository personRepo) {
        this.personRepo = personRepo;
    }

    @GetMapping("/hello/{lastName}")
    public String hello(@PathVariable final String lastName) {
        Optional<Person> foundPerson = personRepo.findByLastName(lastName);

        return foundPerson
                .map(person -> String.format("Hello %s %s!",
                        person.getFirstName(),
                        person.getLastName()))
                .orElse(String.format("Who is this '%s' you're talking about?",
                        lastName));
    }
}
```

#### ExampleController - Unit Test

- PersonRepository Mock 사용
- given-when-then 구조
- repository에서 값을 읽어왔을 때와 읽어오지 못했을 때 2가지 경우를 테스트

```java
public class ExampleControllerTest {

    private ExampleController subject;

    @Mock
    private PersonRepository personRepo;

    @Before
    public void setUp() throws Exception {
        initMocks(this);
        subject = new ExampleController(personRepo);
    }

    @Test
    public void shouldReturnFullNameOfAPerson() throws Exception {
        Person peter = new Person("Peter", "Pan");
        given(personRepo.findByLastName("Pan"))
            .willReturn(Optional.of(peter));

        String greeting = subject.hello("Pan");

        assertThat(greeting, is("Hello Peter Pan!"));
    }

    @Test
    public void shouldTellIfPersonIsUnknown() throws Exception {
        given(personRepo.findByLastName(anyString()))
            .willReturn(Optional.empty());

        String greeting = subject.hello("Pan");

        assertThat(greeting, is("Who is this 'Pan' you're talking about?"));
    }
}
```

#### Integration Test(Database)

- PersonRepository이 데이터 베이스와 연결될 수 있는지 확인
- in-memory DB인 h2로 테스트
- findByLastName가 정상적으로 동작하는지 확인

```java
@RunWith(SpringRunner.class)
@DataJpaTest
public class PersonRepositoryIntegrationTest {
    @Autowired
    private PersonRepository subject;

    @After
    public void tearDown() throws Exception {
        subject.deleteAll();
    }

    @Test
    public void shouldSaveAndFetchPerson() throws Exception {
        Person peter = new Person("Peter", "Pan");
        subject.save(peter);

        Optional<Person> maybePeter = subject.findByLastName("Pan");

        assertThat(maybePeter, is(Optional.of(peter)));
    }
}
```

#### Integration Test(Service)

- WireMock을 이용해 mock 서버를 띄운다.
- client가 실제 서버가 아닌 mock 서버로 요청하게 해서 client의 동작을 테스트한다.

```java
@RunWith(SpringRunner.class)
@SpringBootTest
public class WeatherClientIntegrationTest {

    @Autowired
    private WeatherClient subject;

    @Rule
    public WireMockRule wireMockRule = new WireMockRule(8089);

    @Test
    public void shouldCallWeatherService() throws Exception {
        //given
        wireMockRule.stubFor(get(urlPathEqualTo("/some-test-api-key/53.5511,9.9937"))
                .willReturn(aResponse()
                        .withBody(FileLoader.read("classpath:weatherApiResponse.json"))
                        .withHeader(CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                        .withStatus(200)));
        //when
        Optional<WeatherResponse> weatherResponse = subject.fetchWeather();
        //then
        Optional<WeatherResponse> expectedResponse = Optional.of(new WeatherResponse("Rain"));
        assertThat(weatherResponse, is(expectedResponse));
    }
}
```

## 04. FIRST 원칙

#### F(Fast): 빠르게

- 테스트는 빨리 돌아야 한다. 자주 돌려야 하기 때문이다.

#### I(Independent): 독립적으로

- 각 테스트를 독립적으로 작성한다. 서로에게 의존하면 실패한 원인을 찾기 어려워진다.(다른 테스트의 실패로 인한건지, 코드 오류인지)

#### R(Repeatable): 반복가능하게

- 테스트는 어떤 환경에서도 반복가능해야 한다. 실제 환경, QA환경, 모든 환경에서 돌아가야 한다.

#### S(Self-Validating): 자가검증하는

- 테스트는 bool값으로 결과를 내야 한다.

#### T(Timely): 적시에

- 테스트 하려는 실제 코드를 구현하기 직전에 구현한다.
