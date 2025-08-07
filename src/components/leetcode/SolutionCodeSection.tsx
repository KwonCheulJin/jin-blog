import CodeBlock from '@/components/leetcode/CodeBlock';

interface Props {
  code: string;
  language: string;
}

export default function SolutionCodeSection({ code, language }: Props) {
  if (!code) {
    return null;
  }

  return (
    <div className="mb-6">
      <h3 className="mb-4 text-xl font-bold text-gray-900 dark:text-gray-100">
        솔루션 코드
      </h3>
      <CodeBlock
        code={code}
        language={language}
      />
    </div>
  );
}