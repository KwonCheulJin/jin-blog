import { DefaultSession, DefaultUser } from 'next-auth';
declare module 'next-auth' {
  // Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
  interface Session {
    // A JWT which can be used as Authorization header with supabase-js for RLS.
    supabaseAccessToken?: string;
    user: {
      type: 'HOST' | 'VISITORS';
    } & DefaultSession['user'];
  }
  interface User extends DefaultUser {
    type: 'HOST' | 'VISITORS';
  }
}

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    role: 'HOST' | 'VISITORS';
  }
}
