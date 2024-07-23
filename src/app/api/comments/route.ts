import { authOptions } from '@/service/auth';
import { supabaseServer } from '@/utils/supabase/server';
import { getServerSession } from 'next-auth';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  const cookieStore = cookies()
  const supabase = supabaseServer(cookieStore);
  const { data, error } = await supabase
    .from('comments')
    .select(
      'id, blog_post_id, parent_comment_id, user_id, content, created_at, updated_at',
    );

  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const cookieStore = cookies()
  const session = await getServerSession(authOptions);
  const supabaseAccessToken = session?.supabaseAccessToken;

  if (!supabaseAccessToken) {
    return new Response('Authentication Error', { status: 401 });
  }
  const supabase = supabaseServer(cookieStore, supabaseAccessToken);

  const { data, error } = await supabase
    .from('comments')
    .select();
  const response = { data, status: 200 };
  return NextResponse.json(response);
}
