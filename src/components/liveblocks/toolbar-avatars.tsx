'use client';

import { useOthers, useSelf } from '@liveblocks/react/suspense';
import Image from 'next/image';
// ToolbarAvatars.module.css migrated to TailwindCSS

export function ToolbarAvatars() {
  const currentUser = useSelf();
  const users = useOthers();

  return (
    <div className="flex">
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
    <Image
      width={28}
      height={28}
      alt={name}
      src={src}
      className="rounded-full border-2 border-white w-8 h-8 -ml-1 first:ml-0"
      draggable={false}
    />
  );
}
