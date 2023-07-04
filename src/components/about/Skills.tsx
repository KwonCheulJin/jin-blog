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
      <h2 className="font-bold text-8xl mt-32 w-full text-center md:text-6xl md:mt-32">Skills</h2>
      <div
        className="w-full h-screen relative flex items-center justify-center
      rounded-full bg-circularLight dark:bg-circularDark lg:h-[80vh] sm:h-[60vh] xs:h-[50vh]
      lg:bg-circularLightLg lg:dark:bg-circularDarkLg md:bg-circularLightMd md:dark:bg-circularDarkMd
      sm:bg-circularLightSm sm:dark:bg-circularDarkSm
      "
      >
        <motion.div
          className="flex items-center justify-center rounded-full font-semibold
          bg-dark text-light p-8 shadow-dark cursor-pointer dark:text-dark dark:bg-light lg:p-6 xs:text-xs xs:p-2"
          whileHover={{ scale: 1.05 }}
        >
          WEB
        </motion.div>
        <Skill name="HTML" x="-25vw" y="-5vw">
          <div className="relative w-3 h-4 bg-white z-0">
            <FaHtml5 className="absolute -top-1 -left-[6px] w-6 h-6 text-orange-500 z-10" />
          </div>
        </Skill>
        <Skill name="CSS" x="-15vw" y="-10vw">
          <div className="relative w-3 h-4 bg-white z-0">
            <FaCss3Alt className="absolute -top-1 -left-[6px] w-6 h-6 text-blue-500" />
          </div>
        </Skill>
        <Skill name="TailwindCSS" x="-10vw" y="-20vw">
          <SiTailwindcss className="w-6 h-6 text-[#38BDF8]" />
        </Skill>
        <Skill name="styled-components" x="-5vw" y="-15vw">
          <SiStyledcomponents className="w-6 h-6 text-[#DE83C3]" />
        </Skill>
        <Skill name="JavaScript" x="20vw" y="6vw">
          <div className="relative w-5 h-5 bg-black z-0">
            <SiJavascript className="absolute -top-[3px] -left-[2px] w-6 h-6 text-[#EAD41C]" />
          </div>
        </Skill>
        <Skill name="TypeScript" x="22vw" y="16vw">
          <div className="relative w-5 h-5 bg-white z-0">
            <SiTypescript className="absolute -top-[3px] -left-[2px] w-6 h-6 text-[#3178C6]" />
          </div>
        </Skill>
        <Skill name="React" x="-20vw" y="12vw">
          <SiReact className="w-6 h-6 text-[#61DAFB]" />
        </Skill>
        <Skill name="NextJs" x="-13vw" y="18vw">
          <SiNextdotjs className="w-6 h-6" />
        </Skill>
        <Skill name="GitHub" x="25vw" y="-5vw">
          <FaGithub className="w-6 h-6" />
        </Skill>
      </div>
    </>
  );
}
