import { auth } from '@/service/auth';
import { supabaseServer } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  const supabase = await supabaseServer();
  const { data, error: _error } = await (supabase as any)
    .from('comments')
    .select(
      'id, blog_post_id, parent_comment_id, user_id, content, created_at, updated_at',
    );

  return NextResponse.json(data);
}

export async function POST(_req: NextRequest) {
  const session = await auth();
  const supabaseAccessToken = session?.supabaseAccessToken;

  if (!supabaseAccessToken) {
    return new Response('Authentication Error', { status: 401 });
  }
  const supabase = await supabaseServer(supabaseAccessToken);

  const { data, error: _error2 } = await (supabase as any).from('comments').select();
  const response = { data, status: 200 };
  return NextResponse.json(response);
}
