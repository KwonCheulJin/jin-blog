import '@/styles/globals.css';
import '@mdxeditor/editor/style.css';

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
