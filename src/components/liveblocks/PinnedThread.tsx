'use client';

import { ThreadData } from '@liveblocks/client';
import { Thread } from '@liveblocks/react-ui';
import Image from 'next/image';
import {
  PointerEvent,
  PointerEventHandler,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';
// Pinned.module.css migrated to TailwindCSS

type Props = {
  user: Liveblocks['UserMeta']['info'];
  thread: ThreadData;
  onPointerDown: PointerEventHandler<HTMLDivElement>;
  onPointerMove: PointerEventHandler<HTMLDivElement>;
  onPointerUp: PointerEventHandler<HTMLDivElement>;
  onFocus: () => void;
};

export function PinnedThread({
  user,
  thread,
  onPointerDown,
  onPointerMove,
  onPointerUp,
  onFocus,
  ...props
}: Props) {
  const startMinimized = useMemo(() => {
    return Number(new Date()) - Number(new Date(thread.createdAt)) > 100;
  }, [thread]);

  const [minimized, setMinimized] = useState(startMinimized);
  const dragStart = useRef({ x: 0, y: 0 });

  // Record starting click position
  const handlePointerDown = useCallback(
    (e: PointerEvent<HTMLDivElement>) => {
      dragStart.current = { x: e.clientX, y: e.clientY };
      onPointerDown(e);
    },
    [onPointerDown],
  );

  // If cursor moved, toggle minimized
  const handlePointerUp = useCallback(
    (e: PointerEvent<HTMLDivElement>) => {
      onPointerUp(e);
      if (
        e.clientX === dragStart.current.x &&
        e.clientY === dragStart.current.y
      ) {
        setMinimized(min => !min);
      }
    },
    [onPointerUp],
  );

  return (
    <div className="absolute flex gap-4" {...props} onClick={onFocus}>
      <div
        className="select-none relative w-9 h-9 shadow-md rounded-tl rounded-tr-[50%] rounded-br-[50%] rounded-bl-[50%] bg-white cursor-grab"
        onPointerDown={handlePointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={handlePointerUp}
        data-draggable={true}
      >
        <Image
          src={user.avatar}
          alt={user.name}
          width={28}
          height={28}
          draggable={false}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full w-7 h-7"
        />
      </div>
      {!minimized ? (
        <div className="shadow-md bg-white rounded-lg flex flex-col text-sm min-w-60 overflow-hidden">
          <Thread
            thread={thread}
            indentCommentContent={false}
            showResolveAction={false}
            onFocus={onFocus}
          />
        </div>
      ) : null}
    </div>
  );
}
