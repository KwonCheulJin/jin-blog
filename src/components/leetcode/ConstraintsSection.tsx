import MarkdownRenderer from '@/components/common/MarkdownRenderer';

interface Props {
  constraints: string[];
}

export default function ConstraintsSection({ constraints }: Props) {
  if (!constraints || constraints.length === 0) {
    return null;
  }

  return (
    <section className="mb-8">
      <h3 className="mb-4 flex items-center gap-2 text-xl font-bold text-gray-900 dark:text-gray-100">
        <span className="text-orange-600 dark:text-orange-400">⚠️</span>
        제약 조건
      </h3>
      <div className="rounded-lg border border-orange-200 bg-orange-50 p-4 dark:border-orange-800 dark:bg-orange-900/10">
        <ul className="space-y-2 text-gray-700 dark:text-gray-300">
          {constraints.map((constraint, index) => (
            <li key={index} className="flex items-start gap-3">
              <span className="mt-1 text-sm text-orange-600 dark:text-orange-400">
                •
              </span>
              <span className="font-mono text-sm leading-relaxed">
                <MarkdownRenderer
                  content={constraint || ''}
                  variant="default"
                />
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}