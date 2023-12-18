'use client';

import Image from 'next/image';
import AnimatedText from '@/components/common/AnimatedText';

export default function Hero() {
  return (
    <div className="flex h-[calc(100vh-280px)] w-full items-center justify-between dark:text-light sm:!h-[calc(100vh-286px)] lg:h-[calc(100vh-246px)] lg:flex-col lg:justify-center">
      <div className="w-[49%] pr-16 lg:pb-12 lg:pr-0">
        <Image
          className="h-auto w-full rounded-full"
          src="https://iozhvnavvkkqttsrqiyc.supabase.co/storage/v1/object/public/images/my-profile.png"
          alt="my-profile"
          width={250}
          height={250}
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="flex w-[49%] flex-col items-center self-center lg:w-full">
        <AnimatedText
          text="growing into a developer who can help someone."
          className=""
        />
        <h2 className="mt-2 w-full text-left text-3xl font-bold lg:text-center">
          {"Hi, I'm Jin"}
        </h2>
        <h3 className="text-lx w-full text-left font-semibold lg:text-center">
          Front-end Engineer
        </h3>
      </div>
    </div>
  );
}
