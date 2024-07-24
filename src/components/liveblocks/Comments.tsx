/* eslint-disable @typescript-eslint/ban-ts-comment */
'use client';

import { CommentsOverlay } from '@/components/liveblocks/CommentsOverlay';
import { Toolbar } from '@/components/liveblocks/Toolbar';
import { ClientSideSuspense } from '@liveblocks/react';
import { ErrorBoundary } from 'react-error-boundary';
import styles from './Toolbar.module.css';

export function Comments() {
  return (
    /* @ts-ignore */
    <ErrorBoundary
      fallback={
        <div className={styles.toolbar}>
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
