import AuthForm from '@/components/auth/AuthForm';
import Layout from '@/components/common/Layout';
import TransitionEffect from '@/components/common/TransitionEffect';

export default function Home() {
  return (
    <>
      <TransitionEffect />
      <Layout className="pt-0 sm:pt-0 md:pt-4 lg:pt-8">
        <AuthForm />
      </Layout>
    </>
  );
}
