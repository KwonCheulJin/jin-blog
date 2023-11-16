'use client';

import { useRef } from 'react';
import LiIcon from './LiIcon';
import { motion } from 'framer-motion';
import Link from 'next/link';

type Props = {
  position: string;
  company: string;
  companyLink: string;
  time: string;
  address: string;
  work: string;
};
export default function ExperienceDetail({
  position,
  company,
  companyLink,
  time,
  address,
  work,
}: Props) {
  const ref = useRef<HTMLLIElement>(null);
  return (
    <li
      ref={ref}
      className="my-8 mx-auto flex w-[60%] flex-col items-start justify-between first:mt-0 last:mb-0
      md:w-[80%]"
    >
      <LiIcon reference={ref} />
      <motion.div
        initial={{ y: 50 }}
        whileInView={{ y: 0 }}
        transition={{ duration: 0.5, type: 'spring' }}
      >
        <div className="flex items-center justify-start md:flex-col md:items-start">
          <h3 className="text-2xl font-bold capitalize sm:text-xl xs:text-lg">
            {position}&nbsp;
          </h3>
          <Link
            href={companyLink}
            target="_blank"
            className="text-primary-500 text-2xl font-bold capitalize dark:text-primaryDark sm:text-xl xs:text-lg"
          >
            @{company}
          </Link>
        </div>
        <span className="font-medium capitalize text-dark/75 dark:text-light/75 xs:text-sm">
          {time} | {address}
        </span>
        <p className="w-full font-medium md:text-sm">{work}</p>
      </motion.div>
    </li>
  );
}
