'use client';

import { motion } from 'framer-motion';

type Props = {
  children: React.ReactNode;
  name: string;
  x?: string;
  y?: string;
};
export default function Skill({ children, name, x, y }: Props) {
  return (
    <motion.div
      className="flex items-center justify-center rounded-full font-semibold
      bg-dark text-light py-3 px-6 shadow-dark cursor-pointer absolute
      dark:text-dark dark:bg-light lg:py-2 lg:px-4
      md:text-sm md:py-1.5 md:px-3 xs:bg-transparent
      xs:dark:bg-transparent xs:text-dark xs:dark:text-light xd:font-bold"
      whileHover={{ scale: 1.05 }}
      initial={{ x: 0, y: 0 }}
      whileInView={{ x, y, transition: { duration: 1.5 } }}
      transition={{ duration: 1.5 }}
      viewport={{ once: true }}
    >
      {children}
      <p className="ml-2">{name}</p>
    </motion.div>
  );
}
