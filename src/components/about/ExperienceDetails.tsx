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
      className="mx-auto my-8 flex w-[80%] flex-col items-start justify-between first:mt-0 last:mb-0"
    >
      <LiIcon reference={ref} />
      <motion.div
        initial={{ y: 50 }}
        whileInView={{ y: 0 }}
        transition={{ duration: 0.5, type: 'spring' }}
      >
        <div className="flex items-center justify-start">
          <h3 className="text-lg font-bold capitalize md:text-xl lg:text-2xl">
            {position}&nbsp;
          </h3>
          <Link
            href={companyLink}
            target="_blank"
            className="text-lg font-bold capitalize text-primary-500 dark:text-primaryDark md:text-xl lg:text-2xl"
          >
            @{company}
          </Link>
        </div>
        <span className="text-sm font-medium capitalize text-dark/75 dark:text-light/75 md:text-base">
          {time} | {address}
        </span>
        <p className="w-full text-sm font-medium md:text-base">{work}</p>
        {projects && (
          <ul className="space-y-2">
            {projects.map(project => (
              <li key={project.title}>
                <p className="w-full text-base font-bold md:text-lg">
                  {project.title}
                </p>
                <ul>
                  {project.description.map(desc => (
                    <li key={desc.slice(0, 3)} className="ml-8 list-disc">
                      <p className="w-full text-sm font-medium md:text-base">
                        {desc}
                      </p>
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
