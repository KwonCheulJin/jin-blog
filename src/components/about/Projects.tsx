'use client';

import Carousel3D from '@/components/about/Carousel3D';

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
      <div className="relative mx-auto w-[75%] md:w-[90%] lg:w-full">
        <Carousel3D />
      </div>
    </div>
  );
}
