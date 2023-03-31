import Hero from '@/components/Hero';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Me',
  description: '저를 소개합니다',
};

const TITLE_CLASS = 'text-2xl font-bold text-gray-800 m-2';
export default function AboutPage() {
  return (
    <>
      <Hero />
      <section className="bg-gray-100 shadow-lg p-8 text-center m-8">
        <h2 className={TITLE_CLASS}>Who Am I?</h2>
        <p>
          개발을 사랑하는 프론트엔드 개발자 <br />
          보안 교육 플래폼 서비스를 만들고 있음
        </p>
        <h2 className={TITLE_CLASS}>Career</h2>
        <p>옵스테크 (-Now)</p>
        <p>프리픽스 (-2021.8 ~ 2022.3)</p>
        <h2 className={TITLE_CLASS}>Skills</h2>
        <p>
          React, Node <br />
          Git <br />
          VS Code
        </p>
      </section>
    </>
  );
}
