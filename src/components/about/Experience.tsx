'use client';

import { useRef } from 'react';
import { motion, useScroll } from 'framer-motion';
import ExperienceDetails from './ExperienceDetails';
import { experiences } from '@/fixtures/experience';
import { v1 } from 'uuid';

export default function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center start'],
    layoutEffect: false,
  });

  return (
    <div className="my-64 md:my-32">
      <h2 className="mb-32 w-full text-center text-8xl font-bold md:mb-16 md:text-6xl xs:text-4xl">
        Experience
      </h2>
      <div ref={ref} className="relative mx-auto w-[75%] md:w-full lg:w-[90%]">
        <motion.div
          style={{ scaleY: scrollYProgress }}
          className="absolute left-9 top-4 h-full w-[4px] origin-top bg-dark dark:bg-light md:left-[30px] md:w-[2px] xs:left-[20px]"
        />

        <ul className="ml-4 flex w-full flex-col items-start justify-between xs:ml-2">
          {experiences.map(experience => (
            <ExperienceDetails
              key={v1()}
              position={experience.position}
              company={experience.company}
              companyLink={experience.companyLink}
              time={experience.time}
              address={experience.address}
              work={experience.work}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
