'use client';
import { Button } from '@/components/ui/button';
import { signIn, signOut, useSession } from 'next-auth/react';
export default function SigninButton() {
  const { data: session } = useSession();
  if (session && session.user) {
    return (
      <div className="ml-auto flex gap-4">
        <p className="text-primary-500 dark:text-primaryDark">
          {session.user.name}
        </p>
        <Button
          variant="ghost"
          className="text-primary-500"
          onClick={() => signOut()}
        >
          Sign Out
        </Button>
      </div>
    );
  }
  return (
    <Button
      variant="ghost"
      className="text-primaryDark"
      onClick={() => signIn()}
    >
      Sign In
    </Button>
  );
}
