'use client';

import { Experience } from '@/types';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRef } from 'react';
import LiIcon from './LiIcon';

export default function ExperienceDetail({
  position,
  company,
  companyLink,
  time,
  address,
  work,
  projects,
}: Experience) {
  const ref = useRef<HTMLLIElement>(null);
  return (
    <li
      ref={ref}
      className="mx-auto my-8 flex w-[60%] flex-col items-start justify-between first:mt-0 last:mb-0
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
            className="text-2xl font-bold capitalize text-primary-500 dark:text-primaryDark sm:text-xl xs:text-lg"
          >
            @{company}
          </Link>
        </div>
        <span className="font-medium capitalize text-dark/75 dark:text-light/75 xs:text-sm">
          {time} | {address}
        </span>
        <p className="w-full font-medium md:text-sm">{work}</p>
        {projects && (
          <ul className="space-y-2">
            {projects.map(project => (
              <li key={project.title}>
                <p className="w-full font-bold md:text-sm">{project.title}</p>
                <ul>
                  {project.description.map(desc => (
                    <li key={desc.slice(0, 3)} className="ml-4 list-disc">
                      <p className="w-full font-medium md:text-sm">{desc}</p>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        )}
      </motion.div>
    </li>
  );
}
