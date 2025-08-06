'use client';

import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';

export type SkillType = {
  children: React.ReactNode;
  name: string;
  x?: string;
  y?: string;
  isInView: boolean;
};
export default function Skill({ children, name, x, y, isInView }: SkillType) {
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start({ x, y, transition: { duration: 1.5 } });
    } else {
      controls.start({ x: 0, y: 0, transition: { duration: 1.5 } });
    }
  }, [isInView, controls, x, y]);
  return (
    <motion.div
      className="absolute flex cursor-pointer items-center justify-center rounded-full bg-transparent px-6 py-3 font-semibold text-dark shadow-dark dark:text-light md:px-3 md:py-1.5 md:text-sm md:font-bold md:text-light md:dark:bg-light md:dark:text-dark lg:bg-dark lg:px-4 lg:py-2"
      whileHover={{ scale: 1.05 }}
      initial={{ x: 0, y: 0 }}
      animate={controls}
      transition={{ duration: 1.5 }}
    >
      {children}
      <p className="ml-2">{name}</p>
    </motion.div>
  );
}
