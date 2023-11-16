---
title: 글 작성이 불편한 블로그를 개선 해보자 Part.1
date: '2023-11-16'
category: 블로그, SSG, markdown blog, migration, Next.js
description: 스스로에게 주는 첼린지
path: my-blog-migration-plan
image: my-blog-migration-plan
featured: true
---

## 블로그 개선 작업을 계획한 이유

1. 블로그 포스트를 md형식으로 프로젝트 패키지 내에서 작성하고 저장하고 있다.
2. 포스트를 작성하면 패키지에 저장되는 파일 및 이미지가 많이 쌓이게 된다.
3. 현재 블로그에 포스팅 하기 위해서는 md파일을 작성하고 github 레포지토리에 merge를 해줘야 반영이 된다.
4. 초창기에 이정도만으로도 만족이 되었으나 반복적인 글 생산에 부적합하다고 판단, 이미지도 지속적으로 생산해야 한다는 불편함도 발생했다.
5. 현재 블로그 레이아웃 및 가독성 측면에서도 좋은 구조가 아니라고 생각했다.

위와 같은 이유로 블로그 개선 작업을 계획하게 되었다.

## 추가될 기능들

1. mdxEditor 컴포넌트 추가
2. 포스트 레이아웃 및 스타일 변경
3. 로그인 / 로그아웃 기능 추가 및 권한 부여
4. mdxEditor를 통해서 글 생성 및 supabase에 저장
5. supabase에서 데이터를 가져와서 화면에 보여주는 기능
6. 태그 추가
7. 페이지네이션 추가
8. 검색 기능 추가
9. 기존의 md파일 및 이미지를 supabase storage 및 database로 이전 작업
10. 테스트 코드 추가

등등 일단 생각나는 기능을 추가하도록 할 것이다.

하루에 2~3시간 정도씩 할애해서 올해가 가기전에는 완료 하는게 목표이다.

## 현재까지 진행상황

`추가된 에디터`
![editor-component.webp](/images/my-blog-migration-plan/editor-component.webp)

`새로운 포스트 화면`
![new-post-style.webp](/images/my-blog-migration-plan/new-post-style.webp)

일단은 불편하더라도 진행상황을 dev 브랜치와 새롭게 작업하고 있는 브랜치를 왔다갔다 하면서 진행하도록 해야겠다.

## 참고

- [tailwind-nextjs-starter-blog](https://github.com/timlrx/tailwind-nextjs-starter-blog)