import { getUser } from '@/service/users';
import { User } from '@/types';
import { supabaseServer } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userIds = searchParams.getAll('userIds');

  const supabase = await supabaseServer();
  const { data: users, error } = await supabase
    .from('users')
    .select('*')
    .returns<Array<User>>();

  if (!users || !Array.isArray(users)) {
    return new NextResponse('Missing or invalid userIds', { status: 400 });
  }
  const allUser = userIds.map(
    userId => getUser({ users, userId })?.info || null,
  );
  return NextResponse.json(allUser, { status: 200 });
}
