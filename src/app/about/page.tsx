import type { Metadata } from 'next';
import Layout from '@/components/common/Layout';
import AnimatedText from '@/components/common/AnimatedText';
import Skills from '@/components/about/Skills';
import Experience from '@/components/about/Experience';
import Education from '@/components/about/Education';
import Biography from '@/components/about/Biography';

export const metadata: Metadata = {
  title: 'About Me',
  description: '긍정적인 마인드와 진정성 있는 자세로 임하는 프론트엔드 개발자입니다.',
};

export default function AboutPage() {
  return (
    <section className="w-full flex flex-col items-center justify-center dark:text-light">
      <Layout className="pt-16">
        <AnimatedText text="Be positive and Authenticity!" className="mb-16 dark:text-light" />
        <Biography />
        <Skills />
        <Experience />
        <Education />
      </Layout>
    </section>
  );
}
