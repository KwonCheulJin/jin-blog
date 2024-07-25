'use client';

import splitStringUsingRegex from '@/utils/splitStringUsingRegex';
import { motion } from 'framer-motion';
import { ClientSafeProvider, signIn } from 'next-auth/react';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { v1 } from 'uuid';

type Props = {
  providers: Record<string, ClientSafeProvider>;
};

const providerIcons: Record<string, React.ReactNode> = {
  Google: <FcGoogle className="h-10 w-10 rounded-full" />,
  GitHub: <AiFillGithub className="h-10 w-10 rounded-full" />,
};
export default function SignIn({ providers }: Props) {
  return (
    <div className="modal-effect flex h-full w-full flex-col items-center justify-center rounded-xl ">
      <motion.header
        initial={{
          opacity: 0,
          x: 100,
        }}
        animate={{
          opacity: 1,
          x: 0,
          transition: {
            type: 'spring',
            stiffness: 300,
            damping: 24,
            delay: 0.2,
          },
        }}
        className="my-2 text-5xl font-bold text-white"
      >
        Sign In
      </motion.header>
      <div className="flex h-2/3 w-full flex-col items-center justify-center gap-8 rounded-full px-14">
        {Object.values(providers)
          .map(provider => (
            <button
              key={v1()}
              onClick={() => signIn(provider.id)}
              className="flex h-16 w-full items-center justify-center rounded-full bg-white/90 text-dark"
            >
              <div className="group flex h-full w-full items-center justify-center gap-2">
                {providerIcons[provider.name]}
                <div className="flex gap-1">
                  {splitStringUsingRegex(provider.name).map(
                    (character, index) => (
                      <motion.p
                        key={`character-${character}-${index}`}
                        initial={{
                          opacity: 0,
                          y: 20 * index * Math.floor(Math.random() * 10) + 1,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                          transition: {
                            type: 'spring',
                            stiffness: 300,
                            damping: 24,
                            delay: 0.2,
                          },
                        }}
                        className="text-xl font-bold"
                      >
                        {character}
                      </motion.p>
                    ),
                  )}
                </div>
              </div>
            </button>
          ))
          .reverse()}
      </div>
    </div>
  );
}
