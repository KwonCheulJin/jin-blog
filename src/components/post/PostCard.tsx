'use client';
import { motion } from 'framer-motion';
import { Post } from '@/service/posts';
import MovingImage from './MovingImage';

type Props = {
  post: Post;
};

export default function PostCard({
  post: { title, date, path, image },
}: Props) {
  return (
    <motion.li
      initial={{ y: 200 }}
      whileInView={{ y: 0, transition: { duration: 0.5, ease: 'easeInOut' } }}
      className="relative my-4 flex w-full items-center justify-between rounded-xl border
      border-r-4 border-b-4 border-solid border-dark bg-light px-4
      py-6 text-dark first:mt-0 dark:border-light dark:bg-dark dark:text-light
      sm:flex-col sm:items-start"
    >
      <MovingImage title={title} path={path} image={image} />
      <time className="text-primary-500 pl-4 font-semibold dark:text-primaryDark sm:self-start sm:pl-0 sm:pt-2 xs:text-sm">
        {date.toLocaleString('ko-KR', {
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
          timeZone: 'UTC',
        })}
      </time>
    </motion.li>
  );
}
