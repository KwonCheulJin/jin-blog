'use client';

import { useRef } from 'react';
import { motion, useScroll } from 'framer-motion';
import Details from './Details';

export default function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center start'],
  });

  return (
    <div className="my-64 h-full">
      <h2 className="font-bold text-8xl my-32 w-full text-center">Experience</h2>
      <div ref={ref} className="relative w-[75%] mx-auto">
        <motion.div
          style={{ scaleY: scrollYProgress }}
          className="absolute left-9 top-0 w-[4px] h-full bg-dark origin-top"
        />

        <ul className="w-full flex flex-col items-start justify-between ml-4">
          <Details
            position="Software Engineer"
            company="opstech"
            companyLink="www.reverschool.com"
            time="2022-present"
            address="Remote work"
            work="Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto, ipsa adipisci
              laboriosam velit sunt vel consequuntur, ad obcaecati voluptas facere eos animi.
              Assumenda sed ex animi eligendi amet id debitis!"
          />
          <Details
            position="Software Engineer"
            company="opstech"
            companyLink="www.reverschool.com"
            time="2022-present"
            address="Remote work"
            work="Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto, ipsa adipisci
              laboriosam velit sunt vel consequuntur, ad obcaecati voluptas facere eos animi.
              Assumenda sed ex animi eligendi amet id debitis!"
          />
          <Details
            position="Software Engineer"
            company="opstech"
            companyLink="www.reverschool.com"
            time="2022-present"
            address="Remote work"
            work="Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto, ipsa adipisci
              laboriosam velit sunt vel consequuntur, ad obcaecati voluptas facere eos animi.
              Assumenda sed ex animi eligendi amet id debitis!"
          />
          <Details
            position="Software Engineer"
            company="opstech"
            companyLink="www.reverschool.com"
            time="2022-present"
            address="Remote work"
            work="Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto, ipsa adipisci
              laboriosam velit sunt vel consequuntur, ad obcaecati voluptas facere eos animi.
              Assumenda sed ex animi eligendi amet id debitis!"
          />
          <Details
            position="Software Engineer"
            company="opstech"
            companyLink="www.reverschool.com"
            time="2022-present"
            address="Remote work"
            work="Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto, ipsa adipisci
              laboriosam velit sunt vel consequuntur, ad obcaecati voluptas facere eos animi.
              Assumenda sed ex animi eligendi amet id debitis!"
          />
          <Details
            position="Software Engineer"
            company="opstech"
            companyLink="www.reverschool.com"
            time="2022-present"
            address="Remote work"
            work="Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto, ipsa adipisci
              laboriosam velit sunt vel consequuntur, ad obcaecati voluptas facere eos animi.
              Assumenda sed ex animi eligendi amet id debitis!"
          />
        </ul>
      </div>
    </div>
  );
}
