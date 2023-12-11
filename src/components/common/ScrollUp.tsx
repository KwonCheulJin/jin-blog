'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function ScrollUp() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    window.scroll(0, 0);
  }, [pathname, searchParams]);

  return <></>;
}
