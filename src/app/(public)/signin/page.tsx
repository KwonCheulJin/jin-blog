import SignIn from '@/components/auth/SignIn';
import Layout from '@/components/common/Layout';
import TransitionEffect from '@/components/common/TransitionEffect';
import { authOptions } from '@/service/auth';
import { getServerSession } from 'next-auth';
import { getProviders } from 'next-auth/react';
import { redirect } from 'next/navigation';

export default async function SignInPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    return redirect('/');
  }

  const providers = (await getProviders()) ?? {};

  return (
    <>
      <TransitionEffect />
      <Layout className="flex h-[calc(100vh-280px)] items-center justify-center pt-0 sm:pt-0 md:pt-4 lg:pt-8">
        <div className="h-80 w-[420px] md:w-2/3 lg:w-96 xs:w-2/3">
          <SignIn providers={providers} />
        </div>
      </Layout>
    </>
  );
}
