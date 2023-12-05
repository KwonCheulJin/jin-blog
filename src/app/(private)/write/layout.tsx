import '@/styles/write-globals.css';
import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';

export default function WriteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-screen w-full items-center text-dark dark:text-light">
      {children}
    </main>
  );
}
