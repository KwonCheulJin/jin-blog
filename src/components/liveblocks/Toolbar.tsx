'use client';

import { NewThread } from '@/components/liveblocks/NewThread';
import { ToolbarAvatars } from '@/components/liveblocks/ToolbarAvatars';
import { PlusIcon } from '@/components/liveblocks/icons/PlusIcon';
import { Button } from '@/components/ui/button';

export function Toolbar() {
  return (
    <div className="fixed bottom-[40px] left-1/2 z-10 flex -translate-x-1/2 items-center rounded-md bg-white p-3 shadow-sm">
      <div className="flex gap-1">
        <NewThread>
          <Button
            variant="ghost"
            className="hover:bg-transparent hover:text-black"
          >
            <PlusIcon width={12} height={12} />
          </Button>
        </NewThread>
      </div>
      <div className="mx-4 h-4 w-[1px] bg-gray-200" />
      <ToolbarAvatars />
    </div>
  );
}
