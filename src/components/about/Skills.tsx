'use client';

import { motion } from 'framer-motion';
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
        <Skill name="HTML" x="-25vw" y="-5vw" />
        <Skill name="CSS" x="-15vw" y="-10vw" />
        <Skill name="TailwindCSS" x="-10vw" y="-20vw" />
        <Skill name="JavaScript" x="20vw" y="6vw" />
        <Skill name="TypeScript" x="22vw" y="16vw" />
        <Skill name="React" x="-20vw" y="12vw" />
        <Skill name="NextJs" x="-13vw" y="18vw" />
        <Skill name="Git" x="25vw" y="-5vw" />
      </div>
    </>
  );
}
