'use client';

import { AnimatedTooltip } from '@/components/liveblocks/AnimatedTooltip';
import { NewThread } from '@/components/liveblocks/NewThread';
import { ToolbarAvatars } from '@/components/liveblocks/ToolbarAvatars';
import { PlusIcon } from '@/components/liveblocks/icons/PlusIcon';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';

export function Toolbar() {
  const [showTooltip, setShowTooltip] = useState(false);
  const [isTooltipDisabled, setIsTooltipDisabled] = useState(false);

  // 컴포넌트 마운트 시 localStorage에서 tooltip 비활성화 상태 확인
  useEffect(() => {
    const hasSeenTooltip = localStorage.getItem('liveblocks-tooltip-seen');
    if (hasSeenTooltip) {
      setIsTooltipDisabled(true);
    }
  }, []);

  const handleMouseEnter = () => {
    if (!isTooltipDisabled) {
      setShowTooltip(true);
    }
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  const handleClick = () => {
    setShowTooltip(false);
    setIsTooltipDisabled(true);
    localStorage.setItem('liveblocks-tooltip-seen', 'true');
  };

  return (
    <div className="fixed bottom-[40px] left-1/2 z-10 flex -translate-x-1/2 items-center rounded-md bg-white p-3 shadow-sm">
      <div className="relative flex gap-1">
        <NewThread>
          <Button
            variant="ghost"
            className="hover:bg-transparent hover:text-black"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
          >
            <PlusIcon width={12} height={12} />
          </Button>
        </NewThread>

        <AnimatedTooltip
          text="댓글은 해당 스레드를 눌러서 달아보세요"
          show={showTooltip}
          deg="155"
        />
      </div>
      <div className="mx-4 h-4 w-[1px] bg-gray-200" />
      <ToolbarAvatars />
    </div>
  );
}
