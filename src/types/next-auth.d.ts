import 'next-auth';

declare module 'next-auth' {
  interface Session {
    supabaseAccessToken?: string;
    user: {
      type: 'HOST' | 'VISITORS';
      id: string;
      name: string;
      email: string;
      image: string;
    };
  }
  interface User {
    type: 'HOST' | 'VISITORS';
  }
}

declare module '@auth/core/jwt' {
  interface JWT {
    role: 'HOST' | 'VISITORS';
  }
}
