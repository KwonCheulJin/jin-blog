import type { Metadata } from 'next';
import ContactForm from '@/components/contact/ContactForm';
import AnimatedText from '@/components/common/AnimatedText';
import Layout from '@/components/common/Layout';

export const metadata: Metadata = {
  title: 'Contact',
  description: '저와 연락하고싶은 분은 이메일을 보내주세요!',
};

export default function ContactPage() {
  return (
    <section className="flex flex-col items-center w-full">
      <Layout className="pt-12 flex flex-col items-center justify-center">
        <AnimatedText text="Send me an email" className="pb-16 dark:text-light" />
        <ContactForm />
      </Layout>
    </section>
  );
}
