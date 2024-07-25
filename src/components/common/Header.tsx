'use client';

import AnimateColorArrowWithText from '@/components/common/AnimateColorArrowWithText';
import HamburgerBar from '@/components/common/HamburgerBar';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import CustomLink from './CustomLink';
import IconsNav from './IconsNav';
import Logo from './Logo';
import MobileNav from './MobileNav';

export default function Header() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <header className="relative z-10 flex w-full items-center justify-between py-10 font-medium dark:text-light lg:px-4">
      <HamburgerBar isOpen={isOpen} setIsOpen={setIsOpen} />

      <div className="flex w-full items-center justify-between lg:hidden">
        <nav>
          <CustomLink href="/" title="home" className="mr-4" />
          <CustomLink href="/about" title="About" className="mx-4" />
          <CustomLink href="/posts" title="Posts" className="mx-4" />
        </nav>
      </div>

      {isOpen ? <MobileNav setIsOpen={setIsOpen} /> : null}

      <div className="absolute left-[50%] top-6 translate-x-[-50%] lg:top-2">
        <div className="relative">
          <Logo session={session} pathname={pathname} />
          {!session && pathname !== '/signin' && <AnimateColorArrowWithText />}
        </div>
      </div>

      <IconsNav />
    </header>
  );
}
