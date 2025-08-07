'use client';

import { Button } from '@/components/ui/button';
import { useRouter, useSearchParams } from 'next/navigation';

type Props = {
  total: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
};

export default function Pagination({ total, hasNextPage, hasPrevPage }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = searchParams.get('page') ?? '1';
  const per_page = searchParams.get('per_page') ?? '5';
  const targetTag = searchParams.get('tag') ?? '';

  return (
    <div className="flex justify-center">
      <nav className="flex min-w-[350px] max-w-[350px] items-center justify-center gap-10 py-5 md:min-w-[456px] md:max-w-[456px] lg:min-w-[744px] lg:max-w-[744px]">
        <Button
          variant="ghost"
          disabled={!hasPrevPage}
          onClick={() => {
            router.push(
              `/posts?page=${
                Number(page) - 1
              }&per_page=${per_page}&tag=${targetTag}`,
            );
          }}
        >
          Prev Page
        </Button>
        <span>
          {page} / {Math.ceil(total / Number(per_page))}
        </span>
        <Button
          variant="ghost"
          disabled={!hasNextPage}
          onClick={() => {
            router.push(
              `/posts?page=${
                Number(page) + 1
              }&per_page=${per_page}&tag=${targetTag}`,
            );
          }}
        >
          Next Page
        </Button>
      </nav>
    </div>
  );
}
