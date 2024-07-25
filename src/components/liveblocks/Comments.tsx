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
      <ClientSideSuspense fallback={null}>
        <Toolbar />
        <CommentsOverlay />
      </ClientSideSuspense>
    </ErrorBoundary>
  );
}
