import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import SignIn from '@/components/auth/SignIn';
import Layout from '@/components/common/Layout';
import TransitionEffect from '@/components/common/TransitionEffect';
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
      <Layout className="pt-0 sm:pt-0 md:pt-4 lg:pt-8">
        <SignIn providers={providers} />
      </Layout>
    </>
  );
}
