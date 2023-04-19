'use client';

import { motion, useMotionValue } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';

type Props = {
  path: string;
  title: string;
  image: string;
};

const FramerImage = motion(Image);

export default function MovingImage({ path, title, image }: Props) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const imgRef = useRef<HTMLImageElement>(null);

  function handleMouse(e: React.MouseEvent<HTMLAnchorElement>) {
    if (imgRef.current) {
      imgRef.current.style.display = 'inline-block';
      x.set(e.pageX);
      y.set(-10);
    }
  }

  function handleMouseLeave(e: React.MouseEvent<HTMLAnchorElement>) {
    if (imgRef.current) {
      imgRef.current.style.display = 'none';
      x.set(0);
      y.set(0);
    }
  }

  return (
    <Link href={`/posts/${path}`} onMouseMove={handleMouse} onMouseLeave={handleMouseLeave}>
      <h2 className="capitalize text-xl font-semibold hover:underline">{title}</h2>
      <FramerImage
        ref={imgRef}
        style={{ x, y }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1, transition: { duration: 0.2 } }}
        className="z-30 w-96 h-auto hidden absolute rounded-lg md:!hidden"
        src={`/images/posts/${image}.png`}
        alt={title}
        width={300}
        height={200}
      />
    </Link>
  );
}
