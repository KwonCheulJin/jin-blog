import CustomMobileLink from './CustomMobileLink';
import IconsNav from './IconsNav';
import { motion } from 'framer-motion';

type Props = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function MobileNav({ setIsOpen }: Props) {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0, x: '-50%', y: '-50%' }}
      animate={{ scale: 1, opacity: 1 }}
      className="min-w-[70vw] flex flex-col justify-between items-center fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 bg-dark/90 dark:bg-light/75 rounded-lg backdrop-blur-md py-32"
    >
      <nav className="flex flex-col items-center justify-center">
        <CustomMobileLink href="/" title="home" className="" setIsOpen={setIsOpen} />
        <CustomMobileLink href="/about" title="About" className="" setIsOpen={setIsOpen} />
        <CustomMobileLink href="/posts" title="Posts" className="" setIsOpen={setIsOpen} />
        <CustomMobileLink href="/contact" title="Contact" className="" setIsOpen={setIsOpen} />
      </nav>

      <IconsNav />
    </motion.div>
  );
}
