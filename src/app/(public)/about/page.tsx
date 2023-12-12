import type { Metadata } from 'next';
import Layout from '@/components/common/Layout';
import AnimatedText from '@/components/common/AnimatedText';
import Skills from '@/components/about/Skills';
import Experience from '@/components/about/Experience';
import Education from '@/components/about/Education';
import TransitionEffect from '@/components/common/TransitionEffect';

export const metadata: Metadata = {
  title: 'About Me',
  description:
    '긍정적인 마인드와 진정성 있는 자세로 임하는 프론트엔드 개발자입니다.',
};

export default function AboutPage() {
  return (
    <>
      <TransitionEffect />
      <Layout className="pt-16">
        <AnimatedText
          text="Be positive and Authenticity!"
          className="mb-16 text-center dark:text-light sm:mb-8"
        />
        <Skills />
        <Experience />
        <Education />
      </Layout>
    </>
  );
}
