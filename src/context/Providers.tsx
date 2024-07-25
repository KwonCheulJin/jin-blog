'use client';

import { LiveblocksProvider } from '@liveblocks/react/suspense';
import {
  isServer,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const ScrollUp = dynamic(() => import('@/components/common/ScrollUp'), {
  ssr: false,
});

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
  if (isServer) {
    return makeQueryClient();
  } else {
    if (!browserQueryClient) {
      browserQueryClient = makeQueryClient();
    }
    return browserQueryClient;
  }
}

export function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <LiveblocksProvider
          authEndpoint="/api/liveblocks-auth"
          resolveUsers={async ({ userIds }) => {
            const searchParams = new URLSearchParams(
              userIds.map(userId => ['userIds', userId]),
            );
            const response = await fetch(`/api/user-info?${searchParams}`);

            if (!response.ok) {
              throw new Error('Problem resolving users');
            }

            const users = await response.json();
            return users;
          }}
          resolveMentionSuggestions={async ({ text }) => {
            const response = await fetch(
              `/api/user-info/search?text=${encodeURIComponent(text)}`,
            );

            if (!response.ok) {
              throw new Error('Problem resolving mention suggestions');
            }

            const userIds = await response.json();
            return userIds;
          }}
        >
          <Suspense fallback={<></>}>
            <ScrollUp />
          </Suspense>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
          </ThemeProvider>
        </LiveblocksProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}
