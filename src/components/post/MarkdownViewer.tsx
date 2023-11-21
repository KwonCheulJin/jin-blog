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
      className="prose max-w-none font-medium dark:prose-invert prose-p:text-base prose-pre:bg-dark prose-pre:p-0 prose-li:text-base dark:text-light rounded-none"
      remarkPlugins={[[remarkGfm, { fence: true }]]}
      rehypePlugins={[rehypeRaw]}
      components={{
        code({ node, inline, className, children, style, ...props }: CodeProps) {
          const title = className?.split(':')[1];
          const match = /language-(\w+)/.exec(className || '');
          return !inline && match ? (
            <div>
              {title && (
                <header className="px-3 py-5 rounded-tl-sm rounded-tr-sm bg-zinc-700 font-mono font-bold">
                  {title}
                </header>
              )}
              <SyntaxHighlighter
                style={oneDark}
                language={match[1]}
                PreTag="div"
                className="!rounded-tl-none !rounded-tr-none !mt-0"
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
