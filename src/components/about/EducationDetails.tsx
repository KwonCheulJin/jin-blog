'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';
import LiIcon from './LiIcon';

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
      ref={ref}
      className="mx-auto my-8 flex w-[70%] flex-col items-start justify-between first:mt-0 last:mb-0 md:w-[80%]"
    >
      <LiIcon reference={ref} />
      <motion.div
        initial={{ y: 50 }}
        whileInView={{ y: 0 }}
        transition={{ duration: 0.5, type: 'spring' }}
      >
        <h3 className="text-lg font-bold capitalize md:text-xl lg:text-2xl">
          {type}
        </h3>
        <span className="text-sm font-medium capitalize text-dark/75 dark:text-light/75 md:text-base">
          {time} | {place}
        </span>
        <p className="w-full text-sm font-medium md:text-base">{info}</p>
      </motion.div>
    </li>
  );
}
