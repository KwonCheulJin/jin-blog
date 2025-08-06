import CodeBlock from '@/components/leetcode/CodeBlock';
import ComplexityBadge from '@/components/leetcode/ComplexityBadge';
import ProblemCard from '@/components/leetcode/ProblemCard';
import ProblemHeader from '@/components/leetcode/ProblemHeader';
import { leetcodeRepository } from '@/repositories/leetcodeRepository';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';

interface Props {
  params: Promise<{ slug: string }>;
}

// 메타데이터 생성
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { slug } = await params;
    const problem = await leetcodeRepository.getLeetCodeProblemStatic(slug);

    if (!problem) {
      return {
        title: '문제를 찾을 수 없습니다 | LeetCode 문제 해설',
        description: '요청하신 문제를 찾을 수 없습니다.',
      };
    }

    const title = `${problem.title_korean} - LeetCode ${problem.problem_number}번 | Jin's Dev Blog`;
    const description =
      problem.description_korean?.substring(0, 160) ||
      `LeetCode ${problem.problem_number}번 "${problem.title_korean}" 문제의 상세한 해설과 솔루션`;

    return {
      title,
      description,
      keywords: [
        'LeetCode',
        '알고리즘',
        '코딩테스트',
        problem.difficulty,
        problem.solution_language,
        ...problem.tags,
      ],
      openGraph: {
        title: problem.title_korean,
        description,
        type: 'article',
        url: `/leetcode/${problem.slug}`,
        tags: problem.tags,
      },
      twitter: {
        card: 'summary_large_image',
        title: problem.title_korean,
        description,
      },
      alternates: {
        canonical: `/leetcode/${problem.slug}`,
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

function LoadingContent() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <div className="animate-pulse">
        {/* 헤더 로딩 */}
        <div className="mb-8 border-b border-gray-200 pb-6 dark:border-gray-700">
          <div className="mb-4 flex items-center gap-3">
            <div className="h-5 w-24 rounded bg-gray-300 dark:bg-gray-600"></div>
            <div className="h-6 w-16 rounded-full bg-gray-300 dark:bg-gray-600"></div>
          </div>
          <div className="mb-2 h-8 w-3/4 rounded bg-gray-300 dark:bg-gray-600"></div>
          <div className="mb-6 h-6 w-1/2 rounded bg-gray-300 dark:bg-gray-600"></div>
          <div className="mb-6 flex gap-2">
            <div className="h-6 w-16 rounded bg-gray-300 dark:bg-gray-600"></div>
            <div className="h-6 w-20 rounded bg-gray-300 dark:bg-gray-600"></div>
            <div className="h-6 w-24 rounded bg-gray-300 dark:bg-gray-600"></div>
          </div>
        </div>

        {/* 내용 로딩 */}
        <div className="space-y-8">
          <div>
            <div className="mb-4 h-6 w-32 rounded bg-gray-300 dark:bg-gray-600"></div>
            <div className="space-y-2">
              <div className="h-4 rounded bg-gray-300 dark:bg-gray-600"></div>
              <div className="h-4 w-5/6 rounded bg-gray-300 dark:bg-gray-600"></div>
              <div className="h-4 w-3/4 rounded bg-gray-300 dark:bg-gray-600"></div>
            </div>
          </div>

          <div>
            <div className="mb-4 h-6 w-24 rounded bg-gray-300 dark:bg-gray-600"></div>
            <div className="h-32 rounded bg-gray-300 dark:bg-gray-600"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

async function ProblemContent({ slug }: { slug: string }) {
  const problem = await leetcodeRepository.getLeetCodeProblemStatic(slug);

  if (!problem) {
    notFound();
  }

  const relatedProblems = await leetcodeRepository.getRelatedProblemsStatic(problem, 3);

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <ProblemHeader problem={problem} />

      <article className="prose prose-gray max-w-none dark:prose-invert">
        {/* 문제 설명 */}
        <section className="mb-8">
          <h2 className="mb-6 border-b border-gray-200 pb-2 text-2xl font-bold text-gray-900 dark:border-gray-700 dark:text-gray-100">
            문제 설명
          </h2>
          <div className="prose prose-lg prose-gray max-w-none dark:prose-invert">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
              components={{
                // 커스텀 컴포넌트 스타일
                p: ({ children }) => (
                  <p className="mb-4 leading-relaxed text-gray-900 dark:text-gray-100">
                    {children}
                  </p>
                ),
                strong: ({ children }) => (
                  <strong className="font-semibold text-gray-900 dark:text-gray-100">
                    {children}
                  </strong>
                ),
                code: ({ children }) => (
                  <code className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-sm text-gray-900 dark:bg-gray-800 dark:text-gray-100">
                    {children}
                  </code>
                ),
                ul: ({ children }) => (
                  <ul className="mb-4 list-inside list-disc space-y-1 text-gray-900 dark:text-gray-100">
                    {children}
                  </ul>
                ),
                ol: ({ children }) => (
                  <ol className="mb-4 list-inside list-decimal space-y-1 text-gray-900 dark:text-gray-100">
                    {children}
                  </ol>
                ),
                li: ({ children }) => (
                  <li className="text-gray-900 dark:text-gray-100">
                    {children}
                  </li>
                ),
              }}
            >
              {problem.description_korean || ''}
            </ReactMarkdown>
          </div>
        </section>

        {/* 제약 조건 */}
        {problem.constraints_korean &&
          problem.constraints_korean.length > 0 && (
            <section className="mb-8">
              <h3 className="mb-4 flex items-center gap-2 text-xl font-bold text-gray-900 dark:text-gray-100">
                <span className="text-orange-600 dark:text-orange-400">⚠️</span>
                제약 조건
              </h3>
              <div className="rounded-lg border border-orange-200 bg-orange-50 p-4 dark:border-orange-800 dark:bg-orange-900/10">
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  {problem.constraints_korean.map((constraint, index) => (
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
        {problem.examples && problem.examples.length > 0 && (
          <section className="-mt-2 mb-8">
            <h3 className="mb-4 text-xl font-bold text-gray-900 dark:text-gray-100">
              예제
            </h3>
            <div className="space-y-4">
              {problem.examples.map((example, index) => (
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
          {problem.approach_korean && (
            <div className="mb-6">
              <h3 className="mb-4 flex items-center gap-2 text-xl font-bold text-gray-900 dark:text-gray-100">
                <span className="text-green-600 dark:text-green-400">🎯</span>
                접근 방식
              </h3>
              <div className="rounded-lg border border-green-200 bg-green-50 p-6 dark:border-green-800 dark:bg-green-900/10">
                <div className="prose prose-green max-w-none dark:prose-invert">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw]}
                    components={{
                      p: ({ children }) => (
                        <p className="leading-relaxed text-gray-900 dark:text-gray-100">
                          {children}
                        </p>
                      ),
                      strong: ({ children }) => (
                        <strong className="font-semibold text-green-800 dark:text-green-200">
                          {children}
                        </strong>
                      ),
                      code: ({ children }) => (
                        <code className="rounded bg-green-100 px-1.5 py-0.5 font-mono text-sm text-green-900 dark:bg-green-800/50 dark:text-green-100">
                          {children}
                        </code>
                      ),
                      ul: ({ children }) => (
                        <ul className="mb-4 list-inside list-disc space-y-1 text-gray-900 dark:text-gray-100">
                          {children}
                        </ul>
                      ),
                      ol: ({ children }) => (
                        <ol className="mb-4 list-inside list-decimal space-y-1 text-gray-900 dark:text-gray-100">
                          {children}
                        </ol>
                      ),
                      li: ({ children }) => (
                        <li className="text-gray-900 dark:text-gray-100">
                          {children}
                        </li>
                      ),
                      h1: ({ children }) => (
                        <h1 className="mb-3 text-xl font-bold text-green-800 dark:text-green-200">
                          {children}
                        </h1>
                      ),
                      h2: ({ children }) => (
                        <h2 className="mb-2 text-lg font-semibold text-green-800 dark:text-green-200">
                          {children}
                        </h2>
                      ),
                      h3: ({ children }) => (
                        <h3 className="mb-2 text-base font-semibold text-green-800 dark:text-green-200">
                          {children}
                        </h3>
                      ),
                    }}
                  >
                    {problem.approach_korean || ''}
                  </ReactMarkdown>
                </div>
              </div>
            </div>
          )}

          {/* 솔루션 코드 */}
          {problem.solution_code && (
            <div className="mb-6">
              <h3 className="mb-4 text-xl font-bold text-gray-900 dark:text-gray-100">
                솔루션 코드
              </h3>
              <CodeBlock
                code={problem.solution_code}
                language={problem.solution_language}
              />
            </div>
          )}

          {/* 복잡도 분석 */}
          <div className="mb-6">
            <h3 className="mb-4 text-xl font-bold text-gray-900 dark:text-gray-100">
              복잡도 분석
            </h3>
            <ComplexityBadge
              timeComplexity={problem.time_complexity}
              spaceComplexity={problem.space_complexity}
            />
          </div>

          {/* 상세 설명 */}
          {problem.explanation_korean && (
            <div className="mb-6">
              <h3 className="mb-4 flex items-center gap-2 text-xl font-bold text-gray-900 dark:text-gray-100">
                <span className="text-blue-600 dark:text-blue-400">💡</span>
                상세 설명
              </h3>
              <div className="rounded-lg border border-blue-200 bg-blue-50 p-6 dark:border-blue-800 dark:bg-blue-900/10">
                <div className="prose prose-blue max-w-none dark:prose-invert">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw]}
                    components={{
                      p: ({ children }) => (
                        <p className="mb-4 leading-relaxed text-gray-900 dark:text-gray-100">
                          {children}
                        </p>
                      ),
                      strong: ({ children }) => (
                        <strong className="font-semibold text-blue-800 dark:text-blue-200">
                          {children}
                        </strong>
                      ),
                      code: ({ children }) => (
                        <code className="rounded bg-blue-100 px-1.5 py-0.5 font-mono text-sm text-blue-900 dark:bg-blue-800/50 dark:text-blue-100">
                          {children}
                        </code>
                      ),
                      ul: ({ children }) => (
                        <ul className="mb-4 list-inside list-disc space-y-1 text-gray-900 dark:text-gray-100">
                          {children}
                        </ul>
                      ),
                      ol: ({ children }) => (
                        <ol className="mb-4 list-inside list-decimal space-y-1 text-gray-900 dark:text-gray-100">
                          {children}
                        </ol>
                      ),
                      li: ({ children }) => (
                        <li className="text-gray-900 dark:text-gray-100">
                          {children}
                        </li>
                      ),
                      h1: ({ children }) => (
                        <h1 className="mb-3 text-xl font-bold text-blue-800 dark:text-blue-200">
                          {children}
                        </h1>
                      ),
                      h2: ({ children }) => (
                        <h2 className="mb-2 text-lg font-semibold text-blue-800 dark:text-blue-200">
                          {children}
                        </h2>
                      ),
                      h3: ({ children }) => (
                        <h3 className="mb-2 text-base font-semibold text-blue-800 dark:text-blue-200">
                          {children}
                        </h3>
                      ),
                      blockquote: ({ children }) => (
                        <blockquote className="mb-4 border-l-4 border-blue-300 pl-4 italic text-blue-800 dark:border-blue-600 dark:text-blue-200">
                          {children}
                        </blockquote>
                      ),
                      table: ({ children }) => (
                        <div className="mb-4 overflow-x-auto">
                          <table className="min-w-full rounded border border-blue-200 dark:border-blue-700">
                            {children}
                          </table>
                        </div>
                      ),
                      th: ({ children }) => (
                        <th className="border border-blue-200 bg-blue-100 px-3 py-2 text-left font-semibold text-blue-900 dark:border-blue-700 dark:bg-blue-800/30 dark:text-blue-100">
                          {children}
                        </th>
                      ),
                      td: ({ children }) => (
                        <td className="border border-blue-200 px-3 py-2 text-gray-900 dark:border-blue-700 dark:text-gray-100">
                          {children}
                        </td>
                      ),
                    }}
                  >
                    {problem.explanation_korean || ''}
                  </ReactMarkdown>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* 관련 문제 */}
        {relatedProblems.length > 0 && (
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
        )}
      </article>
    </div>
  );
}

export default async function LeetCodeProblemPage({ params }: Props) {
  const { slug } = await params;

  return (
    <Suspense fallback={<LoadingContent />}>
      <ProblemContent slug={slug} />
    </Suspense>
  );
}
