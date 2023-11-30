'use client';

import { AiFillGithub, AiOutlineTwitter } from 'react-icons/ai';
import { BsMoonStarsFill, BsSunFill } from 'react-icons/bs';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import AuthButton from '@/components/auth/AuthButton';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

export default function IconsNav() {
  const { data: session } = useSession();

  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <nav className="flex flex-wrap items-center justify-center">
      {session && (
        <Link href="/write" className="mr-4">
          <Button
            className="rounded-3xl border-black dark:border-white"
            variant="outline"
          >
            새 글 작성
          </Button>
        </Link>
      )}
      <motion.a
        href="https://twitter.com/Charles_kwon77"
        aria-label="Go to Twitter"
        target="_blank"
        rel="noreferrer"
        whileHover={{ y: -4 }}
        whileTap={{ scale: 0.9 }}
        className="mr-3 w-6 text-3xl"
      >
        <AiOutlineTwitter className="text-sky-400" />
      </motion.a>
      <motion.a
        href="https://github.com/KwonCheulJin"
        aria-label="Go to GitHub"
        target="_blank"
        whileHover={{ y: -4 }}
        whileTap={{ scale: 0.9 }}
        className="mx-3 w-6 text-3xl"
      >
        <AiFillGithub className="rounded-full bg-light dark:bg-dark" />
      </motion.a>

      <button
        type="button"
        aria-label="toggleTheme"
        className="ml-3 w-6 rounded-full text-2xl"
        onClick={() =>
          setTheme(
            theme === 'dark' || resolvedTheme === 'dark' ? 'light' : 'dark',
          )
        }
      >
        {theme === 'dark' ? (
          <BsSunFill className="m-0 text-yellow-500" />
        ) : (
          <BsMoonStarsFill className="hover:text-gray-500" />
        )}
      </button>
      <AuthButton />
    </nav>
  );
}
