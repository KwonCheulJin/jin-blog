import ProblemCard from '@/components/leetcode/ProblemCard';
import { LeetCodeProblemRecord } from '@/types/leetcode';

interface Props {
  relatedProblems: LeetCodeProblemRecord[];
}

export default function RelatedProblemsSection({ relatedProblems }: Props) {
  if (!relatedProblems || relatedProblems.length === 0) {
    return null;
  }

  return (
    <section className="not-prose mt-12">
      <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-gray-100">
        관련 문제
      </h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {relatedProblems.map(relatedProblem => (
          <ProblemCard
            key={relatedProblem.id || relatedProblem.slug}
            problem={relatedProblem}
          />
        ))}
      </div>
    </section>
  );
}