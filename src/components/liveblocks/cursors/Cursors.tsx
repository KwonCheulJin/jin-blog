'use client';

import { useEffect } from 'react';
import { Cursor } from './Cursor';

import { getCoordsFromElement } from '@/lib/coords';
import { ClientSideSuspense } from '@liveblocks/react';
import {
  useOthersConnectionIds,
  useUpdateMyPresence,
} from '@liveblocks/react/suspense';

export function Cursors() {
  return (
    <ClientSideSuspense fallback={<div aria-hidden="true" />}>
      <CursorsComponent />
    </ClientSideSuspense>
  );
}

function CursorsComponent() {
  /**
   * useMyPresence returns the presence of the current user and a function to update it.
   * updateMyPresence is different than the setState function returned by the useState hook from React.
   * You don't need to pass the full presence object to update it.
   * See https://liveblocks.io/docs/api-reference/liveblocks-react#useMyPresence for more information
   */
  const updateMyPresence = useUpdateMyPresence();

  /**
   * Return all the other users in the room and their presence (a cursor position in this case)
   */
  const othersConnectionIds = useOthersConnectionIds();

  useEffect(() => {
    let animationFrame: number | null = null;
    let lastUpdateTime = 0;
    const UPDATE_INTERVAL = 16; // ~60fps, 성능과 부드러움의 균형

    // On cursor move, update presence with throttling
    function handlePointerMove(e: PointerEvent) {
      const currentTime = Date.now();

      // 이전 업데이트에서 충분한 시간이 지나지 않았으면 건너뛰기
      if (currentTime - lastUpdateTime < UPDATE_INTERVAL) {
        return;
      }

      // 이전 애니메이션 프레임이 있으면 취소
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }

      // 다음 애니메이션 프레임에서 업데이트 실행
      animationFrame = requestAnimationFrame(() => {
        const elementUnder = document.elementFromPoint(e.clientX, e.clientY);

        if (elementUnder) {
          const cursor = getCoordsFromElement(elementUnder, e.clientX, e.clientY);
          updateMyPresence({ cursor });
        } else {
          updateMyPresence({ cursor: null });
        }

        lastUpdateTime = currentTime;
        animationFrame = null;
      });
    }

    // Hide cursor on leave page
    function handlePointerLeave() {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
        animationFrame = null;
      }
      updateMyPresence({ cursor: null });
    }

    document.documentElement.addEventListener('pointermove', handlePointerMove);
    document.documentElement.addEventListener(
      'pointerleave',
      handlePointerLeave,
    );

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
      document.documentElement.removeEventListener(
        'pointermove',
        handlePointerMove,
      );
      document.documentElement.removeEventListener(
        'pointerleave',
        handlePointerLeave,
      );
    };
  }, [updateMyPresence]);

  // Iterate through currently connected users and pass unique `connectionId` to `Cursor`
  return (
    <>
      {othersConnectionIds.map(connectionId => (
        <Cursor key={connectionId} connectionId={connectionId} />
      ))}
    </>
  );
}
