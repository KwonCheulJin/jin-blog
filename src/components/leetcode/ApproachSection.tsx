import MarkdownRenderer from '@/components/common/MarkdownRenderer';

interface Props {
  approach: string;
}

export default function ApproachSection({ approach }: Props) {
  if (!approach) {
    return null;
  }

  return (
    <div className="mb-6">
      <h3 className="mb-4 flex items-center gap-2 text-xl font-bold text-gray-900 dark:text-gray-100">
        <span className="text-green-600 dark:text-green-400">🎯</span>
        접근 방식
      </h3>
      <div className="rounded-lg border border-green-200 bg-green-50 p-6 dark:border-green-800 dark:bg-green-900/10">
        <MarkdownRenderer
          content={approach}
          variant="green"
        />
      </div>
    </div>
  );
}