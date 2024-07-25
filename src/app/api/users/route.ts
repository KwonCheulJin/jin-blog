import { getUserColor } from '@/lib/utils';
import { supabaseServer } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');
  const cookieStore = cookies();
  const supabase = supabaseServer(cookieStore);
  const { data: users, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', `${userId}`);

  if (!users || !Array.isArray(users)) {
    return new NextResponse('Missing or invalid userIds', { status: 400 });
  }
  const [user] = users;

  const commentOwnerInfo: Liveblocks['UserMeta']['info'] = {
    name: user.name,
    avatar: user.image,
    color: getUserColor(user.id),
  };

  return NextResponse.json(commentOwnerInfo, { status: 200 });
}
