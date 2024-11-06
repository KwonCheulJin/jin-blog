'use client';

import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';
import { FaCss3Alt, FaGithub, FaHtml5 } from 'react-icons/fa';
import {
  SiJavascript,
  SiNextdotjs,
  SiReact,
  SiStyledcomponents,
  SiTailwindcss,
  SiTypescript,
} from 'react-icons/si';
import Skill, { SkillType } from './Skill';

const skills: Array<Omit<SkillType, 'isInView'>> = [
  {
    name: 'HTML',
    x: '-25vw',
    y: '-5vw',
    children: (
      <div className="relative z-0 h-4 w-3 bg-white">
        <FaHtml5 className="absolute -left-[6px] -top-1 z-10 h-6 w-6 text-orange-500" />
      </div>
    ),
  },
  {
    name: 'CSS',
    x: '-15vw',
    y: '-10vw',
    children: (
      <div className="relative z-0 h-4 w-3 bg-white">
        <FaCss3Alt className="absolute -left-[6px] -top-1 h-6 w-6 text-blue-500" />
      </div>
    ),
  },
  {
    name: 'TailwindCSS',
    x: '-10vw',
    y: '-20vw',
    children: <SiTailwindcss className="h-6 w-6 text-[#38BDF8]" />,
  },
  {
    name: 'styled-components',
    x: '-5vw',
    y: '-15vw',
    children: <SiStyledcomponents className="h-6 w-6 text-[#DE83C3]" />,
  },
  {
    name: 'JavaScript',
    x: '-10vw',
    y: '16vw',
    children: (
      <div className="relative z-0 h-5 w-5 bg-black">
        <SiJavascript className="absolute -left-[2px] -top-[3px] h-6 w-6 text-[#EAD41C]" />
      </div>
    ),
  },
  {
    name: 'TypeScript',
    x: '-12vw',
    y: '20vw',
    children: (
      <div className="relative z-0 h-5 w-5 bg-white">
        <SiTypescript className="absolute -left-[2px] -top-[3px] h-6 w-6 text-[#3178C6]" />
      </div>
    ),
  },
  {
    name: 'React',
    x: '-22vw',
    y: '4vw',
    children: <SiReact className="h-6 w-6 text-[#61DAFB]" />,
  },
  {
    name: 'NextJS',
    x: '-15vw',
    y: '10vw',
    children: <SiNextdotjs className="h-6 w-6" />,
  },
  {
    name: 'Jest',
    x: '15vw',
    y: '15vw',
    children: (
      <Image
        className="h-6 w-6"
        src="/images/jest-icon.svg"
        alt="jest-icon"
        width={24}
        height={24}
      />
    ),
  },
  {
    name: 'Playwright',
    x: '20vw',
    y: '20vw',
    children: (
      <Image
        className="h-6 w-6"
        src="/images/playwright-logo.svg"
        alt="playwright-logo"
        width={24}
        height={24}
      />
    ),
  },
  {
    name: 'TanStack Query',
    x: '20vw',
    y: '-20vw',
    children: (
      <Image
        className="h-6 w-6"
        src="/images/tanstack-query-icon.png"
        alt="tanstack-query-icon"
        width={24}
        height={24}
      />
    ),
  },
  {
    name: 'GitHub',
    x: '25vw',
    y: '-5vw',
    children: <FaGithub className="h-6 w-6" />,
  },
];

export default function Skills() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false });
  return (
    <div ref={ref}>
      <h2 className="mt-32 w-full text-center text-8xl font-bold md:mt-32 md:text-6xl">
        Skills
      </h2>
      <div
        className="relative flex h-screen w-full items-center justify-center
      rounded-full bg-circularLight dark:bg-circularDark sm:h-[60vh] sm:bg-circularLightSm sm:dark:bg-circularDarkSm
      md:bg-circularLightMd md:dark:bg-circularDarkMd lg:h-[80vh] lg:bg-circularLightLg
      lg:dark:bg-circularDarkLg xs:h-[50vh] xs:bg-circularLightSm xs:dark:bg-circularDarkSm
      "
      >
        <motion.div
          className="flex cursor-pointer items-center justify-center rounded-full
          bg-dark p-8 font-semibold text-light shadow-dark dark:bg-light dark:text-dark lg:p-6 xs:p-2 xs:text-xs"
          whileHover={{ scale: 1.05 }}
        >
          WEB
        </motion.div>
        {skills.map(skill => (
          <Skill
            key={skill.name}
            name={skill.name}
            x={skill.x}
            y={skill.y}
            isInView={isInView}
          >
            {skill.children}
          </Skill>
        ))}
      </div>
    </div>
  );
}
