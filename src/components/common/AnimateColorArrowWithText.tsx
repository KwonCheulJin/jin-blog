import { motion } from 'framer-motion';
import { FaLocationArrow } from 'react-icons/fa';

export default function AnimateColorArrowWithText() {
  return (
    <motion.div
      className="absolute left-[55%] z-50"
      animate={{
        transform: 'translateY(15px)',
      }}
      transition={{
        duration: 1,
        repeat: Infinity,
        repeatType: 'mirror',
      }}
    >
      <motion.div
        className="bg-none"
        animate={{
          color: [
            '#121212',
            'rgba(131,58,180,1)',
            'rgba(253,29,29,1)',
            'rgba(252,176,69,1)',
            'rgba(131,58,180,1)',
            '#121212',
          ],
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
        }}
      >
        <FaLocationArrow className="h-4 w-4 -rotate-90" />
      </motion.div>
      <motion.p
        className="text-wrap ml-4 mt-1 w-[8.25rem] rounded-md border px-3 py-1.5 text-sm text-white"
        animate={{
          backgroundColor: [
            '#121212',
            'rgba(131,58,180,1)',
            'rgba(253,29,29,1)',
            'rgba(252,176,69,1)',
            'rgba(131,58,180,1)',
            '#121212',
          ],
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
        }}
      >
        여기를 눌러보세요!
      </motion.p>
    </motion.div>
  );
}
