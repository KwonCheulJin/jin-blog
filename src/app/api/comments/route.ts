import { authOptions } from '@/service/auth';
import {
  createSupabaseAuthClient,
  createSupabaseClient,
} from '@/service/supabase';
import { Post } from '@/types';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from('comments')
    .select(
      'id, blog_post_id, parent_comment_id, user_id, content, created_at, updated_at',
    );

  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const supabaseAccessToken = session?.supabaseAccessToken;

  if (!supabaseAccessToken) {
    return new Response('Authentication Error', { status: 401 });
  }
  const supabase = createSupabaseAuthClient(supabaseAccessToken);

  const { title, sub_title, markdown, tags } = (await req.json()) as Post;
  const { data, error } = await supabase
    .from('comments')
    .insert([{ author: session.user.name, title, sub_title, markdown, tags }])
    .select();
  const response = { data, status: 200 };
  return NextResponse.json(response);
}
