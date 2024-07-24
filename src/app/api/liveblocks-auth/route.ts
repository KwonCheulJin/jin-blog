import { liveblocks } from '@/lib/liveblocks';
import { getUserColor } from '@/lib/utils';
import { authOptions } from '@/service/auth';
import { getServerSession } from 'next-auth';
import { NextRequest } from "next/server";



export async function POST(request: NextRequest) {
  // Get the current user's unique id and info from your database

  const session = await getServerSession(authOptions);
  if (!session) {
    return new Response('Authentication Error', { status: 401 });
  }
  const { user: loginUser } = session;

  const user = {
    id: loginUser.id,
    info: {
      name: loginUser.name,
      avatar: loginUser.image,
      color: getUserColor(loginUser.id),
    },
  }
  const { body, status } = await liveblocks.identifyUser(
    {
      userId: user.id,
      groupIds: [],
    },
    {
      userInfo: user.info,
    },
  );

  return new Response(body, { status });

}
