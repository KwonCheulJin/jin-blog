import Footer from '@/components/common/footer';
import Header from '@/components/common/header';
import SectionContainer from '@/components/common/section-container';

export default function PageLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <SectionContainer>
      <Header />
      <main className="flex w-full items-center text-dark dark:text-light">
        {children}
        {modal}
      </main>
      <Footer />
    </SectionContainer>
  );
}
