'use client';

import { AiFillGithub, AiOutlineTwitter } from 'react-icons/ai';
import { motion } from 'framer-motion';

export default function IconsNav() {
  return (
    <nav className="flex items-center justify-center flex-wrap">
      <div className="w-6 h-6 mr-3"></div>
      <div className="w-6 h-6 mx-3"></div>
      <div className="w-6 h-6 mx-3"></div>
      <motion.a
        href="https://github.com/KwonCheulJin"
        target="_blank"
        rel="noreferrer"
        whileHover={{ y: -4 }}
        whileTap={{ scale: 0.9 }}
        className="w-6 mx-3 text-3xl"
      >
        <AiOutlineTwitter className="text-sky-400" />
      </motion.a>
      <motion.a
        href="https://github.com/KwonCheulJin"
        target="_blank"
        whileHover={{ y: -4 }}
        whileTap={{ scale: 0.9 }}
        className="w-6 ml-3 text-3xl"
      >
        <AiFillGithub />
      </motion.a>
    </nav>
  );
}
