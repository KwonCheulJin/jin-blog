'use client';

import { PointerEventHandler } from 'react';
import styles from './Pinned.module.css';

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
    <div className={styles.pinned} {...props}>
      <div
        className={styles.avatarPin}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
      >
        <Image width={28} height={28} src={user.avatar} alt={user.name} />
      </div>
      <div className={styles.pinnedContent}>
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
