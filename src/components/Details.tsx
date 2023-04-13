'use client';

import { useRef } from 'react';
import LiIcon from './LiIcon';
import { motion } from 'framer-motion';

type Props = {
  position: string;
  company: string;
  companyLink: string;
  time: string;
  address: string;
  work: string;
};
export default function Details({ position, company, companyLink, time, address, work }: Props) {
  const ref = useRef<HTMLLIElement>(null);
  return (
    <li
      ref={ref}
<<<<<<< HEAD
      className="my-8 first:mt-0 last:mb-0 w-[60%] mx-auto flex flex-col items-start justify-between"
=======
      className="my-8 first:mt-0 last:mb-0 w-[60%] mx-auto flex flex-col items-center justify-between"
>>>>>>> 71008eaebd6c692bfc75f00bf72328f60304875c
    >
      <LiIcon reference={ref} />
      <motion.div
        initial={{ y: 50 }}
        whileInView={{ y: 0 }}
        transition={{ duration: 0.5, type: 'spring' }}
      >
        <h3 className="capitalize font-bold text-2xl">
          {position}&nbsp;{' '}
          <a href={companyLink} target="_blank" className="text-primary capitalize">
            @{company}
          </a>
        </h3>
        <span className="capitalize font-medium text-dark/75 ">
          {time} | {address}
        </span>
        <p className="font-medium w-full">{work}</p>
      </motion.div>
    </li>
  );
}
