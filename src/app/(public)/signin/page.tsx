import SignIn from '@/components/auth/sign-in';
import Layout from '@/components/common/layout';
import TransitionEffect from '@/components/common/transition-effect';
import { auth } from '@/service/auth';
import { redirect } from 'next/navigation';

// Next-Auth v5에서는 서버에서 직접 providers 정의
const providers = {
  github: {
    id: 'github',
    name: 'GitHub',
    type: 'oauth',
    signinUrl: '/api/auth/signin/github',
    callbackUrl: '/api/auth/callback/github',
  },
  google: {
    id: 'google',
    name: 'Google',
    type: 'oauth',
    signinUrl: '/api/auth/signin/google',
    callbackUrl: '/api/auth/callback/google',
  },
};

export default async function SignInPage() {
  const session = await auth();

  if (session) {
    return redirect('/');
  }

  return (
    <>
      <TransitionEffect />
      <Layout className="flex h-[calc(100vh-280px)] items-center justify-center pt-0 md:pt-4 lg:pt-8">
        <div className="h-80 w-[420px] md:w-2/3 lg:w-96 xs:w-2/3">
          <SignIn providers={providers} />
        </div>
      </Layout>
    </>
  );
}
