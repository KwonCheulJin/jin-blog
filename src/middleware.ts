import { withAuth } from 'next-auth/middleware';

export default withAuth({
  pages: {
    signIn: '/signin',
  },
  callbacks: {
    authorized: ({ token }) => {
      return token?.role === 'HOST';
    },
  },
});

export const config = { matcher: ['/write'] };
