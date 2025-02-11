'use client';

import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { BsMoonStarsFill, BsSunFill } from 'react-icons/bs';

const MotionButton = motion.create(Button);
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
    <nav className="flex items-center justify-center">
      {session && session.user.type === 'HOST' && (
        <Link href="/write" className="mr-4 lg:hidden">
          <MotionButton
            className="rounded-3xl border-black bg-black text-white hover:text-white dark:border-white"
            variant="outline"
            whileHover={{
              backgroundColor: [
                '#121212',
                'rgba(131,58,180,1)',
                'rgba(253,29,29,1)',
                'rgba(252,176,69,1)',
                'rgba(131,58,180,1)',
                '#121212',
              ],
              transition: { duration: 1, repeat: Infinity },
            }}
          >
            새 글 작성
          </MotionButton>
        </Link>
      )}

      <button
        type="button"
        aria-label="toggleTheme"
        className="ml-3 w-6 rounded-full text-2xl lg:ml-0"
        onClick={() =>
          setTheme(
            theme === 'dark' || resolvedTheme === 'dark' ? 'light' : 'dark',
          )
        }
      >
        {theme === 'dark' || resolvedTheme === 'dark' ? (
          <BsSunFill className="m-0 text-yellow-500" />
        ) : (
          <BsMoonStarsFill className="hover:text-gray-500" />
        )}
      </button>
    </nav>
  );
}
