'use client';

import useRoomId from '@/hooks/useRoomId';
import { getUserInfo } from '@/service/users';
import {
  ClientSideSuspense,
  LiveblocksProvider,
  RoomProvider,
} from '@liveblocks/react/suspense';
import { useSession } from 'next-auth/react';
import { PropsWithChildren } from 'react';

export default function Room({ children }: PropsWithChildren) {
  const { data: session } = useSession();
  console.log('🚀 ~ useRoomId ~ session:', session);
  const roomId = useRoomId(session);
  console.log('🚀 ~ Room ~ roomId:', roomId);
  return (
    <LiveblocksProvider
      authEndpoint="/api/liveblocks-auth"
      // Get users' info from their ID
      resolveUsers={async () => {
        const currentUserInfo = await getUserInfo();
        return currentUserInfo;
      }}
      // Find a list of users that match the current search term
      resolveMentionSuggestions={async ({ text }) => {
        const response = await fetch(
          `/api/users/search?text=${encodeURIComponent(text)}`,
        );

        if (!response.ok) {
          throw new Error('Problem resolving mention suggestions');
        }

        const userIds = await response.json();
        return userIds;
      }}
    >
      <RoomProvider
        id={roomId}
        initialPresence={{ cursor: null, editingText: null }}
      >
        <ClientSideSuspense fallback={<div>Loading…</div>}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}
