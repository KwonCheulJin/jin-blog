'use client';

import { PointerEventHandler } from 'react';
// Pinned.module.css migrated to TailwindCSS

import { Composer, ComposerProps } from '@liveblocks/react-ui';
import Image from 'next/image';

type Props = {
  user: Liveblocks['UserMeta']['info'];
  onPointerDown: PointerEventHandler<HTMLDivElement>;
  onPointerMove: PointerEventHandler<HTMLDivElement>;
  onPointerUp: PointerEventHandler<HTMLDivElement>;
  onComposerSubmit: ComposerProps['onComposerSubmit'];
};

export function PinnedComposer({
  user,
  onPointerDown,
  onPointerMove,
  onPointerUp,
  onComposerSubmit,
  ...props
}: Props) {
  return (
    <div className="absolute flex gap-4" {...props}>
      <div
        className="select-none relative w-9 h-9 shadow-md rounded-tl rounded-tr-[50%] rounded-br-[50%] rounded-bl-[50%] bg-white"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
      >
        <Image
          width={28}
          height={28}
          src={user.avatar}
          alt={user.name}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full w-7 h-7"
        />
      </div>
      <div className="shadow-md bg-white rounded-lg flex flex-col text-sm min-w-60 overflow-hidden">
        <Composer
          onComposerSubmit={onComposerSubmit}
          onClick={e => {
            // Don't send up a click event from emoji popout and close the composer
            e.stopPropagation();
          }}
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus={true}
        />
      </div>
    </div>
  );
}
