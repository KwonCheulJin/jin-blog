'use client';
import { motion } from 'framer-motion';

export default function TransitionEffect() {
  return (
    <div className="pt-1">
      <motion.div
        className="fixed top-0 bottom-0 right-full z-40 h-screen w-screen bg-primaryDark"
        initial={{ x: '100%', width: '100%' }}
        animate={{ x: '0%', width: '0%' }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      />
      <motion.div
        className="bg-primary-500 fixed top-0 bottom-0 right-full z-30 h-screen w-screen"
        initial={{ x: '100%', width: '100%' }}
        animate={{ x: '0%', width: '0%' }}
        transition={{ delay: 0.1, duration: 0.8, ease: 'easeInOut' }}
      />
      <motion.div
        className="fixed top-0 bottom-0 right-full z-20 h-screen w-screen bg-light"
        initial={{ x: '100%', width: '100%' }}
        animate={{ x: '0%', width: '0%' }}
        transition={{ delay: 0.2, duration: 0.8, ease: 'easeInOut' }}
      />
      <motion.div
        className="fixed top-0 bottom-0 right-full z-10 h-screen w-screen bg-dark"
        initial={{ x: '100%', width: '100%' }}
        animate={{ x: '0%', width: '0%' }}
        transition={{ delay: 0.3, duration: 0.8, ease: 'easeInOut' }}
      />
    </div>
  );
}
