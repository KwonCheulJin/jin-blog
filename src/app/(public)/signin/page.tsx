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
      <Layout className="flex justify-center pt-0 sm:pt-0 md:pt-4 lg:pt-8">
        <div className="mb-16 h-80 md:w-2/3 lg:w-96 xl:w-[420px] xs:w-2/3">
          <SignIn providers={providers} />
        </div>
      </Layout>
    </>
  );
}
