'use client';

import { userApi } from '@/service/api/userApi';
import { anonymousUser } from '@/service/users';
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
            try {
              const response = await userApi.resolveUsers(searchParams);
              return response.data;
            } catch (error) {
              console.error('Error resolving users:', error);
              return [anonymousUser.info];
            }
          }}
          resolveMentionSuggestions={async ({ text }) => {
            try {
              const response = await userApi.resolveMentionSuggestions(
                encodeURIComponent(text),
              );
              return response.data;
            } catch (error) {
              console.error('Error resolving mention suggestions:', error);
              return [];
            }
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
