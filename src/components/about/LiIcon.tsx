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
      <svg width="75" height="75" viewBox="0 0 100 100">
        <circle cx="75" cy="50" r="20" className="stoke-primary dark:stroke-primaryDark stroke-1 fill-none" />
        <motion.circle
          cx="75"
          cy="50"
          r="20"
          className="stroke-[5px] fill-light dark:fill-dark"
          style={{ pathLength: scrollYProgress }}
        />
        <circle cx="75" cy="50" r="10" className="animate-pulse stroke-1 fill-primary dark:fill-primaryDark" />
      </svg>
    </figure>
  );
}
