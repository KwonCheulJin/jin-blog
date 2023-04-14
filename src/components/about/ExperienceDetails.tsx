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
      className="my-8 first:mt-0 last:mb-0 w-[60%] mx-auto flex flex-col items-start justify-between
      md:w-[80%]"
    >
      <LiIcon reference={ref} />
      <motion.div
        initial={{ y: 50 }}
        whileInView={{ y: 0 }}
        transition={{ duration: 0.5, type: 'spring' }}
      >
        <div className="flex items-center justify-start md:flex-col md:items-start">
          <h3 className="capitalize font-bold text-2xl sm:text-xl xs:text-lg">{position}&nbsp;</h3>
          <a
            href={companyLink}
            target="_blank"
            className="text-primary dark:text-primaryDark capitalize font-bold text-2xl sm:text-xl xs:text-lg"
          >
            @{company}
          </a>
        </div>
        <span className="capitalize font-medium text-dark/75 dark:text-light/75 xs:text-sm">
          {time} | {address}
        </span>
        <p className="font-medium w-full md:text-sm">{work}</p>
      </motion.div>
    </li>
  );
}
