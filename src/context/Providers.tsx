'use client';

import { userApi } from '@/service/api/userApi';
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

// 사용자 정보 전역 캐시
const userCache = new Map<string, any>();

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
            // 입력 검증
            if (!Array.isArray(userIds) || userIds.length === 0) {
              return [];
            }

            // 캐시되지 않은 사용자 ID만 필터링
            const uncachedUserIds = userIds.filter(userId => !userCache.has(userId));

            // 캐시되지 않은 사용자가 있으면 API 호출
            if (uncachedUserIds.length > 0) {
              const searchParams = new URLSearchParams(
                uncachedUserIds.map(userId => ['userIds', userId]),
              );
              try {
                const response = await userApi.resolveUsers(searchParams);

                // 응답 데이터 검증 및 캐시에 저장
                if (response?.data && Array.isArray(response.data)) {
                  response.data.forEach((user: any) => {
                    if (user && user.id) {
                      userCache.set(user.id, user);
                    }
                  });
                }
              } catch (error) {
                if (process.env.NODE_ENV === 'development') {
                  console.error('Error resolving users:', error);
                }
                // 에러 발생 시 캐시되지 않은 사용자를 익명 사용자로 캐시
                uncachedUserIds.forEach(userId => {
                  if (userId) {
                    userCache.set(userId, {
                      id: userId,
                      name: 'Anonymous User',
                      color: '#8594F0',
                      avatar: 'https://liveblocks.io/avatars/avatar-6.png',
                    });
                  }
                });
              }
            }

            // 항상 요청된 userIds와 동일한 길이의 배열 반환
            return userIds.map(userId => {
              const user = userCache.get(userId);
              return user || {
                id: userId,
                name: 'Unknown User',
                color: '#8594F0',
                avatar: 'https://liveblocks.io/avatars/avatar-6.png',
              };
            });
          }}
          resolveMentionSuggestions={async ({ text }) => {
            try {
              const response = await userApi.resolveMentionSuggestions(
                encodeURIComponent(text),
              );
              return response.data;
            } catch (error) {
              if (process.env.NODE_ENV === 'development') {
                console.error('Error resolving mention suggestions:', error);
              }
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
