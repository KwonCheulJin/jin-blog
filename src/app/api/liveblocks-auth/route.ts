import { liveblocks } from '@/lib/liveblocks';
import { getUserColor } from '@/lib/utils';
import { authOptions } from '@/service/auth';
import { anonymousUser } from '@/service/users';
import { getServerSession } from 'next-auth';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);

  const user = session
    ? {
        id: session.user.email,
        info: {
          name: session.user.name,
          avatar: session.user.image,
          color: getUserColor(session.user.id),
        },
      }
    : anonymousUser;
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
