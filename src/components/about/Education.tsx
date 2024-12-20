'use client';

import { educations } from '@/fixtures/education';
import { motion, useScroll } from 'framer-motion';
import { useRef } from 'react';
import { v1 } from 'uuid';
import EducationDetails from './EducationDetails';

export default function Education() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center center'],
  });

  return (
    <div className="mb-16 mt-32">
      <h2 className="my-32 w-full text-center text-8xl font-bold md:mb-16 md:text-6xl xs:text-4xl">
        Education
      </h2>
      <div ref={ref} className="relative mx-auto w-[75%] md:w-full lg:w-[90%]">
        <motion.div
          className="absolute left-9 top-2 h-full w-[4px] origin-top rounded-full bg-dark dark:bg-primaryDark dark:shadow-2xl md:left-[30px] md:w-[2px] xs:left-[20px]"
          style={{ scaleY: scrollYProgress }}
        />

        <ul className="ml-4 flex w-full flex-col items-start justify-between xs:ml-2">
          {educations.map(education => (
            <EducationDetails
              key={v1()}
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
