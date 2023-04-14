import Image from 'next/image';
import Link from 'next/link';
import AnimatedText from '@/components/common/AnimatedText';

export default function Hero() {
  return (
    <section className="flex items-center justify-between w-full dark:text-light">
      <div className="w-[49%] pr-16">
        <Image
          className="rounded-full w-full h-auto"
          src="/images/my-profile.png"
          alt="my-profile"
          width={250}
          height={250}
        />
      </div>
      <div className="w-[49%] flex flex-col items-center self-center">
        <AnimatedText
          text="growing into a developer who can help someone."
          className="!text-7xl !text-left dark:text-light"
        />
        <h2 className="w-full text-3xl font-bold mt-2 text-left">{"Hi, I'm Jin"}</h2>
        <h3 className="w-full text-lx font-semibold text-left">Front-end Engineer</h3>
        <Link href="/contact" className="w-full">
          <button className="bg-yellow-500 rounded-xl font-bold mt-2 px-3 py-1">Contact Me</button>
        </Link>
      </div>
    </section>
  );
}
