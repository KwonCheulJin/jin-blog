import CodeBlock from '@/components/leetcode/CodeBlock';
import ComplexityBadge from '@/components/leetcode/ComplexityBadge';
import ProblemCard from '@/components/leetcode/ProblemCard';
import ProblemHeader from '@/components/leetcode/ProblemHeader';
import MarkdownRenderer from '@/components/common/MarkdownRenderer';
import { getLeetCodeProblemData, getAllSlugs } from '@/service/leetcode';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{ slug: string }>;
}

// 메타데이터 생성
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { slug } = await params;
    const problemData = await getLeetCodeProblemData(slug);

    if (!problemData) {
      return {
        title: '문제를 찾을 수 없습니다 | LeetCode 문제 해설',
        description: '요청하신 문제를 찾을 수 없습니다.',
      };
    }

    const title = `${problemData.title_korean} - LeetCode ${problemData.problem_number}번 | Jin's Dev Blog`;
    const description =
      problemData.description_korean?.substring(0, 160) ||
      `LeetCode ${problemData.problem_number}번 "${problemData.title_korean}" 문제의 상세한 해설과 솔루션`;

    return {
      title,
      description,
      keywords: [
        'LeetCode',
        '알고리즘',
        '코딩테스트',
        problemData.difficulty,
        problemData.solution_language,
        ...problemData.tags,
      ],
      openGraph: {
        title: problemData.title_korean,
        description,
        type: 'article',
        url: `/leetcode/${problemData.slug}`,
        tags: problemData.tags,
      },
      twitter: {
        card: 'summary_large_image',
        title: problemData.title_korean,
        description,
      },
      alternates: {
        canonical: `/leetcode/${problemData.slug}`,
      },
    };
  } catch (error) {
    console.error('메타데이터 생성 오류:', error);
    return {
      title: '오류 발생 | LeetCode 문제 해설',
      description: '문제 정보를 불러오는 중 오류가 발생했습니다.',
    };
  }
}

import { LeetCodeProblemWithNavigation } from '@/types/leetcode';

function ProblemContent({ problemData }: { problemData: LeetCodeProblemWithNavigation }) {

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <ProblemHeader problem={problemData} />

      <article className="prose prose-gray max-w-none dark:prose-invert">
        {/* 문제 설명 */}
        <section className="mb-8">
          <h2 className="mb-6 border-b border-gray-200 pb-2 text-2xl font-bold text-gray-900 dark:border-gray-700 dark:text-gray-100">
            문제 설명
          </h2>
          <MarkdownRenderer
            content={problemData.description_korean || ''}
            variant="default"
            className="prose-lg"
          />
        </section>

        {/* 제약 조건 */}
        {problemData.constraints_korean &&
          problemData.constraints_korean.length > 0 && (
            <section className="mb-8">
              <h3 className="mb-4 flex items-center gap-2 text-xl font-bold text-gray-900 dark:text-gray-100">
                <span className="text-orange-600 dark:text-orange-400">⚠️</span>
                제약 조건
              </h3>
              <div className="rounded-lg border border-orange-200 bg-orange-50 p-4 dark:border-orange-800 dark:bg-orange-900/10">
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  {problemData.constraints_korean.map((constraint, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="mt-1 text-sm text-orange-600 dark:text-orange-400">
                        •
                      </span>
                      <span className="font-mono text-sm leading-relaxed">
                        {constraint}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          )}

        {/* 예제 */}
        {problemData.examples && problemData.examples.length > 0 && (
          <section className="-mt-2 mb-8">
            <h3 className="mb-4 text-xl font-bold text-gray-900 dark:text-gray-100">
              예제
            </h3>
            <div className="space-y-4">
              {problemData.examples.map((example, index) => (
                <div
                  key={index}
                  className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800/50"
                >
                  <h4 className="mb-2 mt-0 font-semibold text-gray-900 dark:text-gray-100">
                    예제 {index + 1}
                  </h4>
                  <div className="font-mono text-sm">
                    <div>
                      <span className="font-semibold text-blue-600 dark:text-blue-400">
                        입력:
                      </span>{' '}
                      <span className="text-gray-700 dark:text-gray-300">
                        {example.input}
                      </span>
                    </div>
                    <div>
                      <span className="font-semibold text-green-600 dark:text-green-400">
                        출력:
                      </span>{' '}
                      <span className="text-gray-700 dark:text-gray-300">
                        {example.output}
                      </span>
                    </div>
                    {example.explanation && (
                      <div>
                        <span className="font-semibold text-purple-600 dark:text-purple-400">
                          설명:
                        </span>{' '}
                        <span className="text-gray-700 dark:text-gray-300">
                          {example.explanation}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 해결 방법 */}
        <section className="mb-8">
          <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-gray-100">
            해결 방법
          </h2>

          {/* 접근 방식 */}
          {problemData.approach_korean && (
            <div className="mb-6">
              <h3 className="mb-4 flex items-center gap-2 text-xl font-bold text-gray-900 dark:text-gray-100">
                <span className="text-green-600 dark:text-green-400">🎯</span>
                접근 방식
              </h3>
              <div className="rounded-lg border border-green-200 bg-green-50 p-6 dark:border-green-800 dark:bg-green-900/10">
                <MarkdownRenderer
                  content={problemData.approach_korean || ''}
                  variant="green"
                />
              </div>
            </div>
          )}

          {/* 솔루션 코드 */}
          {problemData.solution_code && (
            <div className="mb-6">
              <h3 className="mb-4 text-xl font-bold text-gray-900 dark:text-gray-100">
                솔루션 코드
              </h3>
              <CodeBlock
                code={problemData.solution_code}
                language={problemData.solution_language}
              />
            </div>
          )}

          {/* 복잡도 분석 */}
          <div className="mb-6">
            <h3 className="mb-4 text-xl font-bold text-gray-900 dark:text-gray-100">
              복잡도 분석
            </h3>
            <ComplexityBadge
              timeComplexity={problemData.time_complexity}
              spaceComplexity={problemData.space_complexity}
            />
          </div>

          {/* 상세 설명 */}
          {problemData.explanation_korean && (
            <div className="mb-6">
              <h3 className="mb-4 flex items-center gap-2 text-xl font-bold text-gray-900 dark:text-gray-100">
                <span className="text-blue-600 dark:text-blue-400">💡</span>
                상세 설명
              </h3>
              <div className="rounded-lg border border-blue-200 bg-blue-50 p-6 dark:border-blue-800 dark:bg-blue-900/10">
                <MarkdownRenderer
                  content={problemData.explanation_korean || ''}
                  variant="blue"
                />
              </div>
            </div>
          )}
        </section>

        {/* 관련 문제 */}
        {problemData.relatedProblems && problemData.relatedProblems.length > 0 && (
          <section className="not-prose mt-12">
            <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-gray-100">
              관련 문제
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {problemData.relatedProblems.map(relatedProblem => (
                <ProblemCard
                  key={relatedProblem.id || relatedProblem.slug}
                  problem={relatedProblem}
                />
              ))}
            </div>
          </section>
        )}
      </article>
    </div>
  );
}

export default async function LeetCodeProblemPage({ params }: Props) {
  const { slug } = await params;
  const problemData = await getLeetCodeProblemData(slug);

  if (!problemData) {
    notFound();
  }

  return <ProblemContent problemData={problemData} />;
}

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map(slug => ({
    slug,
  }));
}
