'use client';

import { motion } from 'framer-motion';
import { FaHtml5, FaCss3Alt, FaGithub } from 'react-icons/fa';
import {
  SiTailwindcss,
  SiTypescript,
  SiJavascript,
  SiReact,
  SiNextdotjs,
  SiStyledcomponents,
} from 'react-icons/si';
import Skill from './Skill';

export default function Skills() {
  return (
    <>
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
        <Skill name="HTML" x="-25vw" y="-5vw">
          <div className="relative z-0 h-4 w-3 bg-white">
            <FaHtml5 className="absolute -left-[6px] -top-1 z-10 h-6 w-6 text-orange-500" />
          </div>
        </Skill>
        <Skill name="CSS" x="-15vw" y="-10vw">
          <div className="relative z-0 h-4 w-3 bg-white">
            <FaCss3Alt className="absolute -left-[6px] -top-1 h-6 w-6 text-blue-500" />
          </div>
        </Skill>
        <Skill name="TailwindCSS" x="-10vw" y="-20vw">
          <SiTailwindcss className="h-6 w-6 text-[#38BDF8]" />
        </Skill>
        <Skill name="styled-components" x="-5vw" y="-15vw">
          <SiStyledcomponents className="h-6 w-6 text-[#DE83C3]" />
        </Skill>
        <Skill name="JavaScript" x="20vw" y="6vw">
          <div className="relative z-0 h-5 w-5 bg-black">
            <SiJavascript className="absolute -left-[2px] -top-[3px] h-6 w-6 text-[#EAD41C]" />
          </div>
        </Skill>
        <Skill name="TypeScript" x="22vw" y="16vw">
          <div className="relative z-0 h-5 w-5 bg-white">
            <SiTypescript className="absolute -left-[2px] -top-[3px] h-6 w-6 text-[#3178C6]" />
          </div>
        </Skill>
        <Skill name="React" x="-20vw" y="12vw">
          <SiReact className="h-6 w-6 text-[#61DAFB]" />
        </Skill>
        <Skill name="NextJs" x="-13vw" y="18vw">
          <SiNextdotjs className="h-6 w-6" />
        </Skill>
        <Skill name="GitHub" x="25vw" y="-5vw">
          <FaGithub className="h-6 w-6" />
        </Skill>
      </div>
    </>
  );
}
