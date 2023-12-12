'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const quote = {
  initial: {
    opacity: 1,
  },
  animate: {
    opacity: 1,
    transition: {
      delay: 0.5,
      staggerChildren: 0.08,
    },
  },
};

const singleWord = {
  initial: {
    opacity: 0,
    y: 50,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
    },
  },
};

type Props = {
  text: string;
  className?: string;
};

export default function AnimatedText({ text, className }: Props) {
  return (
    <div className="mx-auto flex w-full items-center justify-center overflow-hidden py-2 text-center sm:py-0">
      <motion.h1
        className={cn(
          'w-full text-left text-7xl font-bold capitalize text-dark dark:text-light sm:text-4xl lg:text-center lg:text-5xl xs:text-4xl',
          className,
        )}
        variants={quote}
        initial="initial"
        animate="animate"
      >
        {text.split(' ').map((word, index) => (
          <motion.span
            key={`${word}-${index}`}
            className="inline-block"
            variants={singleWord}
          >
            {word}&nbsp;
          </motion.span>
        ))}
      </motion.h1>
    </div>
  );
}
