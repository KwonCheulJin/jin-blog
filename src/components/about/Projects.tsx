'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const Carousel3D = dynamic(() => import('@/components/about/Carousel3D'), {
  loading: () => (
    <div className="flex h-64 items-center justify-center">
      <div className="flex items-center space-x-2">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
        <span className="text-gray-600 dark:text-gray-400">3D 캐러셀 로딩 중...</span>
      </div>
    </div>
  ),
});

const slides = [
  { image: 'reverschool-image.png', title: 'Image 1' },
  { image: 'intro-content.svg', title: 'Image 2' },
  { image: 'ogImage.png', title: 'Image 3' },
];

export default function Projects() {
  return (
    <div className="mb-16 mt-32">
      <h2 className="mb-16 w-full text-center text-4xl font-bold md:text-6xl lg:my-32 lg:text-8xl">
        Projects
      </h2>
      <div className="relative mx-auto w-[75%] md:w-[80%]">
        <Suspense fallback={
          <div className="flex h-64 items-center justify-center">
            <div className="flex items-center space-x-2">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
              <span className="text-gray-600 dark:text-gray-400">3D 캐러셀 준비 중...</span>
            </div>
          </div>
        }>
          <Carousel3D />
        </Suspense>
      </div>
    </div>
  );
}
