import { SupabaseAdapter } from '@auth/supabase-adapter';
import jwt from 'jsonwebtoken';
import { NextAuthOptions } from 'next-auth';
import { Adapter } from 'next-auth/adapters';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? '',
    }),
    GoogleProvider({
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
        const payload = {
          aud: 'authenticated',
          exp: Math.floor(new Date(session.expires).getTime() / 1000),
          sub: token.sub,
          email: token.email,
          role: 'authenticated', // PostgreSQL 표준 role
          user_role: token.role, // 커스텀 클레임으로 실제 사용자 타입
          user_type: token.role, // 백업용 커스텀 클레임
        };
        session.supabaseAccessToken = jwt.sign(payload, signingSecret);
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
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  pages: {
    signIn: '/signin',
  },
};
