# 보안 설정 가이드

이 문서는 블로그 프로젝트의 보안을 강화하기 위한 Supabase RLS(행 수준 보안) 정책 및 Storage 정책 설정 가이드입니다.

## 1. Supabase RLS(행 수준 보안) 정책 설정

### 1.1 RLS 활성화

먼저 Supabase 대시보드의 SQL 편집기에서 각 테이블에 대해 RLS를 활성화해야 합니다:

```sql
-- posts 테이블 RLS 활성화
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

-- users 테이블 RLS 활성화
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
```

### 1.2 posts 테이블 정책

```sql
-- 모든 사용자가 게시물을 읽을 수 있도록 허용
CREATE POLICY "Enable read access for all users"
ON public.posts FOR SELECT
USING (true);

-- HOST 역할을 가진 사용자만 게시물을 생성, 수정, 삭제할 수 있도록 제한
CREATE POLICY "Enable write for host users"
ON public.posts FOR ALL
TO authenticated
USING ((auth.jwt() ->> 'user_role') = 'HOST')
WITH CHECK ((auth.jwt() ->> 'user_role') = 'HOST');
```

### 1.3 users 테이블 정책

```sql
-- 모든 사용자가 사용자 정보를 읽을 수 있도록 허용 (민감 정보 제외)
CREATE POLICY "Enable read access for all users"
ON public.users FOR SELECT
USING (true);

-- 사용자는 자신의 정보만 수정 가능
CREATE POLICY "Allow user to update their own info"
ON public.users FOR UPDATE
TO authenticated
USING (auth.uid() = id);
```

## 2. Supabase Storage 정책 설정

### 2.1 Storage RLS 활성화

```sql
-- Storage objects에 대한 RLS 활성화 (기본적으로 활성화되어 있음)
-- 확인용 쿼리
SELECT * FROM storage.buckets WHERE name = 'images';
```

### 2.2 이미지 버킷 정책

```sql
-- 모든 사용자가 이미지 읽기 가능
CREATE POLICY "Allow public read access to images"
ON storage.objects FOR SELECT
USING (bucket_id = 'images');

-- HOST 역할만 이미지 업로드 가능
CREATE POLICY "Allow authenticated uploads to images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'images' AND (auth.jwt() ->> 'user_role') = 'HOST');

-- HOST 역할만 이미지 업데이트 가능
CREATE POLICY "Allow authenticated updates to images"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'images' AND (auth.jwt() ->> 'user_role') = 'HOST')
WITH CHECK (bucket_id = 'images' AND (auth.jwt() ->> 'user_role') = 'HOST');

-- HOST 역할만 이미지 삭제 가능
CREATE POLICY "Allow authenticated deletes to images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'images' AND (auth.jwt() ->> 'user_role') = 'HOST');
```

## 3. 이미지 버킷 설정

Supabase 대시보드의 Storage 섹션에서 `images` 버킷 설정을 다음과 같이 구성하세요:

### 3.1 버킷 설정

- **Public**: ✓ (공개 읽기 허용)
- **File size limit**: 5MB
- **Allowed MIME types**:
  - `image/jpeg`
  - `image/jpg`
  - `image/png`
  - `image/webp`
  - `image/gif`

### 3.2 버킷 생성 SQL (필요한 경우)

```sql
-- images 버킷이 없는 경우 생성
INSERT INTO storage.buckets (id, name, public)
VALUES ('images', 'images', true);
```

## 4. 정책 검증

설정 완료 후 다음 쿼리로 정책이 올바르게 적용되었는지 확인하세요:

```sql
-- posts 테이블 정책 확인
SELECT * FROM pg_policies WHERE tablename = 'posts';

-- users 테이블 정책 확인
SELECT * FROM pg_policies WHERE tablename = 'users';

-- Storage 정책 확인
SELECT * FROM storage.policies;
```

## 5. 보안 테스트

### 5.1 JWT 토큰 확인

개발자 도구에서 네트워크 탭을 열고 API 요청 시 Authorization 헤더에 올바른 JWT 토큰이 포함되는지 확인하세요.

### 5.2 권한 확인

- 로그인하지 않은 상태에서 게시물 읽기가 가능한지 확인
- HOST 역할이 아닌 사용자로 게시물 작성/수정/삭제 시도 시 거부되는지 확인
- 파일 업로드 시 MIME 타입 및 크기 제한이 작동하는지 확인

## 6. 주의사항

1. **JWT 토큰 만료**: JWT 토큰은 만료 시간이 있으므로 정기적으로 갱신되어야 합니다.
2. **환경 변수 보안**: `SUPABASE_SERVICE_ROLE_KEY`와 `SUPABASE_JWT_SECRET`은 절대 클라이언트 측에 노출되지 않도록 주의하세요.
3. **정책 업데이트**: 새로운 기능 추가 시 해당하는 RLS 정책도 함께 업데이트해야 합니다.
4. **로그 모니터링**: Supabase 대시보드의 로그를 정기적으로 확인하여 비정상적인 접근 시도를 모니터링하세요.

## 7. 추가 보안 고려사항

### 7.1 브루트 포스 공격 방지

```sql
-- 연속 로그인 실패 모니터링을 위한 테이블 (선택사항)
CREATE TABLE IF NOT EXISTS public.login_attempts (
  id SERIAL PRIMARY KEY,
  email TEXT,
  ip_address INET,
  attempted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  success BOOLEAN DEFAULT FALSE
);
```

### 7.2 세션 타임아웃 설정

NextAuth.js 설정에서 세션 타임아웃을 적절히 설정하세요:

```javascript
// src/service/auth.ts에서
session: {
  strategy: 'jwt',
  maxAge: 24 * 60 * 60, // 24시간
},
```

이 가이드를 따라 설정하면 블로그의 보안 수준을 크게 향상시킬 수 있습니다.
