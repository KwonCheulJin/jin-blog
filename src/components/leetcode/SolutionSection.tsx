import ApproachSection from '@/components/leetcode/ApproachSection';
import SolutionCodeSection from '@/components/leetcode/SolutionCodeSection';
import ComplexitySection from '@/components/leetcode/ComplexitySection';
import ExplanationSection from '@/components/leetcode/ExplanationSection';

interface Props {
  approach?: string;
  solutionCode?: string;
  solutionLanguage?: string;
  timeComplexity?: string;
  spaceComplexity?: string;
  explanation?: string;
}

export default function SolutionSection({
  approach,
  solutionCode,
  solutionLanguage,
  timeComplexity,
  spaceComplexity,
  explanation,
}: Props) {
  return (
    <section className="mb-8">
      <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-gray-100">
        해결 방법
      </h2>

      <ApproachSection approach={approach || ''} />

      <SolutionCodeSection
        code={solutionCode || ''}
        language={solutionLanguage || ''}
      />

      <ComplexitySection
        timeComplexity={timeComplexity}
        spaceComplexity={spaceComplexity}
      />

      <ExplanationSection explanation={explanation || ''} />
    </section>
  );
}