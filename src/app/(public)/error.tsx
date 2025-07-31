'use client'; // Error components must be Client Components

import { useEffect } from 'react';
import Error from '@/components/common/Error';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    if (process.env.NODE_ENV === 'development') {
      console.error(error);
    }
    // TODO: 프로덕션에서는 실제 에러 리포팅 서비스 사용 (예: Sentry)
  }, [error]);

  return (
    <div className="flex h-[calc(100vh-280px)] w-full items-center justify-center sm:!h-[calc(100vh-360px)] lg:h-[calc(100vh-246px)]">
      <Error message="잘못된 접근입니다." />
    </div>
  );
}
