import { withAuth } from 'next-auth/middleware';
import { NextRequest } from 'next/server';

export default withAuth(
  function middleware(req: NextRequest) {
    // GET 요청은 공개 접근 허용 (블로그 포스트 읽기)
    if (req.method === 'GET' && req.nextUrl.pathname.startsWith('/api/post')) {
      return;
    }
  },
  {
    pages: {
      signIn: '/signin',
    },
    callbacks: {
      authorized: ({ token, req }) => {
        // GET 요청은 인증 없이 허용
        if (req.method === 'GET' && req.nextUrl.pathname.startsWith('/api/post')) {
          return true;
        }
        // 나머지 요청은 HOST 역할 필요
        return token?.role === 'HOST';
      },
    },
  },
);

export const config = {
  matcher: [
    '/write',
    '/api/post/:path*',
    '/api/upload/:path*',
  ],
};
