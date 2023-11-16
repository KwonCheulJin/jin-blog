'use client';

import { Post } from '@/service/posts';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

type Props = {
  post: Post;
};

const FramerImage = motion(Image);

export default function FeaturedPost({
  post: { title, description, date, path, image },
}: Props) {
  return (
    <li className="relative col-span-1 w-full rounded-2xl border border-solid border-dark bg-light p-4 dark:border-light dark:bg-dark">
      <div
        className="absolute top-0 -right-4 -z-10 h-[103%] w-[102%] rounded-[2.25rem]
      rounded-br-3xl bg-dark dark:bg-light
      sm:h-[104%] sm:w-[103%] sm:rounded-[1.8rem]
      md:h-[104%] md:w-[102%] md:rounded-[1.8rem]
      lg:h-[104%] lg:w-[102%] lg:rounded-[2rem]
      xl:h-[105%] xl:w-[103%] xl:rounded-[2rem]
      xs:h-[105%] xs:w-[104.5%] xs:rounded-[1.8rem] "
      />
      <Link
        href={`/posts/${path}`}
        className="w-full cursor-pointer overflow-hidden rounded-lg"
      >
        <FramerImage
          className="w-full rounded-lg md:h-auto"
          whileHover={{ scale: 1.025 }}
          transition={{ duration: 0.2 }}
          src={`/images/posts/${image}.webp`}
          alt={title}
          width={300}
          height={200}
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
        />
      </Link>
      <Link href={`/posts/${path}`}>
        <h2 className="my-2 mt-4 truncate text-2xl font-bold capitalize hover:underline dark:text-light xs:text-lg">
          {title}
        </h2>
      </Link>
      <p className="mb-2 truncate text-sm dark:text-light">{description}</p>
      <time className="text-primary-500 font-semibold dark:text-primaryDark">
        {date.toLocaleString('ko-KR', {
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
          timeZone: 'UTC',
        })}
      </time>
    </li>
  );
}
