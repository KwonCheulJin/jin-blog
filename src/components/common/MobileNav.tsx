import { motion } from 'framer-motion';
import CustomMobileLink from './CustomMobileLink';

type Props = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function MobileNav({ setIsOpen }: Props) {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0, x: '-50%', y: '-50%' }}
      animate={{ scale: 1, opacity: 1 }}
      className="fixed left-1/2 top-1/2 z-30 flex min-w-[70vw] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-between rounded-lg bg-dark/90 py-32 backdrop-blur-md dark:bg-light/75"
    >
      <nav
        className="flex flex-col items-center justify-center"
        role="navigation"
        aria-label="모바일 메인 메뉴"
      >
        <CustomMobileLink
          href="/"
          title="home"
          className=""
          setIsOpen={setIsOpen}
        />
        <CustomMobileLink
          href="/about"
          title="About"
          className=""
          setIsOpen={setIsOpen}
        />
        <CustomMobileLink
          href="/posts"
          title="Posts"
          className=""
          setIsOpen={setIsOpen}
        />
        <CustomMobileLink
          href="/leetcode"
          title="LeetCode"
          className=""
          setIsOpen={setIsOpen}
        />
      </nav>
    </motion.div>
  );
}
