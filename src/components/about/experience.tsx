'use client';

import { experiences } from '@/fixtures/experience';
import { motion, useScroll } from 'framer-motion';
import { useRef } from 'react';

import ExperienceDetails from './experience-details';

export default function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center start'],
  });

  return (
    <div className="my-8 md:my-16 lg:mt-24 lg:mb-16">
      <h2 className="mb-16 w-full text-center text-4xl font-bold md:text-5xl lg:mb-32 lg:text-7xl">
        Experience
      </h2>
      <div
        ref={ref}
        className="relative mx-2 w-full md:mx-auto md:w-[90%] lg:w-[75%]"
      >
        <motion.div
          style={{ scaleY: scrollYProgress }}
          className="bg-dark dark:bg-primaryDark absolute top-4 left-[18px] h-full w-[4px] origin-top lg:left-[28px] dark:shadow-2xl"
        />

        <ul className="ml-4 flex w-full flex-col items-start justify-between">
          {experiences.map(experience => (
            <ExperienceDetails
              key={`${experience.company}-${experience.time}`}
              {...experience}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
