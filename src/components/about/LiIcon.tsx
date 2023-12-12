'use client';
import { motion, useScroll } from 'framer-motion';

type Props = {
  reference: React.RefObject<HTMLLIElement>;
};

export default function LiIcon({ reference }: Props) {
  const { scrollYProgress } = useScroll({
    target: reference,
    offset: ['start end', 'end end'],
    layoutEffect: false,
  });

  return (
    <figure className="absolute left-0 stroke-dark dark:stroke-light">
      <svg
        className="-rotate-90 md:h-[60px] md:w-[60px] xs:h-[40px] xs:w-[40px]"
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
          className="fill-primary-500 animate-pulse stroke-1 dark:fill-primaryDark"
        />
      </svg>
    </figure>
  );
}
