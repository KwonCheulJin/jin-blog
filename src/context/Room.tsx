'use client';

import { RoomProvider } from '@liveblocks/react/suspense';
import { PropsWithChildren } from 'react';

type Props = {
  slug: string;
} & PropsWithChildren;
export default function Room({ slug, children }: Props) {
  const roomId = `blog-post-${slug}`;
  return (
    <RoomProvider
      id={roomId}
      initialPresence={{ cursor: null, editingText: null }}
    >
      {children}
    </RoomProvider>
  );
}
