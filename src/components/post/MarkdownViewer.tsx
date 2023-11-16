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
      max-w-none text-xl font-medium dark:prose-invert prose-p:text-base prose-code:my-1 prose-code:rounded-sm
      prose-code:bg-primary prose-code:px-2 prose-code:py-1 prose-li:text-base dark:text-light dark:prose-code:bg-primaryDark dark:prose-code:text-dark"
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
          const match = /language-(\w+)/.exec(className || '');
          return !inline && match ? (
            <SyntaxHighlighter
              style={oneDark}
              language={match[1]}
              PreTag="div"
              {...props}
            >
              {String(children).replace(/\n$/, '')}
            </SyntaxHighlighter>
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          );
        },
        img: image => (
          <div className="flex w-full justify-center">
            <Image
              className="object-fit h-auto w-[70%]"
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
