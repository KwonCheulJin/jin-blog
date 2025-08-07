import ComplexityBadge from '@/components/leetcode/ComplexityBadge';

interface Props {
  timeComplexity?: string;
  spaceComplexity?: string;
}

export default function ComplexitySection({ timeComplexity, spaceComplexity }: Props) {
  return (
    <div className="mb-6">
      <h3 className="mb-4 text-xl font-bold text-gray-900 dark:text-gray-100">
        복잡도 분석
      </h3>
      <ComplexityBadge
        timeComplexity={timeComplexity}
        spaceComplexity={spaceComplexity}
      />
    </div>
  );
}