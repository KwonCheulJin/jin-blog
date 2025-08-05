'use client';
import AuthButton from '@/components/auth/AuthButton';
import { STORAGE_KEYS } from '@/constants/localStorage';
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

  const handleLogoClick = () => {
    localStorage.setItem(STORAGE_KEYS.LOGIN_TOOLTIP_SEEN, 'true');
    // 커스텀 이벤트 발생시켜 Header 컴포넌트에 알림
    window.dispatchEvent(new Event('logo-clicked'));
  };
  return (
    <div className="mt-2 flex flex-col items-center justify-center">
      <motion.div
        className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-solid border-transparent bg-dark text-2xl font-bold text-light dark:border-light cursor-pointer"
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
        onClick={handleLogoClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleLogoClick();
          }
        }}
        aria-label={session ? `${session.user.name} 프로필` : "로그인"}
      >
        {isVisible && pathname !== '/signin' ? (
          <div className="pointer-events-auto">
            <AuthButton />
          </div>
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
