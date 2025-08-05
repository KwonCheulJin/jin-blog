import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import remarkGfm from 'remark-gfm';

type Props = {
  content: string;
};

export default function MarkdownViewer({ content }: Props) {
  return (
    <div className="prose max-w-none rounded-none font-medium dark:prose-invert prose-p:text-base prose-pre:bg-dark prose-pre:p-0 prose-li:text-base dark:text-light">
      <ReactMarkdown
        remarkPlugins={[[remarkGfm]]}
        rehypePlugins={[rehypeRaw, rehypeSanitize]}
        components={{
        code(props) {
          const { children, className, node, ref, ...rest } = props;
          const title = className?.split(':')[1];
          const match = /language-(\w+)/.exec(className || '');
          return match ? (
            <div>
              {title && (
                <header className="overflow-x-scroll rounded-tl-sm rounded-tr-sm bg-zinc-700 px-3 py-5 font-mono font-bold">
                  {title}
                </header>
              )}
              <SyntaxHighlighter
                {...rest}
                PreTag="div"
                className="!mt-0 !rounded-tl-none !rounded-tr-none"
                language={match[1]}
                style={oneDark}
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
              src={typeof image.src === 'string' ? image.src : ''}
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
    </div>
  );
}
