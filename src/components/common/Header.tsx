'use client';

import Logo from './Logo';
import CustomLink from './CustomLink';
import MobileNav from './MobileNav';
import IconsNav from './IconsNav';
import { useState } from 'react';

export default function Header() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <header className="relative z-10 flex w-full items-center justify-between py-10 font-medium dark:text-light lg:px-4">
      <button
        className="hidden flex-col items-center justify-center lg:flex"
        onClick={() => setIsOpen(prev => !prev)}
      >
        <span
          className={`block h-0.5 w-6 rounded-sm bg-dark transition-all duration-300 ease-out dark:bg-light ${
            isOpen ? 'translate-y-1 rotate-45' : '-translate-y-0.5'
          }`}
        ></span>
        <span
          className={`my-0.5 block h-0.5 w-6 rounded-sm bg-dark transition-all duration-300 ease-out dark:bg-light ${
            isOpen ? 'opacity-0' : 'opacity-100'
          }`}
        ></span>
        <span
          className={`block h-0.5 w-6 rounded-sm bg-dark transition-all duration-300 ease-out dark:bg-light ${
            isOpen ? '-translate-y-1 -rotate-45' : 'translate-y-0.5'
          }`}
        ></span>
      </button>

      <div className="flex w-full items-center justify-between lg:hidden">
        <nav>
          <CustomLink href="/" title="home" className="mr-4" />
          <CustomLink href="/about" title="About" className="mx-4" />
          <CustomLink href="/posts" title="Posts" className="mx-4" />
        </nav>
      </div>

      {isOpen ? <MobileNav setIsOpen={setIsOpen} /> : null}

      <div className="absolute left-[50%] top-6 translate-x-[-50%] lg:top-2">
        <Logo />
      </div>

      <IconsNav />
    </header>
  );
}
