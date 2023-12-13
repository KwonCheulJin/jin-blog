import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
type Props = {
  message: string;
};
const MotionImage = motion(Image);
export default function Error({ message }: Props) {
  return (
    <div className="flex w-4/5 items-center justify-between gap-10 dark:text-light  lg:flex-col lg:justify-center xl:w-full">
      <div className="flex flex-col items-center justify-center">
        <p className="text-3xl sm:text-2xl">{message}</p>
        <Link
          href="/"
          className="mt-8 inline-block rounded-3xl bg-primary-500 px-5 py-2 text-xl hover:bg-accent"
        >
          홈으로
        </Link>
      </div>
      <div>
        <MotionImage
          src="/images/ghost.png"
          alt="ghost"
          width={250}
          height={250}
          priority
          animate={{ transform: 'translateY(15px)' }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: 'mirror',
          }}
        />
        <motion.div
          className="m-auto h-6 w-32 rounded-[50%] bg-gray-700/50 blur"
          initial={{ transform: 'scale(1, 1)' }}
          animate={{ transform: 'scale(0.85, 0.85)' }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: 'mirror',
          }}
        />
      </div>
    </div>
  );
}
