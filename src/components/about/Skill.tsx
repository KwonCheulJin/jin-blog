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
      className="xd:font-bold absolute flex cursor-pointer items-center
      justify-center rounded-full bg-dark px-6 py-3 font-semibold text-light
      shadow-dark dark:bg-light dark:text-dark md:px-3
      md:py-1.5 md:text-sm lg:px-4 lg:py-2
      xs:bg-transparent xs:text-dark xs:dark:bg-transparent xs:dark:text-light"
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
