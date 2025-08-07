import MarkdownRenderer from '@/components/common/MarkdownRenderer';

interface Props {
  description: string;
}

export default function ProblemDescription({ description }: Props) {
  return (
    <section className="mb-8">
      <h2 className="mb-6 border-b border-gray-200 pb-2 text-2xl font-bold text-gray-900 dark:border-gray-700 dark:text-gray-100">
        문제 설명
      </h2>
      <MarkdownRenderer
        content={description || ''}
        variant="default"
        className="prose-lg"
      />
    </section>
  );
}