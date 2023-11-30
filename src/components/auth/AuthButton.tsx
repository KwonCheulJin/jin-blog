'use client';
import { Button } from '@/components/ui/button';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
export default function AuthButton() {
  const { data: session } = useSession();
  if (session && session.user) {
    return (
      <div className="ml-4 flex items-center gap-4">
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
    <Link href="/signin">
      <Button variant="ghost" className="ml-4 text-primaryDark">
        Sign In
      </Button>
    </Link>
  );
}
