import ContactForm from '@/components/ContactForm';
import AnimatedText from '@/components/AnimatedText';
import type { Metadata } from 'next';
import Layout from '@/components/Layout';

export const metadata: Metadata = {
  title: 'Contact',
  description: '저와 연락하고싶은 분은 이메일을 보내주세요!',
};

export default function ContactPage() {
  return (
    <section className="flex flex-col items-center w-full">
      <Layout className="pt-12 flex flex-col items-center justify-center">
        <AnimatedText text="Send me an email" className="pb-16" />
        <ContactForm />
      </Layout>
    </section>
  );
}
