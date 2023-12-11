'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { AiFillGithub, AiFillLinkedin, AiOutlineTwitter } from 'react-icons/ai';

export default function Footer() {
  return (
    <footer className="w-full text-lg font-medium dark:text-light sm:text-base">
      <div className="mt-16 flex flex-col items-center">
        <div className="mb-3 flex w-28 justify-between">
          <motion.a
            href="https://twitter.com/Charles_kwon77"
            aria-label="Go to Twitter"
            target="_blank"
            rel="noreferrer"
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.9 }}
            className="w-6 text-3xl"
          >
            <div className="flex h-7 w-7 items-center justify-center ">
              <AiOutlineTwitter className="text-sky-400" />
            </div>
          </motion.a>
          <motion.a
            href="https://github.com/KwonCheulJin"
            aria-label="Go to GitHub"
            target="_blank"
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.9 }}
            className="w-6 text-3xl"
          >
            <div className="flex h-7 w-7 items-center justify-center ">
              <AiFillGithub className="rounded-full bg-light dark:bg-dark" />
            </div>
          </motion.a>
          <motion.a
            href="https://www.linkedin.com/in/%EC%B2%A0%EC%A7%84-%EA%B6%8C-5b1308216/"
            aria-label="Go to Linkedin"
            target="_blank"
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.9 }}
            className="flex w-6 items-center justify-center text-3xl"
          >
            <div className="relative z-0 flex h-5 w-5 items-center justify-center bg-white">
              <AiFillLinkedin className="absolute text-sky-500" />
            </div>
          </motion.a>
        </div>
        <div className="mb-8 flex space-x-2 text-sm text-gray-500 dark:text-gray-400 sm:flex-col sm:items-center sm:justify-center">
          <div>Build with by JIN</div>
          <div className="sm:hidden">{` • `}</div>
          <div>{`© ${new Date().getFullYear()}`}</div>
          <div className="sm:hidden">{` • `}</div>
          <Link
            href="https://www.youtube.com/watch?v=Yw7yWHigGKI&list=WL&index=22"
            target="_blank"
            className="underline underline-offset-2"
          >
            Design by CodeBucks
          </Link>
          <div className="sm:hidden">{` • `}</div>
          <Link
            href="https://tailwind-nextjs-starter-blog.vercel.app/"
            target="_blank"
            className="underline underline-offset-2"
          >
            Next.js Starter Blog
          </Link>
        </div>
      </div>
    </footer>
  );
}
