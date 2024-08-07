'use client';
import { useRouter } from 'next/navigation';
import { MouseEventHandler, useCallback, useEffect, useRef } from 'react';

export default function Modal({ children }: { children: React.ReactNode }) {
  const overlay = useRef(null);
  const wrapper = useRef(null);
  const router = useRouter();

  const onDismiss = useCallback(() => {
    router.back();
  }, [router]);

  const onClick: MouseEventHandler = useCallback(
    e => {
      if (e.target === overlay.current || e.target === wrapper.current) {
        if (onDismiss) {
          onDismiss();
        }
      }
    },
    [onDismiss, overlay, wrapper],
  );

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onDismiss();
      }
    },
    [onDismiss],
  );

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onKeyDown]);

  return (
    <div className=" pt-1">
      <div
        ref={overlay}
        className="fixed bottom-0 left-0 right-0 top-0 z-50 mx-auto bg-black/60"
        onClick={onClick}
      >
        <div
          ref={wrapper}
          className="absolute left-1/2 top-1/2 h-1/3 w-[420px] -translate-x-1/2 -translate-y-1/2 xs:w-[340px]"
        >
          {children}
        </div>
      </div>
    </div>
  );
}
