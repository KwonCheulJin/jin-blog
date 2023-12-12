import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { CodeProps } from 'react-markdown/lib/ast-to-react';
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import Image from 'next/image';

type Props = {
  content: string;
};

export default function MarkdownViewer({ content }: Props) {
  return (
    <ReactMarkdown
      className="prose max-w-none rounded-none font-medium dark:prose-invert prose-p:text-base prose-pre:bg-dark prose-pre:p-0 prose-li:text-base dark:text-light"
      remarkPlugins={[[remarkGfm, { fence: true }]]}
      rehypePlugins={[rehypeRaw]}
      components={{
        code({
          node,
          inline,
          className,
          children,
          style,
          ...props
        }: CodeProps) {
          const title = className?.split(':')[1];
          const match = /language-(\w+)/.exec(className || '');
          return !inline && match ? (
            <div>
              {title && (
                <header className="overflow-x-scroll rounded-tl-sm rounded-tr-sm bg-zinc-700 px-3 py-5 font-mono font-bold">
                  {title}
                </header>
              )}
              <SyntaxHighlighter
                style={oneDark}
                language={match[1]}
                PreTag="div"
                className="!mt-0 !rounded-tl-none !rounded-tr-none"
                {...props}
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            </div>
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          );
        },
        img: image => {
          return (
            <Image
              className="object-fit h-auto w-full"
              src={image.src ?? ''}
              alt={image.alt ?? ''}
              width={500}
              height={550}
              priority
            />
          );
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
