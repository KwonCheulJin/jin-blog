import AnimatedText from '@/components/common/AnimatedText';
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
      <AnimatedText
        text="LeetCode 문제 해설"
        className="mb-8 mt-4 text-center dark:text-light lg:mb-16"
      />
      {/* 문제 목록 */}
      <LeetCodeServerContent data={data} searchParams={params} />
    </div>
  );
}
