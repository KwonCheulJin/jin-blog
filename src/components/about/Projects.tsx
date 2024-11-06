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
      <h2 className="my-32 w-full text-center text-8xl font-bold md:mb-16 md:text-6xl xs:text-4xl">
        Projects
      </h2>
      <div className="relative mx-auto w-[75%] md:w-full lg:w-[90%]">
        <Carousel3D />
      </div>
    </div>
  );
}
