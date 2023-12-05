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
        p: (paragraph: { node?: any; children: React.ReactNode }) => {
          const { node } = paragraph;

          if (node.children[0].tagName === 'img') {
            const image = node.children[0];
            const metastring = image.properties.alt;
            const alt = metastring?.replace(/ *\{[^)]*\} */g, '');
            const metaWidth = metastring.match(/{([^}]+)x/);
            const metaHeight = metastring.match(/x([^}]+)}/);
            const width = metaWidth ? metaWidth[1] : '768';
            const height = metaHeight ? metaHeight[1] : '432';
            const isPriority = metastring?.toLowerCase().match('{priority}');
            const hasCaption = metastring?.toLowerCase().includes('{caption:');
            const caption = metastring?.match(/{caption: (.*?)}/)?.pop();

            return (
              <div className="flex w-full justify-center">
                <Image
                  src={image.properties.src}
                  width={width}
                  height={height}
                  className="object-fit h-auto w-[70%]"
                  alt={alt}
                  priority={isPriority}
                />
                {hasCaption ? (
                  <div className="caption" aria-label={caption}>
                    {caption}
                  </div>
                ) : null}
              </div>
            );
          }
          return <p>{paragraph.children}</p>;
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
