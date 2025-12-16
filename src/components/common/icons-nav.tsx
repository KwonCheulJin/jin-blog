'use client';

import { Button } from '@/components/ui/button';
import { ThemeToggleButton } from '@/components/ui/theme-toggle-button';
import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

const MotionButton = motion.create(Button);

export default function IconsNav() {
  const { data: session } = useSession();

  return (
    <nav className="flex items-center justify-center">
      {session && session.user.type === 'HOST' && (
        <Link
          href="/write"
          className="mr-4 hidden lg:block"
          aria-label="새 글 작성하기"
        >
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

      <ThemeToggleButton className="ml-0 lg:ml-3" />
    </nav>
  );
}
