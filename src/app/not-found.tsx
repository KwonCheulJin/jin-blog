'use client';
import Error from '@/components/common/Error';
import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';
import SectionContainer from '@/components/common/SectionContainer';

export default function NotFound() {
  return (
    <SectionContainer>
      <Header />
      <main className="flex h-[calc(100vh-280px)] w-full items-center justify-center sm:!h-[calc(100vh-360px)] lg:h-[calc(100vh-246px)]">
        <Error message="페이지를 찾을 수 없습니다." />
      </main>
      <Footer />
    </SectionContainer>
  );
}
