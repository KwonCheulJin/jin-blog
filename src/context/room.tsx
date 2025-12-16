'use client';

import { RoomProvider } from '@liveblocks/react/suspense';
import { PropsWithChildren, useMemo } from 'react';

type Props = {
  slug: string;
} & PropsWithChildren;

export default function Room({ slug, children }: Props) {
  // roomId와 initialPresence를 메모이제이션하여 불필요한 리렌더링 방지
  const roomId = useMemo(() => `blog-post-${slug}`, [slug]);
  const initialPresence = useMemo(() => ({
    cursor: null,
    editingText: null,
  }), []);

  return (
    <RoomProvider
      id={roomId}
      initialPresence={initialPresence}
    >
      {children}
    </RoomProvider>
  );
}
