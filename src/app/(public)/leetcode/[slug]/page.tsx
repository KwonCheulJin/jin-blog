import ProblemHeader from '@/components/leetcode/ProblemHeader';
import ProblemDescription from '@/components/leetcode/ProblemDescription';
import ExamplesSection from '@/components/leetcode/ExamplesSection';
import ConstraintsSection from '@/components/leetcode/ConstraintsSection';
import SolutionSection from '@/components/leetcode/SolutionSection';
import RelatedProblemsSection from '@/components/leetcode/RelatedProblemsSection';
import { getAllSlugs, getLeetCodeProblemData } from '@/service/leetcode';
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

function ProblemContent({
  problemData,
}: {
  problemData: LeetCodeProblemWithNavigation;
}) {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <ProblemHeader problem={problemData} />

      <article className="prose prose-gray max-w-none dark:prose-invert">
        <ProblemDescription description={problemData.description_korean || ''} />

        <ExamplesSection examples={problemData.examples || []} />

        <ConstraintsSection constraints={problemData.constraints_korean || []} />

        <SolutionSection
          approach={problemData.approach_korean}
          solutionCode={problemData.solution_code}
          solutionLanguage={problemData.solution_language}
          timeComplexity={problemData.time_complexity}
          spaceComplexity={problemData.space_complexity}
          explanation={problemData.explanation_korean}
        />

        <RelatedProblemsSection relatedProblems={problemData.relatedProblems || []} />
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
