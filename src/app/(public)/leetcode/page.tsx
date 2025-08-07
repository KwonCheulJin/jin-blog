import LeetCodeServerContent from '@/components/leetcode/LeetCodeServerContent';
import { getAllLeetCodeProblemsData } from '@/service/leetcode';
import { LeetCodeSearchParams } from '@/types/leetcode';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "LeetCode 문제 해설 | Jin's Dev Blog",
  description:
    '체계적인 LeetCode 문제 해설과 솔루션을 한국어로 제공합니다. 알고리즘과 자료구조 학습에 도움이 되는 상세한 설명과 함께합니다.',
  keywords: [
    'LeetCode',
    '알고리즘',
    '코딩테스트',
    '자료구조',
    '프로그래밍',
    '문제해결',
    'TypeScript',
    'JavaScript',
    'Python',
  ],
  openGraph: {
    title: 'LeetCode 문제 해설',
    description: '체계적인 LeetCode 문제 해설과 솔루션을 한국어로 제공합니다.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LeetCode 문제 해설',
    description: '체계적인 LeetCode 문제 해설과 솔루션을 한국어로 제공합니다.',
  },
};

interface Props {
  searchParams: Promise<LeetCodeSearchParams>;
}

export default async function LeetCodeProblemsPage({ searchParams }: Props) {
  const params = await searchParams;
  const data = await getAllLeetCodeProblemsData(params);

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      {/* 헤더 */}
      <div className="mb-8 text-center">
        <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-gray-100">
          LeetCode 문제 해설
        </h1>
        <p className="mx-auto max-w-3xl text-lg text-gray-600 dark:text-gray-400">
          체계적인 접근법과 상세한 설명으로 알고리즘 문제 해결 능력을
          키워보세요. 각 문제마다 시간복잡도와 공간복잡도 분석을 포함한 완전한
          해설을 제공합니다.
        </p>
      </div>

      {/* 문제 목록 */}
      <LeetCodeServerContent data={data} searchParams={params} />
    </div>
  );
}
