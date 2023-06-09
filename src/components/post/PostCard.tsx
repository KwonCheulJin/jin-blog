'use client';
import { motion } from 'framer-motion';
import { Post } from '@/service/posts';
import MovingImage from './MovingImage';

type Props = {
  post: Post;
};

export default function PostCard({ post: { title, date, path, image } }: Props) {
  return (
    <motion.li
      initial={{ y: 200 }}
      whileInView={{ y: 0, transition: { duration: 0.5, ease: 'easeInOut' } }}
      className="relative w-full px-4 py-6 my-4 rounded-xl flex items-center
      justify-between bg-light text-dark first:mt-0 border border-solid
      border-dark border-r-4 border-b-4 dark:bg-dark dark:text-light dark:border-light
      sm:flex-col sm:items-start"
    >
      <MovingImage title={title} path={path} image={image} />
      <time className="text-primary dark:text-primaryDark font-semibold pl-4 sm:self-start sm:pl-0 sm:pt-2 xs:text-sm">
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
