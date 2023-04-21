'use client';

import { Post } from '@/service/posts';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

type Props = {
  post: Post;
};

const FramerImage = motion(Image);

export default function FeaturedPost({ post: { title, description, date, path, image } }: Props) {
  return (
    <li className="relative col-span-1 w-full p-4 bg-light border border-solid border-dark rounded-2xl dark:bg-dark dark:border-light">
      <div
        className="absolute top-0 -z-10 -right-4 w-[102%] h-[103%] rounded-[2.25rem]
      xl:w-[103%] xl:h-[105%] xl:rounded-[2rem]
      lg:w-[102%] lg:h-[104%] lg:rounded-[2rem]
      md:w-[102%] md:h-[104%] md:rounded-[1.8rem]
      sm:w-[103%] sm:h-[104%] sm:rounded-[1.8rem]
      xs:w-[104.5%] xs:h-[105%] xs:rounded-[1.8rem]
      bg-dark rounded-br-3xl dark:bg-light "
      />
      <Link href={`/posts/${path}`} className="w-full cursor-pointer overflow-hidden rounded-lg">
        <FramerImage
          className="w-full rounded-lg md:h-auto"
          whileHover={{ scale: 1.025 }}
          transition={{ duration: 0.2 }}
          src={`/images/posts/${image}.png`}
          alt={title}
          width={300}
          height={200}
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
        />
      </Link>
      <Link href={`/posts/${path}`}>
        <h2 className="capitalize text-2xl font-bold my-2 mt-4 hover:underline dark:text-light xs:text-lg">
          {title}
        </h2>
      </Link>
      <p className="text-sm mb-2 dark:text-light">{description}</p>
      <time className="text-primary dark:text-primaryDark font-semibold">
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
