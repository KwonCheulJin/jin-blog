'use client';

import { useRef } from 'react';
import { motion, useScroll } from 'framer-motion';
import ExperienceDetails from './ExperienceDetails';

export default function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center start'],
  });

  return (
    <div className="my-64">
      <h2 className="font-bold text-8xl mb-32 w-full text-center">Experience</h2>
      <div ref={ref} className="w-[75%] mx-auto relative">
        <motion.div
          style={{ scaleY: scrollYProgress }}
          className="absolute left-9 top-0 w-[4px] h-full bg-dark origin-top dark:bg-light"
        />

        <ul className="w-full flex flex-col items-start justify-between ml-4">
          <ExperienceDetails
            position="Software Engineer"
            company="opstech"
            companyLink="www.reverschool.com"
            time="2022-present"
            address="Remote work"
            work="리버스쿨(보안 교육 플랫폼)에서 프론트엔드를 맡아서 개발하고 있습니다."
          />
          <ExperienceDetails
            position="Software Engineer"
            company="프리픽스"
            companyLink=""
            time="2021-2022"
            address="교보문고 파견"
            work="교보문고 VCMS(Saas) 개발에 참여하였습니다."
          />
        </ul>
      </div>
    </div>
  );
}
