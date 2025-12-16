'use client';

import { CommentsOverlay } from '@/components/liveblocks/comments-overlay';
import { Toolbar } from '@/components/liveblocks/toolbar';
import { ClientSideSuspense } from '@liveblocks/react';
import { ErrorBoundary } from 'react-error-boundary';

export function Comments() {
  return (
    <ErrorBoundary
      fallback={
        <div className="fixed bottom-[40px] left-1/2 flex -translate-x-1/2 items-center rounded-md bg-white p-3 shadow-xs">
          An error occurred while loading threads.
        </div>
      }
    >
      <ClientSideSuspense
        fallback={
          <div className="fixed bottom-[40px] left-1/2 z-10 flex -translate-x-1/2 items-center rounded-md bg-white p-3 shadow-xs">
            <div className="flex gap-1">
              <div className="w-8 h-8 flex items-center justify-center">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-gray-300 border-t-gray-600"></div>
              </div>
            </div>
            <div className="mx-4 h-4 w-px bg-gray-200" />
            <div className="animate-pulse rounded-full bg-gray-200 h-8 w-8"></div>
          </div>
        }
      >
        <Toolbar />
        <CommentsOverlay />
      </ClientSideSuspense>
    </ErrorBoundary>
  );
}
