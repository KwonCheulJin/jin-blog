'use client';

import { CloseIcon } from '@/components/liveblocks/icons/CloseIcon';
import { DocumentCompleteIcon } from '@/components/liveblocks/icons/DocumentCompleteIcon';
import { DocumentMagnifyingIcon } from '@/components/liveblocks/icons/DocumentMagnifyingIcon';
import { PlusIcon } from '@/components/liveblocks/icons/PlusIcon';
import { ThreadData } from '@liveblocks/client';
import { Thread } from '@liveblocks/react-ui';
import { useThreads } from '@liveblocks/react/suspense';
import { useMemo } from 'react';
// Sidebar.module.css migrated to TailwindCSS

type Props = {
  onClose: () => void;
};

export function Sidebar({ onClose }: Props) {
  const { threads } = useThreads();

  const resolvedThreadCount = useMemo(() => {
    return threads.filter(thread => thread.resolved).length;
  }, [threads]);

  return (
    <div className="fixed top-10 right-10 bottom-10 w-96 max-w-[90%] pointer-events-none">
      <div className="relative bg-white text-black rounded-xl shadow-lg text-sm max-h-full overflow-y-auto z-50 pointer-events-auto animate-in fade-in duration-150" data-scrollbar="thin">
        <div className="flex items-center px-5 py-2 justify-between font-medium">
          <div className="flex items-center gap-2">
            {resolvedThreadCount === threads.length ? (
              <DocumentCompleteIcon opacity="0.7" />
            ) : (
              <DocumentMagnifyingIcon opacity="0.7" />
            )}
            {resolvedThreadCount}/{threads.length} threads resolved
          </div>
          <button onClick={onClose} className="py-5 px-3 bg-transparent text-inherit">
            <span className="sr-only">Close menu</span>
            <CloseIcon width={12} height={12} />
          </button>
        </div>
        <div className="flex flex-col px-5 pb-5 gap-5">
          {threads.length ? (
            threads.sort(sortResolved).map(thread => (
              <div
                key={thread.id}
                className="bg-gray-50 border border-gray-200 rounded shadow-sm overflow-hidden data-[thread-resolved]:opacity-65"
                data-thread-resolved={thread.resolved || undefined}
              >
                <Thread thread={thread} indentCommentContent={false} />
              </div>
            ))
          ) : (
            <CreateThreadMessage />
          )}
        </div>
      </div>
    </div>
  );
}

function CreateThreadMessage() {
  return (
    <div>
      Create a thread with the{' '}
      <PlusIcon
        style={{ display: 'inline', marginTop: '-2px' }}
        height={9}
        width={9}
      />{' '}
      plus icon in the toolbar.
    </div>
  );
}

function sortResolved(a: ThreadData, b: ThreadData) {
  if (a.resolved && !b.resolved) {
    return 1;
  }

  if (!a.resolved && b.resolved) {
    return -1;
  }

  return 0;
}
