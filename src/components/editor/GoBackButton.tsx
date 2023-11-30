'use client';
import { Button } from '@/components/ui/button';
import { ArrowLeftIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function GoBackButton() {
  const router = useRouter();
  return (
    <Button variant="ghost" className="text-xl" onClick={() => router.back()}>
      <ArrowLeftIcon className="h-6 w-6" />
      <p className="ml-3">나가기</p>
    </Button>
  );
}
