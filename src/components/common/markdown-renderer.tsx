import ReactMarkdown from 'react-markdown';
import { memo, useMemo } from 'react';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';

interface MarkdownRendererProps {
  content: string;
  variant?: 'default' | 'green' | 'blue' | 'orange';
  className?: string;
}

const componentVariants = {
  default: {
    p: 'leading-relaxed text-gray-900 dark:text-gray-100',
    strong: 'font-semibold text-gray-900 dark:text-gray-100',
    code: 'rounded bg-gray-100 px-1.5 py-0.5 font-mono text-sm text-gray-900 dark:bg-gray-800 dark:text-gray-100',
    ul: 'mb-4 list-disc space-y-1 pl-6 text-gray-900 dark:text-gray-100',
    ol: 'mb-4 list-decimal space-y-1 pl-6 text-gray-900 dark:text-gray-100',
    li: 'text-gray-900 dark:text-gray-100',
    h1: 'mb-3 text-xl font-bold text-gray-900 dark:text-gray-100',
    h2: 'mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100',
    h3: 'mb-2 text-base font-semibold text-gray-900 dark:text-gray-100',
    blockquote:
      'mb-4 border-l-4 border-gray-300 pl-4 italic text-gray-800 dark:border-gray-600 dark:text-gray-200',
  },
  green: {
    p: 'leading-relaxed text-gray-900 dark:text-gray-100',
    strong: 'font-semibold text-green-800 dark:text-green-200',
    code: 'rounded bg-green-100 px-1.5 py-0.5 font-mono text-sm text-green-900 dark:bg-green-800/50 dark:text-green-100',
    ul: 'mb-4 list-disc space-y-1 pl-6 text-gray-900 dark:text-gray-100',
    ol: 'mb-4 list-decimal space-y-1 pl-6 text-gray-900 dark:text-gray-100',
    li: 'text-gray-900 dark:text-gray-100',
    h1: 'mb-3 text-xl font-bold text-green-800 dark:text-green-200',
    h2: 'mb-2 text-lg font-semibold text-green-800 dark:text-green-200',
    h3: 'mb-2 text-base font-semibold text-green-800 dark:text-green-200',
    blockquote:
      'mb-4 border-l-4 border-green-300 pl-4 italic text-green-800 dark:border-green-600 dark:text-green-200',
  },
  blue: {
    p: 'mb-4 leading-relaxed text-gray-900 dark:text-gray-100',
    strong: 'font-semibold text-blue-800 dark:text-blue-200',
    code: 'rounded bg-blue-100 px-1.5 py-0.5 font-mono text-sm text-blue-900 dark:bg-blue-800/50 dark:text-blue-100',
    ul: 'mb-4 list-disc space-y-1 pl-6 text-gray-900 dark:text-gray-100',
    ol: 'mb-4 list-decimal space-y-1 pl-6 text-gray-900 dark:text-gray-100',
    li: 'text-gray-900 dark:text-gray-100',
    h1: 'mb-3 text-xl font-bold text-blue-800 dark:text-blue-200',
    h2: 'mb-2 text-lg font-semibold text-blue-800 dark:text-blue-200',
    h3: 'mb-2 text-base font-semibold text-blue-800 dark:text-blue-200',
    blockquote:
      'mb-4 border-l-4 border-blue-300 pl-4 italic text-blue-800 dark:border-blue-600 dark:text-blue-200',
  },
  orange: {
    p: 'leading-relaxed text-gray-900 dark:text-gray-100',
    strong: 'font-semibold text-orange-800 dark:text-orange-200',
    code: 'rounded bg-orange-100 px-1.5 py-0.5 font-mono text-sm text-orange-900 dark:bg-orange-800/50 dark:text-orange-100',
    ul: 'mb-4 list-disc space-y-1 pl-6 text-gray-900 dark:text-gray-100',
    ol: 'mb-4 list-decimal space-y-1 pl-6 text-gray-900 dark:text-gray-100',
    li: 'text-gray-900 dark:text-gray-100',
    h1: 'mb-3 text-xl font-bold text-orange-800 dark:text-orange-200',
    h2: 'mb-2 text-lg font-semibold text-orange-800 dark:text-orange-200',
    h3: 'mb-2 text-base font-semibold text-orange-800 dark:text-orange-200',
    blockquote:
      'mb-4 border-l-4 border-orange-300 pl-4 italic text-orange-800 dark:border-orange-600 dark:text-orange-200',
  },
};

const MarkdownRenderer = memo(function MarkdownRenderer({
  content,
  variant = 'default',
  className = '',
}: MarkdownRendererProps) {
  const styles = useMemo(() => componentVariants[variant], [variant]);

  const markdownComponents = useMemo(() => ({
    p: ({ children }: any) => <p className={styles.p}>{children}</p>,
    strong: ({ children }: any) => (
      <strong className={styles.strong}>{children}</strong>
    ),
    code: ({ children }: any) => (
      <code className={styles.code}>{children}</code>
    ),
    ul: ({ children }: any) => <ul className={styles.ul}>{children}</ul>,
    ol: ({ children }: any) => <ol className={styles.ol}>{children}</ol>,
    li: ({ children }: any) => <li className={styles.li}>{children}</li>,
    h1: ({ children }: any) => <h1 className={styles.h1}>{children}</h1>,
    h2: ({ children }: any) => <h2 className={styles.h2}>{children}</h2>,
    h3: ({ children }: any) => <h3 className={styles.h3}>{children}</h3>,
    blockquote: ({ children }: any) => (
      <blockquote className={styles.blockquote}>{children}</blockquote>
    ),
    table: ({ children }: any) => (
      <div className="mb-4 overflow-x-auto">
        <table className="min-w-full rounded border border-gray-200 dark:border-gray-700">
          {children}
        </table>
      </div>
    ),
    th: ({ children }: any) => (
      <th className="border border-gray-200 bg-gray-100 px-3 py-2 text-left font-semibold text-gray-900 dark:border-gray-700 dark:bg-gray-800/30 dark:text-gray-100">
        {children}
      </th>
    ),
    td: ({ children }: any) => (
      <td className="border border-gray-200 px-3 py-2 text-gray-900 dark:border-gray-700 dark:text-gray-100">
        {children}
      </td>
    ),
  }), [styles]);

  return (
    <div
      className={`prose prose-gray max-w-none dark:prose-invert ${className}`}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={markdownComponents}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
});

export default MarkdownRenderer;
