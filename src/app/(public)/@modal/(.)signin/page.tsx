import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import Modal from '@/components/auth/Modal';
import SignIn from '@/components/auth/SignIn';
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
    <Modal>
      <SignIn providers={providers} />
    </Modal>
  );
}
