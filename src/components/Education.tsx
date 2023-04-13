'use client';

import { useRef } from 'react';
import { motion, useScroll } from 'framer-motion';
import EducationDetails from './EducationDetails';

export default function Education() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center start'],
  });

  return (
    <div className="my-64">
      <h2 className="font-bold text-8xl my-32 w-full text-center">Education</h2>
      <div ref={ref} className="relative w-[75%] mx-auto">
        <motion.div
          style={{ scaleY: scrollYProgress }}
          className="absolute left-9 top-0 w-[4px] h-full bg-dark origin-top"
        />

        <ul className="w-full flex flex-col items-start justify-between ml-4">
          <EducationDetails
            type="구공팩토리"
            time="2021-2021"
            place="(주)흥미랩"
            info="90일 간의 코딩 프로젝트 프로그램(부트캠프)"
          />
          <EducationDetails
            type="스파르타 코딩클럽"
            time="2021-2021"
            place="팀스파르타(주)"
            info="온라인 개발 교육 플랫폼(웹개발 기본교육 수료)"
          />
        </ul>
      </div>
    </div>
  );
}
