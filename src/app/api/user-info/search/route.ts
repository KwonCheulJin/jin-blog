import { getUserColor } from '@/lib/utils';
import { User } from '@/types';
import { UserMeta } from '@/types/liveblocks';
import { supabaseServer } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

/**
 * Returns a list of user IDs from a partial search input
 * For `resolveMentionSuggestions` in liveblocks.config.ts
 */

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const text = searchParams.get('text') as string;
  const cookieStore = cookies();
  const supabase = supabaseServer(cookieStore);
  const { data: users, error } = await supabase
    .from('users')
    .select('*')
    .returns<Array<User>>();

  if (!users || !Array.isArray(users)) {
    return new NextResponse('Missing or invalid userIds', { status: 400 });
  }
  const blogUsers: Array<UserMeta> = users.map(user => ({
    id: user.email,
    info: { name: user.name, avatar: user.image, color: getUserColor(user.id) },
  }));

  const filteredUserIds = blogUsers
    .filter(user => {
      return user.info.name.toLowerCase().includes(text.toLowerCase());
    })
    .map(user => user.id);

  return NextResponse.json(filteredUserIds);
}
