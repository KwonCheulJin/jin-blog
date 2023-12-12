import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
import SectionContainer from '@/components/common/SectionContainer';

export default function WriteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SectionContainer>
      <main className="flex min-h-screen w-full items-center text-dark dark:text-light">
        {children}
      </main>
    </SectionContainer>
  );
}
