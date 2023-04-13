import type { Metadata } from 'next';
import Layout from '@/components/Layout';
import AnimatedText from '@/components/AnimatedText';
import Image from 'next/image';
import Skills from '@/components/Skills';
import Experience from '@/components/Experience';
import Education from '@/components/Education';

export const metadata: Metadata = {
  title: 'About Me',
  description: '긍정적인 마인드와 진정성 있는 자세로 임하는 프론트엔드 개발자입니다.',
};

export default function AboutPage() {
  return (
    <section className="flex w-full flex-col items-center justify-center">
      <Layout className="pt-12">
        <AnimatedText text="Be positive and Authenticity!" className="pb-16" />
        <div className="grid w-full grid-cols-8 gap-16">
          <div className="col-span-4 flex flex-col items-start justify-start">
            <h2 className="mb-4 text-lg font-bold uppercase text-dark/75">Biography</h2>
            <p className="font-medium">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto, ipsa adipisci
              laboriosam velit sunt vel consequuntur, ad obcaecati voluptas facere eos animi.
              Assumenda sed ex animi eligendi amet id debitis!
            </p>
            <p className="my-4 font-medium">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati cum laboriosam quas
              molestiae voluptas itaque autem vitae, commodi iure ratione, distinctio esse veniam
              facilis dolorum, molestias sint quis porro debitis!
            </p>
            <p className="font-medium">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati cum laboriosam quas
              molestiae voluptas itaque autem vitae, commodi iure ratione, distinctio esse veniam
              facilis dolorum, molestias sint quis porro debitis!
            </p>
          </div>
          <div className="col-span-4 relative h-max rounded-2xl border-2 border-solid border-dark bg-light p-8">
            <Image
              src="/images/about.png"
              alt="JIN"
              className="w-full h-auto rounded-2xl bg-dark py-6"
              width={250}
              height={450}
            />
            <div className="absolute top-0 -right-4 -z-10 w-[102%] h-[103%] rounded-[2rem] bg-dark"></div>
          </div>
        </div>
        <Skills />
        <Experience />
        <Education />
      </Layout>
    </section>
  );
}

{
  /* <h2 className={TITLE_CLASS}>Who Am I?</h2>
<p>
  긍정적인 마음과 진정성으로! 개발을 사랑하는 프론트엔드 개발자 <br />
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
</p> */
}
