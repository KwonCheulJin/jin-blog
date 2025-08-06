'use client';
import { motion, useScroll } from 'framer-motion';

type Props = {
  reference: React.RefObject<HTMLLIElement | null>;
};

export default function LiIcon({ reference }: Props) {
  const { scrollYProgress } = useScroll({
    target: reference,
    offset: ['start end', 'end end'],
  });

  return (
    <figure className="absolute left-0 stroke-dark dark:stroke-light">
      <svg
        className="h-[40px] w-[40px] -rotate-90 lg:h-[60px] lg:w-[60px]"
        width="75"
        height="75"
        viewBox="0 0 100 100"
      >
        <circle
          cx="75"
          cy="50"
          r="20"
          className="stoke-primary-500 fill-none stroke-1 dark:stroke-primaryDark"
        />
        <motion.circle
          cx="75"
          cy="50"
          r="20"
          className="fill-light stroke-[5px] dark:fill-dark"
          style={{ pathLength: scrollYProgress }}
        />
        <circle
          cx="75"
          cy="50"
          r="10"
          className="animate-pulse fill-primary-500 stroke-1 dark:fill-primaryDark"
        />
      </svg>
    </figure>
  );
}
