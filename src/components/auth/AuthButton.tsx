'use client';
import { Button } from '@/components/ui/button';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
export default function AuthButton() {
  const pathname = usePathname();
  const { data: session } = useSession();
  if (session && session.user) {
    return (
      <Button
        variant="ghost"
        className="hover:bg-transparent"
        onClick={() => signOut()}
      >
        Sign Out
      </Button>
    );
  }
  return (
    <Link href={`/signin?callbackUrl=${pathname}`}>
      <Button variant="ghost" className="hover:bg-transparent">
        Sign In
      </Button>
    </Link>
  );
}
