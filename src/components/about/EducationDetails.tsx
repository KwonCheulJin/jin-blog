'use client';

import { useRef } from 'react';
import LiIcon from './LiIcon';
import { motion } from 'framer-motion';

type Props = {
  type: string;
  time: string;
  place: string;
  info: string;
};
export default function Details({ type, time, place, info }: Props) {
  const ref = useRef<HTMLLIElement>(null);
  return (
    <li
      key={type}
      ref={ref}
      className="my-8 first:mt-0 last:mb-0 w-[60%] mx-auto flex flex-col items-start justify-between
      md:w-[80%]"
    >
      <LiIcon reference={ref} />
      <motion.div
        initial={{ y: 50 }}
        whileInView={{ y: 0 }}
        transition={{ duration: 0.5, type: 'spring' }}
      >
        <h3 className="capitalize font-bold text-2xl sm:text-xl xs:text-lg">{type}</h3>
        <span className="capitalize font-medium text-dark/75 dark:text-light/75 xs:text-sm">
          {time} | {place}
        </span>
        <p className="font-medium w-full md:text-sm">{info}</p>
      </motion.div>
    </li>
  );
}
