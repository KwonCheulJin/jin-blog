'use client';
import { motion } from 'framer-motion';
import AuthButton from '@/components/auth/AuthButton';
import { useState } from 'react';
import { useSession } from 'next-auth/react';

export default function Logo() {
  const { data: session } = useSession();
  const [isVisible, setIsVisible] = useState(false);
  return (
    <div className="mt-2 flex flex-col items-center justify-center">
      <motion.div
        className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-solid border-transparent bg-dark text-2xl font-bold text-light dark:border-light"
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
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        {isVisible ? (
          <AuthButton />
        ) : (
          <p>
            {session?.user
              ? session?.user.name?.slice(0, 1).toUpperCase()
              : 'DEV'}
          </p>
        )}
      </motion.div>
    </div>
  );
}
