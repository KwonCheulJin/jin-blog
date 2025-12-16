import Modal from '@/components/auth/modal';
import SignIn from '@/components/auth/sign-in';
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
    <Modal>
      <SignIn providers={providers} />
    </Modal>
  );
}
