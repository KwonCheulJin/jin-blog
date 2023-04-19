'use client';

import { useParams } from 'next/navigation';
import { useEffect } from 'react';

export default function ScrollUp() {
  const params = useParams();

  useEffect(() => {
    window.document.body?.scrollTo(0, 0);
  }, [params]);

  return null;
}
