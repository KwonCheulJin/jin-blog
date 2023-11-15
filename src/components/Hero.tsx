'use client';

import Image from 'next/image';
import AnimatedText from '@/components/common/AnimatedText';

export default function Hero() {
  return (
    <section className="flex w-full items-center justify-between dark:text-light lg:flex-col">
      <div className="w-[49%] pr-16 md:w-full md:pr-0 md:pb-12">
        <Image
          className="h-auto w-full rounded-full md:inline-block md:w-full lg:hidden"
          src="/images/my-profile.webp"
          alt="my-profile"
          width={250}
          height={250}
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="flex w-[49%] flex-col items-center self-center lg:w-full ">
        <AnimatedText
          text="growing into a developer who can help someone."
          className="!text-left !text-7xl dark:text-light sm:!text-4xl md:!text-6xl lg:!text-center lg:!text-7xl xl:!text-6xl 2xl:!text-left 2xl:!text-7xl"
        />
        <h2 className="mt-2 w-full text-left text-3xl font-bold lg:text-center">
          {"Hi, I'm Jin"}
        </h2>
        <h3 className="text-lx w-full text-left font-semibold lg:text-center">
          Front-end Engineer
        </h3>
      </div>
    </section>
  );
}
