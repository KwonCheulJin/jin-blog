'use client';

import { Post } from '@/service/posts';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

type Props = {
  post: Post;
};

const FramerImage = motion(Image);

export default function FeaturedPost({ post: { title, description, date, path } }: Props) {
  return (
    <li className="relative col-span-1 w-full p-4 bg-light border border-solid border-dark rounded-2xl dark:bg-dark dark:border-light">
      <div className="absolute top-0 -right-3 -z-10 w-[102%] h-[103%] rounded-[2rem] bg-dark rounded-br-3xl dark:bg-light" />
      <Link href={`/posts/${path}`} className="w-full cursor-pointer overflow-hidden rounded-lg">
        <FramerImage
          className="w-full rounded-lg"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
          src={`/images/posts/${path}.png`}
          alt={title}
          width={300}
          height={200}
        />
      </Link>
      <Link href={`/posts/${path}`}>
        <h2 className="capitalize text-2xl font-bold my-2 mt-4 hover:underline dark:text-light">
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
