import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';

export default function PageLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="flex min-h-screen w-full items-center text-dark dark:text-light">
        {children}
        {modal}
      </main>
      <Footer />
    </>
  );
}
