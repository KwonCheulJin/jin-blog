---
emoji: 😱
title: PRG (Post/Redirect/Get)
date: '2021-10-05 22:44:00'
author: 촬스
tags: 블로그 Java SpringMVC TIL
categories: SpringMVC
---

오늘은 인프런의 김영한님 [스프링 MVC 1편 - 백엔드 웹 개발 핵심 기술](https://www.inflearn.com/course/%EC%8A%A4%ED%94%84%EB%A7%81-mvc-1/dashboard)을 마무리하였다.

매일 1~2시간씩 끊어가면서 강의를 듣다보니 배울 때만 기억나고 다시 들을때는 전에 배웠던 내용이 잘 기억나지는 않는다.

시간내서 전체를 다시 한번 들어봐야겠다.

강의 내용 중 마지막 내용인 PRG(Post/Redirect/Get)에 대해서 글을 남긴다.

## 1. PRG(Post/Redirect/Get) 적용 전

- 상품을 등록하고 나서 아래의 경로로 이동하게 되었을 때의 문제점은 새로고침을 하게 되면 상품이 지속적으로 등록이 된다는 것이다.

`BasicItemController.java`

```java
@PostMapping("/add")
public String addItemV4(Item item) {
    itemRepository.save(item);
    return "basic/item";
}
```

<div align = "center">

![form-post-redirectX.gif](form-post-redirectX.gif)

</div>

- gif로 변환을 하다보니 해상도가 좋지는 않은데 상품ID가 새로고침 할 때 마다 올라가는 것을 확인 할 수 있다.
- 이렇게 마무리가 되면 사용자가 실수로 새로고침을 눌렀을 경우에 똑같은 상품이 계속 저장되게 된다.
- 그래서 이렇게 저장되지 않도록 해주는 방법이 PRG(Post/Redirect/Get)이다.

## 2. PRG(Post/Redirect/Get) 적용 후

```java
@PostMapping("/add")
public String addItemV5(Item item) {
    itemRepository.save(item);
    return "redirect:/basic/items/" + item.getId();
}

@PostMapping("/add")
public String addItemV6(Item item, RedirectAttributes redirectAttributes) {
    Item savedItem = itemRepository.save(item);
    redirectAttributes.addAttribute("itemId", savedItem.getId());
    redirectAttributes.addAttribute("status", true);
    return "redirect:/basic/items/{itemId}";
}
```

- 두 가지 방법으로 적용을 시켜보았는데 첫번째 방법으로는 사용하지 않는 것이 좋다.
- `return`할 때 연산자로 값을 넣어줬을 경우에는 숫자의 경우는 상관없지만 문자가 들어가는 경우에는 인코딩 문제가 발생할 수 있다.
- 그래서 두번째 방법으로 `RedirectAttribute`를 사용하게되면 인코딩도 해결하고 추가 `Parameter`까지 전송이 가능하게 된다.

<div align = "center">

![form-get-redirect.gif](form-get-redirect.gif)

</div>

오늘은 간단하게 PRG에 대해서 기록해보았다.
이제 [스프링 MVC 2편 - 백엔드 웹 개발 활용 기술](https://www.inflearn.com/course/%EC%8A%A4%ED%94%84%EB%A7%81-mvc-2/dashboard)도 빠른시일내에 완강해야겠다.

전에 기록하지 못했던 부분들도 다시 복습할 때 필요한 부분은 기록하도록 해야겠다.

## Reference

- [스프링 MVC 1편 - 백엔드 웹 개발 핵심 기술](https://www.inflearn.com/course/%EC%8A%A4%ED%94%84%EB%A7%81-mvc-1/dashboard)

## 전체 소스코드

- [https://github.com/KwonCheulJin/springMVC-web-page](https://github.com/KwonCheulJin/springMVC-web-page)

```toc

```
