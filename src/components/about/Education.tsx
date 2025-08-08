'use client';

import { educations } from '@/fixtures/education';
import { motion, useScroll } from 'framer-motion';
import { useRef } from 'react';
import EducationDetails from './EducationDetails';

export default function Education() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center start'],
  });

  return (
    <div className="my-8 md:my-16 lg:mb-16 lg:mt-24">
      <h2 className="mb-16 w-full text-center text-4xl font-bold md:text-5xl lg:mb-32 lg:text-7xl">
        Education
      </h2>
      <div
        ref={ref}
        className="relative mx-2 w-full md:mx-auto md:w-[90%] lg:w-[75%]"
      >
        <motion.div
          className="absolute left-[18px] top-4 h-full w-[4px] origin-top bg-dark dark:bg-primaryDark dark:shadow-2xl lg:left-[28px]"
          style={{ scaleY: scrollYProgress }}
        />

        <ul className="ml-4 flex w-full flex-col items-start justify-between">
          {educations.map(education => (
            <EducationDetails
              key={education.type}
              type={education.type}
              time={education.time}
              place={education.place}
              info={education.info}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
