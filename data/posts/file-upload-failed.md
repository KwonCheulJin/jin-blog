---
title: 브라우저 MIME 타입 이외의 파일확장자를 업로드 하는 방법
date: '2023-09-05'
category: 파일 업로드, 프론트엔드, MIME, application/octet-stream
description: application/octet-stream로 파일이 전송될때 해결하기!
path: file-upload-failed
image: file-upload-failed
featured: true
---

오늘 파일 업로드 api를 연동하던 중에 발생하 부분에 대해서 해결하면서 알게 된 부분을 정리해본다.

내가 업로드 해야하는 파일은 .map 확장자를 가진 파일로 내부는 xml로 작성되어있지만 프로그램 내부적으로 확장자를 지정해서 사용하고 있어서 해당 파일을 업로드를 해야했다.

인풋으로 전달받은 파일을 아래와 같은 방법으로 업로드를 진행하였다.

```js
const formData = new FormData();
formData.append('file', file);
axios.post('/api/upload',formData,
  {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  },
);
```
![upload-failed.webp](/images/file-upload-failed/upload-failed.webp)

업로드는 실패하였고 network 탭을 확인해보았을 때 해당 파일의 `Content-Type: application/octet-stream`으로 나오고 해당 파일의 데이터가 전송되지 않았다.

이 문제를 해결하기 위해서 구글링 및 GPT의 도움을 받아서 해당 문제의 원인을 찾을 수 있었다.

일단 내가 사용한 확장자는 브라우저 MIME 타입에 해당하지 않는 것이어서 브라우저가 알 수 없다. 그래서 `application/octet-stream`이 기본값으로 사용이 되었던 것이었다.

해당 타입을 브라우저가 결정하지 못하기 때문에 타입에 대해서 내가 직접 지정하는 방법을 사용하였다.

아래와 같이 코드를 수정해주고 다시 업로드를 실시해보았다.

```js
const formData = new FormData();
formData.append('file', new Blob([file], { type: 'text/xml' }), file.name);
axios.post('/api/upload',formData,
  {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  },
);
```
![upload-success.webp](/images/file-upload-failed/upload-success.webp)

정상적으로 잘 업로드 되었다.

xml뿐 아니라 작성된 문서에 맞게 타입을 지정해서 업로드를 진행 할 수 있다.

```js
const formData = new FormData();
formData.append('file', new Blob([file], { type: 'text/xml' }));
```

여기서 주의해야 할 부분은 만약 파일을 `blob`으로 전달하고 파일이름을 지정해주지 않았을 경우 인데 이렇게만 전달하게되면

![blob-upload.webp](/images/file-upload-failed/blob-upload.webp)

위의 내용 처럼 `filename="blob"`으로 전달되니 아래와 같이 확실하게 파일이름을 잘 전달 해줘야 한다.

```js
formData.append('file', new Blob([file], { type: 'text/xml' }), file.name);
```

[Media Types](https://www.iana.org/assignments/media-types/media-types.xhtml)은 여기에서 확인 할 수 있다.

확장자가 다른 파일을 업로드 해본 경험이 없어서 오늘과 같은 문제점이 발생했던 부분을 잘 기억하고 나중에 같은 상황이 있을 경우에는 잘 대처를 하도록 해야겠다.