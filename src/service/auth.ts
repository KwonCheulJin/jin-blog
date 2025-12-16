import { SupabaseAdapter } from '@auth/supabase-adapter';
import { SignJWT } from 'jose';
import NextAuth from 'next-auth';
import type { Adapter } from 'next-auth/adapters';
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? '',
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),
  ],
  adapter: SupabaseAdapter({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
    secret: process.env.SUPABASE_SERVICE_ROLE_KEY ?? '',
  }) as Adapter,
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60, // 24시간
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.type;
      }
      return token;
    },
    async session({ session, token }) {
      const signingSecret = process.env.SUPABASE_JWT_SECRET;
      if (signingSecret && token.sub) {
        const secret = new TextEncoder().encode(signingSecret);
        const supabaseToken = await new SignJWT({
          aud: 'authenticated',
          sub: token.sub,
          email: token.email,
          role: 'authenticated', // PostgreSQL 표준 role
          user_role: token.role, // 커스텀 클레임으로 실제 사용자 타입
          user_type: token.role, // 백업용 커스텀 클레임
        })
          .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
          .setExpirationTime(new Date(session.expires))
          .sign(secret);
        session.supabaseAccessToken = supabaseToken;
      }
      session.user.type = token.role as 'HOST' | 'VISITORS';
      session.user.id = token.sub as string;
      return session;
    },
    async redirect({ url, baseUrl }) {
      const callbackUrl = url.split('?callbackUrl=')[1];
      if (callbackUrl) {
        return `${baseUrl}${callbackUrl.replaceAll('%2F', '/')}`;
      } else if (url.startsWith('/')) {
        return `${baseUrl}${url}`;
      } else if (new URL(url).origin === baseUrl) {
        return url;
      }
      return baseUrl;
    },
  },
  pages: {
    signIn: '/signin',
  },
});
