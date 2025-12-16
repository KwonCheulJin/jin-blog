import { auth } from '@/service/auth';
import { NextResponse } from 'next/server';

export default auth(req => {
  const { nextUrl } = req;
  const token = req.auth;

  // GET 요청은 인증 없이 허용 (블로그 포스트 읽기)
  if (req.method === 'GET' && nextUrl.pathname.startsWith('/api/post')) {
    return NextResponse.next();
  }

  // 나머지 요청은 HOST 역할 필요
  if (token?.user?.type !== 'HOST') {
    return NextResponse.redirect(new URL('/signin', nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/write', '/api/post/:path*', '/api/upload/:path*'],
};
