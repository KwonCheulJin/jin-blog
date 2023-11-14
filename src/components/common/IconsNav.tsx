'use client';

import { AiFillGithub, AiOutlineTwitter } from 'react-icons/ai';
import { BsMoonStarsFill, BsSunFill } from 'react-icons/bs';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function IconsNav() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <nav className="flex items-center justify-center flex-wrap">
      <motion.a
        href="https://twitter.com/Charles_kwon77"
        aria-label="Go to Twitter"
        target="_blank"
        rel="noreferrer"
        whileHover={{ y: -4 }}
        whileTap={{ scale: 0.9 }}
        className="w-6 mr-3 text-3xl"
      >
        <AiOutlineTwitter className="text-sky-400" />
      </motion.a>
      <motion.a
        href="https://github.com/KwonCheulJin"
        aria-label="Go to GitHub"
        target="_blank"
        whileHover={{ y: -4 }}
        whileTap={{ scale: 0.9 }}
        className="w-6 mx-3 text-3xl"
      >
        <AiFillGithub className="bg-light dark:bg-dark rounded-full" />
      </motion.a>

      <button
        type="button"
        aria-label="toggleTheme"
        className="w-6 ml-3 text-2xl rounded-full"
        onClick={() => setTheme(theme === 'dark' || resolvedTheme === 'dark' ? 'light' : 'dark')}
      >
        {theme === 'dark' ? (
          <BsSunFill className="text-yellow-500 m-0" />
        ) : (
          <BsMoonStarsFill className="hover:text-gray-500" />
        )}
      </button>
    </nav>
  );
}
