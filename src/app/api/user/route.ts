import { getUserColor } from '@/lib/utils';
import { authOptions } from '@/service/auth';
import { UserMeta } from '@/types/liveblocks';
import { supabaseServer } from '@/utils/supabase/server';
import { getServerSession } from 'next-auth';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const cookieStore = cookies();
  const supabase = supabaseServer(cookieStore);
  const { data: users, error } = await supabase.from('users').select('*');

  const session = await getServerSession(authOptions);
  if (!users || !Array.isArray(users) || !session) {
    return new NextResponse('Missing or invalid userIds', { status: 400 });
  }
  const { user: loginUser } = session;
  const blogUsers: Array<UserMeta> = users.map(user => ({
    id: user.id,
    info: { name: user.name, avatar: user.image, color: getUserColor(user.id) },
  }));
  const findInfo =
    blogUsers.find(blogUser => blogUser.id === loginUser.id)?.info || null;

  return NextResponse.json([findInfo], { status: 200 });
}
