import Education from '@/components/about/education';
import Experience from '@/components/about/experience';
import Projects from '@/components/about/projects';
import Skills from '@/components/about/skills';
import AnimatedText from '@/components/common/animated-text';
import Layout from '@/components/common/layout';
import TransitionEffect from '@/components/common/transition-effect';
import type { Metadata } from 'next';

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
          className="mb-4 text-center dark:text-light md:mb-8"
        />
        <Experience />
        <Projects />
        <Education />
        <Skills />
      </Layout>
    </>
  );
}
