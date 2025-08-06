'use client';

import { Button } from '@/components/ui/button';
import { getLanguageMapping } from '@/lib/leetcodeUtils';
import { cn } from '@/lib/utils';
import type { CodeBlockProps } from '@/types/leetcode';
import { Check, Copy } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function CodeBlock({
  code,
  language,
  className,
}: CodeBlockProps) {
  const { theme } = useTheme();
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('코드 복사 실패:', err);
    }
  };

  if (!mounted) {
    return (
      <div
        className={cn(
          'w-full rounded-lg bg-gray-100 p-4 dark:bg-gray-800',
          className,
        )}
      >
        <div className="animate-pulse">
          <div className="mb-2 h-4 w-3/4 rounded bg-gray-300 dark:bg-gray-600"></div>
          <div className="mb-2 h-4 w-1/2 rounded bg-gray-300 dark:bg-gray-600"></div>
          <div className="h-4 w-5/6 rounded bg-gray-300 dark:bg-gray-600"></div>
        </div>
      </div>
    );
  }

  const mappedLanguage = getLanguageMapping(language);
  const isDark = theme === 'dark';

  return (
    <div
      className={cn(
        'relative my-6 overflow-hidden rounded-lg shadow-lg',
        className,
      )}
    >
      {/* 헤더 */}
      <div className="flex items-center justify-between border-b border-gray-700 bg-gray-900 px-4 py-3 dark:bg-black">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="h-3 w-3 rounded-full bg-red-500"></div>
            <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
            <div className="h-3 w-3 rounded-full bg-green-500"></div>
          </div>
          <span className="font-mono text-sm font-medium text-gray-300">
            {language}
          </span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCopy}
          className="group h-8 px-3 font-mono text-xs text-gray-300 transition-all duration-200 hover:scale-105 hover:bg-gray-700 hover:text-white active:scale-95"
          title={copied ? '복사됨!' : '코드 복사'}
        >
          {copied ? (
            <>
              <Check className="mr-1 h-3 w-3 animate-pulse text-green-400" /> 복사됨
            </>
          ) : (
            <>
              <Copy className="mr-1 h-3 w-3 transition-transform duration-200 group-hover:scale-110" /> 복사
            </>
          )}
        </Button>
      </div>

      {/* 코드 블록 */}
      <div className="bg-gray-900 dark:bg-black">
        <SyntaxHighlighter
          language={mappedLanguage}
          style={oneDark}
          customStyle={{
            margin: 0,
            padding: '1.5rem 1rem 1.5rem 0.5rem',
            background: '#0d1117',
            fontSize: '0.9rem',
            lineHeight: '1.6',
            fontFamily:
              '"JetBrains Mono", "Fira Code", "SF Mono", Consolas, monospace',
            borderRadius: 0,
            overflow: 'auto',
            tabSize: 4,
            whiteSpace: 'pre' as const,
          }}
          showLineNumbers={true}
          lineNumberStyle={{
            color: isDark ? '#6e7681' : '#656d76',
            paddingRight: '1rem',
            paddingLeft: '1rem',
            fontSize: '0.8rem',
            minWidth: '3rem',
            textAlign: 'right' as const,
            userSelect: 'none' as const,
            borderRight: `1px solid ${isDark ? '#21262d' : '#e1e4e8'}`,
            marginRight: '1rem',
          }}
          wrapLines={false}
          wrapLongLines={false}
          useInlineStyles={true}
          codeTagProps={{
            style: {
              fontFamily:
                '"JetBrains Mono", "Fira Code", "SF Mono", Consolas, monospace',
              fontSize: '0.9rem',
              tabSize: 4,
              whiteSpace: 'pre' as const,
            },
          }}
        >
          {String(code).replace(/\n$/, '')}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
