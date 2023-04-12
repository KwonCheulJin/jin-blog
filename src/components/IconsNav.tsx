'use client';

import { TwitterIcon, GithubIcon } from './Icons';
import { motion } from 'framer-motion';

export default function IconsNav() {
  return (
    <nav className="flex items-center justify-center flex-wrap">
      <motion.a
        href="https://twitter.com/Charles_kwon77"
        target="_blank"
        whileHover={{ y: -4 }}
        whileTap={{ scale: 0.9 }}
        className="w-6 mr-3"
      >
        <TwitterIcon className="" />
      </motion.a>
      <motion.a
        href="https://github.com/KwonCheulJin"
        target="_blank"
        whileHover={{ y: -4 }}
        whileTap={{ scale: 0.9 }}
        className="w-6 ml-3"
      >
        <GithubIcon />
      </motion.a>
    </nav>
  );
}
