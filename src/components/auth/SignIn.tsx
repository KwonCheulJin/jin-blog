'use client';
import { ClientSafeProvider, signIn } from 'next-auth/react';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { v1 } from 'uuid';

type Props = {
  providers: Record<string, ClientSafeProvider>;
};

const providerIcons: Record<string, React.ReactNode> = {
  Google: (
    <div className="group flex h-full w-full items-center justify-center">
      <FcGoogle className="h-10 w-10 rounded-full group-hover:h-8 group-hover:w-8" />
    </div>
  ),
  GitHub: (
    <div className="group flex h-full w-full items-center justify-center">
      <AiFillGithub className="h-10 w-10 rounded-full group-hover:h-8 group-hover:w-8" />
    </div>
  ),
};
export default function SignIn({ providers }: Props) {
  return (
    <div className="modal-effect flex h-full w-full items-center justify-center gap-8 rounded-xl bg-white xs:flex-col">
      {Object.values(providers)
        .map(provider => (
          <button
            key={v1()}
            onClick={() => signIn(provider.id)}
            className="effect hover:reverse-effect flex h-24 w-32 items-center justify-center rounded-xl text-dark"
          >
            {providerIcons[provider.name]}
          </button>
        ))
        .reverse()}
    </div>
  );
}
