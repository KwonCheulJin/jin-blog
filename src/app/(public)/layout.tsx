import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';
import SectionContainer from '@/components/common/SectionContainer';

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
