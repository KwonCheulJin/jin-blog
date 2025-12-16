'use client';

import { motion as m, type Variants, type Easing } from 'framer-motion';
import { Button } from './button';
import { cn } from '@/lib/utils';
import { useThemeManager } from '@/hooks/use-theme-manager';

interface ThemeToggleButtonProps {
  className?: string;
}

const easeOutCurve: Easing = [0.25, 0.1, 0.25, 1];
const linearEase: Easing = (t: number) => t;

const raysVariants: Variants = {
  hidden: {
    strokeOpacity: 0,
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
  visible: {
    strokeOpacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const rayVariant: Variants = {
  hidden: {
    pathLength: 0,
    opacity: 0,
    scale: 0,
  },
  visible: {
    pathLength: 1,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: easeOutCurve,
      pathLength: { duration: 0.3 },
      opacity: { duration: 0.2 },
      scale: { duration: 0.3 },
    },
  },
};

const shineVariant: Variants = {
  hidden: {
    opacity: 0,
    scale: 2,
    strokeDasharray: '20, 1000',
    strokeDashoffset: 0,
    filter: 'blur(0px)',
  },
  visible: {
    opacity: [0, 1, 0],
    strokeDashoffset: [0, -50, -100],
    filter: ['blur(2px)', 'blur(2px)', 'blur(0px)'],
    transition: {
      duration: 0.75,
      ease: linearEase,
    },
  },
};

const sunPath =
  'M70 49.5C70 60.8218 60.8218 70 49.5 70C38.1782 70 29 60.8218 29 49.5C29 38.1782 38.1782 29 49.5 29C60 29 69.5 38 70 49.5Z';
const moonPath =
  'M70 49.5C70 60.8218 60.8218 70 49.5 70C38.1782 70 29 60.8218 29 49.5C29 38.1782 38.1782 29 49.5 29C39 45 49.5 59.5 70 49.5Z';

export function ThemeToggleButton({ className }: ThemeToggleButtonProps) {
  const { isDark, mounted, handleToggleTheme } = useThemeManager();
  const currentPath = isDark ? moonPath : sunPath;

  if (!mounted) {
    return null;
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleToggleTheme}
      aria-label="테마 전환"
      title="테마 전환"
      className={cn('h-6 w-6 hover:bg-transparent', className)}
    >
      <m.svg
          strokeWidth={4}
          strokeLinecap="round"
          width={24}
          height={24}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative"
        >
          <m.path
            variants={shineVariant}
            d={moonPath}
            className="absolute left-0 top-0 stroke-blue-200"
            initial="hidden"
            animate={isDark ? 'visible' : 'hidden'}
          />

          <m.g
            variants={raysVariants}
            initial="hidden"
            animate={isDark ? 'hidden' : 'visible'}
            strokeWidth={6}
            className="stroke-yellow-500"
            style={{ strokeLinecap: 'round' }}
          >
            <m.path
              className="origin-center"
              variants={rayVariant}
              d="M50 2V11"
            />
            <m.path variants={rayVariant} d="M85 15L78 22" />
            <m.path variants={rayVariant} d="M98 50H89" />
            <m.path variants={rayVariant} d="M85 85L78 78" />
            <m.path variants={rayVariant} d="M50 98V89" />
            <m.path variants={rayVariant} d="M23 78L16 84" />
            <m.path variants={rayVariant} d="M11 50H2" />
            <m.path variants={rayVariant} d="M23 23L16 16" />
          </m.g>

          <m.path
            d={currentPath}
            fill="transparent"
            style={{ transformOrigin: '50% 50%' }}
            initial={false}
            transition={{ duration: 1, type: 'spring' }}
            animate={
              isDark
                ? {
                    d: moonPath,
                    rotate: -360,
                    scale: 2,
                    stroke: 'rgb(96, 165, 250)',
                    fill: 'rgb(96, 165, 250)',
                    fillOpacity: 0.35,
                    strokeOpacity: 1,
                    transition: { delay: 0.1 },
                  }
                : {
                    d: sunPath,
                    rotate: 0,
                    stroke: 'rgb(234, 179, 8)',
                    fill: 'rgb(234, 179, 8)',
                    fillOpacity: 0.35,
                    strokeOpacity: 1,
                    scale: 1.1,
                  }
            }
          />
      </m.svg>
    </Button>
  );
}
