import MarkdownRenderer from '@/components/common/markdown-renderer';

interface Props {
  explanation: string;
}

export default function ExplanationSection({ explanation }: Props) {
  if (!explanation) {
    return null;
  }

  return (
    <div className="mb-6">
      <h3 className="mb-4 flex items-center gap-2 text-xl font-bold text-gray-900 dark:text-gray-100">
        <span className="text-blue-600 dark:text-blue-400">💡</span>
        상세 설명
      </h3>
      <div className="rounded-lg border border-blue-200 bg-blue-50 p-6 dark:border-blue-800 dark:bg-blue-900/10">
        <MarkdownRenderer
          content={explanation}
          variant="blue"
        />
      </div>
    </div>
  );
}