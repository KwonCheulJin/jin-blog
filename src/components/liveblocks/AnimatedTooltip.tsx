import { motion } from 'framer-motion';
import { FaLocationArrow } from 'react-icons/fa';

type Props = {
  text: string;
  show: boolean;
  deg?: string;
};

export function AnimatedTooltip({ text, show, deg }: Props) {
  if (!show) {
    return null;
  }

  return (
    <motion.div className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-2">
      <div className="flex items-center gap-2">
        {/* 화살표 */}
        <motion.div
          animate={{
            color: [
              '#6366f1', // indigo-500
              '#8b5cf6', // violet-500
              '#ec4899', // pink-500
              '#f59e0b', // amber-500
              '#6366f1',
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <FaLocationArrow
            className="h-3 w-3"
            style={{
              transform: `rotate(${deg}deg)`,
            }}
          />
        </motion.div>

        {/* 텍스트 박스 */}
        <motion.div
          className="whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium text-white shadow-lg"
          animate={{
            backgroundColor: [
              '#6366f1', // indigo-500
              '#8b5cf6', // violet-500
              '#ec4899', // pink-500
              '#f59e0b', // amber-500
              '#6366f1',
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {text}
        </motion.div>
      </div>
    </motion.div>
  );
}
