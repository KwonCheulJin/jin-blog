'use client';

import { CommentsOverlay } from '@/components/liveblocks/CommentsOverlay';
import { Toolbar } from '@/components/liveblocks/Toolbar';
import { ClientSideSuspense } from '@liveblocks/react';
import { ErrorBoundary } from 'react-error-boundary';

export function Comments() {
  return (
    <ErrorBoundary
      fallback={
        <div className="fixed bottom-[40px] left-1/2 flex -translate-x-1/2 items-center rounded-md bg-white p-3 shadow-sm">
          An error occurred while loading threads.
        </div>
      }
    >
      <ClientSideSuspense
        fallback={
          <div className="fixed bottom-4 right-4 z-50">
            <div className="animate-pulse rounded-full bg-gray-200 dark:bg-gray-700 h-12 w-12"></div>
          </div>
        }
      >
        <Toolbar />
        <CommentsOverlay />
      </ClientSideSuspense>
    </ErrorBoundary>
  );
}
