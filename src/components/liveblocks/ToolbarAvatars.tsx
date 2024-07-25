/* eslint-disable @next/next/no-img-element */
'use client';

import { useOthers, useSelf } from '@liveblocks/react/suspense';
import styles from './ToolbarAvatars.module.css';

export function ToolbarAvatars() {
  const currentUser = useSelf();
  const users = useOthers();

  return (
    <div className={styles.toolbarAvatars}>
      {currentUser && (
        <Avatar src={currentUser.info.avatar} name={currentUser.info.name} />
      )}

      {users.map(({ connectionId, info }) => {
        return <Avatar key={connectionId} src={info.avatar} name={info.name} />;
      })}
    </div>
  );
}

export function Avatar({ src, name }: { src: string; name: string }) {
  return (
    <img
      width="28px"
      height="28px"
      alt={name}
      src={src}
      className={styles.toolbarAvatar}
      draggable={false}
    />
  );
}
