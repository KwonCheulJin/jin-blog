import { motion } from 'framer-motion';
import { FaLocationArrow } from 'react-icons/fa';

type Props = {
  text: string;
  show: boolean;
  position: 'top' | 'bottom';
  arrowDegree: number;
  localStorageKey: string;
  onTooltipClick?: () => void;
};

export function UnifiedAnimatedTooltip({
  text,
  show,
  position,
  arrowDegree,
  localStorageKey,
  onTooltipClick,
}: Props) {
  if (!show) {
    return null;
  }

  const handleClick = () => {
    // localStorage에 해당 키로 저장
    localStorage.setItem(localStorageKey, 'true');
    onTooltipClick?.();
  };

  // 위치에 따른 클래스 설정
  const positionClasses = position === 'top'
    ? 'absolute bottom-full left-1/2 z-50 mb-2'
    : 'absolute left-[55%] z-50';

  // 애니메이션 설정 - position에 따라 다르게
  const animationProps = position === 'top'
    ? {} // 위쪽은 고정
    : {
        animate: {
          transform: 'translateY(15px)',
        },
        transition: {
          duration: 1,
          repeat: Infinity,
          repeatType: 'mirror' as const,
        },
      };

  return (
    <motion.div
      className={`pointer-events-none ${positionClasses}`}
      {...animationProps}
    >
      <div className="flex items-center gap-2">
        {/* 화살표 */}
        <motion.div
          animate={{
            color: position === 'top' ? [
              '#6366f1', // indigo-500
              '#8b5cf6', // violet-500
              '#ec4899', // pink-500
              '#f59e0b', // amber-500
              '#6366f1',
            ] : [
              '#121212',
              'rgba(131,58,180,1)',
              'rgba(253,29,29,1)',
              'rgba(252,176,69,1)',
              'rgba(131,58,180,1)',
              '#121212',
            ],
          }}
          transition={{
            duration: position === 'top' ? 2 : 1,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <FaLocationArrow
            className={position === 'top' ? 'h-3 w-3' : 'h-4 w-4'}
            style={{
              transform: `rotate(${arrowDegree}deg)`,
            }}
          />
        </motion.div>

        {/* 텍스트 박스 */}
        <motion.div
          className={
            position === 'top'
              ? 'whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium text-white shadow-lg'
              : 'text-wrap w-[8.25rem] rounded-md border px-3 py-1.5 text-sm text-white pointer-events-auto cursor-pointer'
          }
          animate={{
            backgroundColor: position === 'top' ? [
              '#6366f1', // indigo-500
              '#8b5cf6', // violet-500
              '#ec4899', // pink-500
              '#f59e0b', // amber-500
              '#6366f1',
            ] : [
              '#121212',
              'rgba(131,58,180,1)',
              'rgba(253,29,29,1)',
              'rgba(252,176,69,1)',
              'rgba(131,58,180,1)',
              '#121212',
            ],
          }}
          transition={{
            duration: position === 'top' ? 2 : 1,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          onClick={position === 'bottom' ? handleClick : undefined}
        >
          {text}
        </motion.div>
      </div>
    </motion.div>
  );
}