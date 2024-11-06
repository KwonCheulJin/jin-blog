'use client';

import { experiences } from '@/fixtures/experience';
import { motion, useScroll } from 'framer-motion';
import { useRef } from 'react';
import { v1 } from 'uuid';
import ExperienceDetails from './ExperienceDetails';

export default function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center start'],
    layoutEffect: false,
  });

  return (
    <div className="mb-16 mt-32 md:my-16">
      <h2 className="mb-32 w-full text-center text-8xl font-bold md:mb-16 md:text-6xl xs:text-4xl">
        Experience
      </h2>
      <div ref={ref} className="relative mx-auto w-[75%] md:w-full lg:w-[90%]">
        <motion.div
          style={{ scaleY: scrollYProgress }}
          className="absolute left-9 top-2 h-full w-[4px] origin-top bg-dark dark:bg-primaryDark dark:shadow-2xl md:left-[30px] md:w-[2px] xs:left-[20px]"
        />

        <ul className="ml-4 flex w-full flex-col items-start justify-between xs:ml-2">
          {experiences.map(experience => (
            <ExperienceDetails key={v1()} {...experience} />
          ))}
        </ul>
      </div>
    </div>
  );
}
