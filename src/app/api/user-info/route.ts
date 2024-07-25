import { getUser } from '@/service/users';
import { User } from '@/types';
import { supabaseServer } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userIds = searchParams.getAll('userIds');
  const cookieStore = cookies();
  const supabase = supabaseServer(cookieStore);
  const { data: users, error } = await supabase
    .from('users')
    .select('*')
    .returns<Array<User>>();

  if (!users || !Array.isArray(users)) {
    return new NextResponse('Missing or invalid userIds', { status: 400 });
  }

  return NextResponse.json(
    userIds.map(userId => getUser({ users, userId })?.info || null),
    { status: 200 },
  );
}
