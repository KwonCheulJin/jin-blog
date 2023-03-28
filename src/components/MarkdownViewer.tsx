'use client';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { CodeProps } from 'react-markdown/lib/ast-to-react';
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import remarkGfm from 'remark-gfm';
import Image from 'next/image';

type Props = {
  content: string;
};

export default function MarkdownViewer({ content }: Props) {
  return (
    <ReactMarkdown
      className="prose max-w-none"
      remarkPlugins={[remarkGfm]}
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
          <Image
            className="w-full max-h-60 object-cover"
            src={image.src || ''}
            alt={image.alt || ''}
            width={500}
            height={350}
          />
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
