import { liveblocks } from '@/lib/liveblocks';
import { getUserColor } from '@/lib/utils';
import { auth } from '@/service/auth';
import { createAnonymousUser } from '@/service/users';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const session = await auth();

  // 익명 사용자의 경우 쿠키 또는 요청에서 세션 ID 추출
  const sessionId = request.cookies.get('liveblocks-anonymous-id')?.value
    || `anonymous-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

  const user = session
    ? {
        id: session.user.email,
        info: {
          name: session.user.name,
          avatar: session.user.image,
          color: getUserColor(session.user.id),
        },
      }
    : createAnonymousUser(sessionId);
  // const user = getRandomUser();
  const liveBlockSession = liveblocks.prepareSession(user.id, {
    userInfo: user.info,
  });

  // Use a naming pattern to allow access to rooms with a wildcard
  liveBlockSession.allow(`blog-post-*`, liveBlockSession.FULL_ACCESS);

  // Authorize the user and return the result
  const { body, status } = await liveBlockSession.authorize();
  return new Response(body, { status });
}
