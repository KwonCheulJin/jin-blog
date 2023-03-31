---
emoji: 🦾
title: Spring MVC를 이용한 간단한 파일업로드
date: '2021-09-28 22:13:00'
author: 촬스
tags: 블로그 SpringMVC TIL
categories: SpringMVC
---

VCMS(Video Content Management System) 프로젝트를 진행하게 되어서
이사님께서 Spring version 4로 만들어 주신 기본폴더를 이용해서 간단하게 추가해 진행을 해보았다.

## 1. 파일업로드를 위한 `pom.xml` 설정

- fileupload에 필요한 pom.xml에 dependency를 추가하는 작업을 하였습니다.

`pom.xml`

```xml
<!-- 파일 업로드 -->
<dependency>
  <groupId>commons-fileupload</groupId>
  <artifactId>commons-fileupload</artifactId>
  <version>1.3.2</version>
</dependency>
```

## 2. `servlet-context.xml`에 `MultipartResolver` 등록

- Multipart 지원 기능을 이용하려면 먼저 MultipartResolver를 스프링 설정 파일에 등록해 주어야 합니다
- MultipartResolver는 Multipart 형식으로 데이터가 전송된 경우, 해당 데이터를 스프링 MVC에서 사용할 수 있도록 변환해줍니다.

`servlet-context.xml`

```xml
<bean id="multipartResolver" class="org.springframework.web.multipart.support.StandardServletMultipartResolver"></bean>
```

## 3. `web.xml`에 `multipart-config` 적용

```xml
<servlet>
  <servlet-name>web</servlet-name>
  <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
  <init-param>
    <param-name>contextConfigLocation</param-name>
    <param-value>
      classpath:config/spring/servlet-context.xml
    </param-value>
  </init-param>
  <load-on-startup>1</load-on-startup>
  <multipart-config>
    <location>/Users/chars/Documents/TestDir</location><!-- 업로드 파일 저장되는 기본 경로 -->
    <max-file-size>20971520</max-file-size> <!-- 한파일: 1mb * 20 -->
    <max-request-size>41943040</max-request-size> <!-- 한번에 여러개올리는데 전체가 40mb -->
    <file-size-threshold>20971520</file-size-threshold> <!-- 넘으면 temp에 넣고 업로드에 들어가지 않는다 : 20mb -->
  </multipart-config>
</servlet>
```

| 이름              | 타입   | 필수     | 설명                                                                                                                                                                                |
| ----------------- | ------ | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| fileSizeThreshold | int    | Optional | 업로드 파일을 임시로 저장할 때 크기 임계값을 지정합니다. 업로드 파일의 크기가 이 임계값보다 크면 디스크에 저장됩니다. 그렇지 않으면 파일이 메모리에 저장됩니다. 크기(바이트)입니다. |
| location          | String | Optional | 업로드 파일이 저장되는 디렉토리 지정                                                                                                                                                |
| maxFileSize       | long   | Optional | 업로드 파일의 최대 크기를 지정합니다. 크기(바이트)입니다.                                                                                                                           |
| maxRequestSize    | long   | Optional | 요청의 최대 크기를 지정합니다(업로드 파일 및 기타 양식 데이터 모두 포함). 크기(바이트)입니다.                                                                                       |

위와 같이 설정을 해주면 됩니다.

이렇게 설정하기 전에 여러 블로그를 참조해서 진행했었는데 저의 스프링 버전에 맞게 설정하는 것을 찾는 것도 쉽지 않다는 것을 느꼈습니다.

## 4. `FileUploadController` 생성

`common.properties`에 file경로를 지정해 주었습니다.

```
## FilePath
file.path=/Users/chars/Documents/TestDir
```

`FileUploadController`

```java
package com.kyobobook.controller;

import java.io.File;
import java.io.IOException;
import java.util.Locale;
import java.util.UUID;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@Controller
@RequestMapping("/sample")
@PropertySource("classpath:config/properties/common.properties")
public class FileUploadController {

    private Logger logger = LoggerFactory.getLogger(FileUploadController.class);

    // 파일 저장할 위치
    @Value("${file.path}")
    private String file_Path;

    // 파일 폼 매핑
    @RequestMapping(value = "/fileForm", method = {RequestMethod.GET, RequestMethod.POST})
    public String fileForm(Locale locale, Model model) {
        logger.info("fileForm file.path={}", file_Path);
        return "sample/upload";
    }

    // 파일 등록 매핑
    @RequestMapping(value = "/fileUpload", method = RequestMethod.POST)
    public String fileUpload(@RequestParam MultipartFile file,
            RedirectAttributes redirectAttributes) throws IOException {
        logger.info("fileUpload={}", file);
        String uuid = UUID.randomUUID().toString();
        // file upload to system
        File converFile = new File(file_Path, uuid + file.getOriginalFilename());
        logger.info("fileUpload converFile={}", converFile);
        file.transferTo(converFile);

        String msg = file.getOriginalFilename() + " is saved in server db";
        redirectAttributes.addFlashAttribute("msg", msg);
        logger.info("fileUpload={}", msg);
        return "redirect:fileForm";
    }
}

```

컨트롤러를 만들고 나서 김영한님의 스프링MVC 강의를 듣고있어서 `@RequestMapping`을 `@GetMapping`과 `@PostMapping`으로 명시적으로 지정해 주려고 하였으나 적용이 되지를 않아서 확인해 보니 `@GetMapping`과 `@PostMapping` 어노테이션은 Spring 5부터 가능하다는 것을 알게 되었습니다. 그래서 `@RequestMapping`안에 `method`로 명시하였고 `fileForm`은 `GET, POST`가 가능하게 해주었습니다.

`Hosting.kr 설정 페이지`

## 5. `upload.jsp` 생성

```html
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Insert title here</title>
  </head>
  <body>
    <form action="fileUpload" method="post" enctype="multipart/form-data">
      <input type="file" name="file" multiple /><br />
      <br />
      <button>Submit</button>
    </form>
  </body>
</html>
```

컨트롤러의 경로에 맞춰서 설정해 주면 끝이납니다.

![file-upload.gif](file-upload.gif)

비록 컨트롤러 코드는 여러 블로그를 검색해서 가져온 코드인데 이곳저곳을 들르다 보니 출처를 가져오는 것을 깜빡하였네요.
다음에는 출처도 잘 가져와서 링크를 걸어 두어야겠네요.
이렇게 간단하게 파일업로드 하는 것을 하는데도 설정하는 곳에서 한참을 해매서 3-4시간 정도 걸린 것 같네요.
이번에는 폴더에 저장하는 것으로 하였지만 다음번에는 스프링 부트 및 DB에 저장하는 것까지 해서 구현해서 글을 남겨보도록 해야겠네요.

```toc

```
