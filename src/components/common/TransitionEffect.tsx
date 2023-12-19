'use client';
import { motion } from 'framer-motion';

export default function TransitionEffect() {
  return (
    <div className="pt-1">
      <motion.div
        className="fixed bottom-0 right-full top-0 z-40 min-h-full min-w-full bg-primaryDark"
        initial={{ x: '100%', width: '100%' }}
        animate={{ x: '0%', width: '0%' }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      />
      <motion.div
        className="fixed bottom-0 right-full top-0 z-30 min-h-full min-w-full bg-primary-500"
        initial={{ x: '100%', width: '100%' }}
        animate={{ x: '0%', width: '0%' }}
        transition={{ delay: 0.1, duration: 0.8, ease: 'easeInOut' }}
      />
      <motion.div
        className="fixed bottom-0 right-full top-0 z-20 min-h-full min-w-full bg-light"
        initial={{ x: '100%', width: '100%' }}
        animate={{ x: '0%', width: '0%' }}
        transition={{ delay: 0.2, duration: 0.8, ease: 'easeInOut' }}
      />
      <motion.div
        className="fixed bottom-0 right-full top-0 z-10 min-h-full min-w-full bg-dark"
        initial={{ x: '100%', width: '100%' }}
        animate={{ x: '0%', width: '0%' }}
        transition={{ delay: 0.3, duration: 0.8, ease: 'easeInOut' }}
      />
    </div>
  );
}
