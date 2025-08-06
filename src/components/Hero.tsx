'use client';

import AnimatedText from '@/components/common/AnimatedText';
import Image from 'next/image';

export default function Hero() {
  return (
    <div className="flex h-[calc(100vh-320px)] w-full flex-col items-center justify-center dark:text-light lg:flex-row">
      <div className="mb-0 w-[49%] pb-8 sm:pb-12 lg:mb-8 lg:w-full lg:pb-0 lg:pr-16">
        <Image
          className="h-auto w-full rounded-full"
          src="https://iozhvnavvkkqttsrqiyc.supabase.co/storage/v1/object/public/images/my-profile.png"
          alt="my-profile"
          width={250}
          height={250}
          priority
          sizes="(min-width: 768px) 100vw, (min-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="flex w-full flex-col items-center self-center lg:w-[49%]">
        <AnimatedText
          text="growing into a developer who can help someone."
          className=""
        />
        <h2 className="mt-2 w-full text-center text-3xl font-bold lg:text-left">
          {"Hi, I'm Jin"}
        </h2>
        <h3 className="w-full text-center text-xl font-semibold lg:text-left">
          Front-end Engineer
        </h3>
      </div>
    </div>
  );
}
