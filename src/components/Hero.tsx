'use client';

import Image from 'next/image';
import Link from 'next/link';
import AnimatedText from '@/components/common/AnimatedText';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="flex items-center justify-between w-full dark:text-light lg:flex-col">
      <div className="w-[49%] pr-16 md:w-full md:pr-0 md:pb-12">
        <Image
          className="rounded-full w-full h-auto lg:hidden md:inline-block md:w-full"
          src="/images/my-profile.png"
          alt="my-profile"
          width={250}
          height={250}
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="w-[49%] flex flex-col items-center self-center lg:w-full ">
        <AnimatedText
          text="growing into a developer who can help someone."
          className="!text-7xl !text-left 2xl:!text-7xl 2xl:!text-left dark:text-light xl:!text-6xl lg:!text-center lg:!text-7xl md:!text-6xl sm:!text-4xl"
        />
        <h2 className="w-full text-3xl font-bold mt-2 text-left lg:text-center">{"Hi, I'm Jin"}</h2>
        <h3 className="w-full text-lx font-semibold text-left lg:text-center">
          Front-end Engineer
        </h3>
        <Link href="/contact" className="w-full lg:flex lg:items-center lg:justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
            className="bg-primary dark:bg-primaryDark text-light dark:text-dark rounded-xl font-bold mt-2 px-3 py-1"
          >
            Contact Me
          </motion.button>
        </Link>
      </div>
    </section>
  );
}
