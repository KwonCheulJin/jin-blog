'use client';
import AuthButton from '@/components/auth/AuthButton';
import { motion } from 'framer-motion';
import { Session } from 'next-auth';
import Image from 'next/image';
import { useState } from 'react';

type Props = {
  session: Session | null;
  pathname: string;
};
export default function Logo({ session, pathname }: Props) {
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
        {isVisible && pathname !== '/signin' ? (
          <AuthButton />
        ) : session ? (
          <Image
            width={64}
            height={64}
            alt={session.user.name}
            src={session.user.image}
            className="rounded-full"
          />
        ) : (
          <div className="flex h-16 w-16 items-center justify-center rounded-full pt-1">
            <p>DEV</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
