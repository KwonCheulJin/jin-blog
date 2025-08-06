'use client';

import HamburgerBar from '@/components/common/HamburgerBar';
import { UnifiedAnimatedTooltip } from '@/components/common/UnifiedAnimatedTooltip';
import { STORAGE_KEYS } from '@/constants/localStorage';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import CustomLink from './CustomLink';
import IconsNav from './IconsNav';
import Logo from './Logo';
import MobileNav from './MobileNav';

export default function Header() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [showLoginTooltip, setShowLoginTooltip] = useState<boolean>(false);
  const [isClient, setIsClient] = useState<boolean>(false);

  // 클라이언트 사이드에서만 localStorage 확인
  useEffect(() => {
    setIsClient(true);
    const hasSeenTooltip = localStorage.getItem(
      STORAGE_KEYS.LOGIN_TOOLTIP_SEEN,
    );
    setShowLoginTooltip(!hasSeenTooltip);
  }, []);

  // Logo 클릭 시 tooltip 숨김 이벤트 리스너
  useEffect(() => {
    const handleLogoClick = () => {
      setShowLoginTooltip(false);
    };

    // 커스텀 이벤트 리스너 등록
    window.addEventListener('logo-clicked', handleLogoClick);

    return () => {
      window.removeEventListener('logo-clicked', handleLogoClick);
    };
  }, []);

  return (
    <header className="relative z-10 flex w-full items-center justify-between px-4 py-10 font-medium dark:text-light">
      <HamburgerBar isOpen={isOpen} setIsOpen={setIsOpen} />

      <div className="hidden w-full items-center justify-between lg:flex">
        <nav>
          <CustomLink href="/" title="home" className="mr-4" />
          <CustomLink href="/about" title="About" className="mx-4" />
          <CustomLink href="/posts" title="Posts" className="mx-4" />
          <CustomLink href="/leetcode" title="LeetCode" className="mx-4" />
        </nav>
      </div>

      {isOpen ? <MobileNav setIsOpen={setIsOpen} /> : null}

      <div className="absolute left-[50%] top-2 translate-x-[-50%] lg:top-6">
        <div className="relative">
          <Logo session={session} pathname={pathname} />
          {!session &&
            pathname !== '/signin' &&
            isClient &&
            showLoginTooltip && (
              <UnifiedAnimatedTooltip
                text="여기를 눌러보세요!"
                show={true}
                position="bottom"
                arrowDegree={-90}
                localStorageKey={STORAGE_KEYS.LOGIN_TOOLTIP_SEEN}
                onTooltipClick={() => setShowLoginTooltip(false)}
              />
            )}
        </div>
      </div>

      <IconsNav />
    </header>
  );
}
