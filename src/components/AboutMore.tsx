'use client';

import Skills from '@/components/Skills';
import { useState } from 'react';
import CustomDiv from './CustomDiv';
import Experience from './Experience';

export default function AboutMore() {
  const [active, setActive] = useState<string>('Skills');
  return (
    <>
      {/* <nav className="w-full mt-32 flex items-center justify-between">
        <CustomDiv
          className="font-bold text-4xl cursor-pointer"
          title="Skills"
          active={active}
          onClick={() => setActive('Skills')}
        />
        <CustomDiv
          className="font-bold text-4xl cursor-pointer"
          title="Experience"
          active={active}
          onClick={() => setActive('Experience')}
        />
        <CustomDiv
          className="font-bold text-4xl cursor-pointer"
          title="Education"
          active={active}
          onClick={() => setActive('Education')}
        />
      </nav> */}
      <Skills />
      <Experience />
    </>
  );
}
