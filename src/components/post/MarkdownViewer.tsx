'use client';

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
      className="prose
      prose-code:bg-primary dark:prose-code:bg-primaryDark prose-code:rounded-sm prose-code:px-2 prose-code:py-1 prose-code:my-1 dark:prose-code:text-dark
      dark:prose-invert max-w-none font-medium text-xl dark:text-light"
      remarkPlugins={[[remarkGfm, { fence: true }]]}
      rehypePlugins={[rehypeRaw]}
      components={{
        code({ node, inline, className, children, style, ...props }: CodeProps) {
          const match = /language-(\w+)/.exec(className || '');
          return !inline && match ? (
            <SyntaxHighlighter style={oneDark} language={match[1]} PreTag="div" {...props}>
              {String(children).replace(/\n$/, '')}
            </SyntaxHighlighter>
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          );
        },
        img: (image) => (
          <div className="flex justify-center w-full">
            <Image
              className="w-[70%] h-auto object-fit"
              src={image.src || ''}
              alt={image.alt || ''}
              width={500}
              height={550}
              priority
            />
          </div>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
