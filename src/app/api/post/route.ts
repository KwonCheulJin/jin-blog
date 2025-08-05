import { authOptions } from '@/service/auth';
import { Post, PostDetail } from '@/types';
import { supabaseServer } from '@/utils/supabase/server';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  const supabase = await supabaseServer();
  const { data, error } = await supabase
    .from('posts')
    .select('id, title, sub_title, tags, created_at, updated_at');

  if (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json([], { status: 500 });
  }

  return NextResponse.json(data || []);
}

export type DataResponse<T> = {
  data: T | null;
  status: number;
};

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const supabaseAccessToken = session?.supabaseAccessToken;

  if (!supabaseAccessToken) {
    return new Response('Authentication Error', { status: 401 });
  }
  const supabase = await supabaseServer(supabaseAccessToken);

  const { title, sub_title, markdown, tags } = (await req.json()) as Post;
  const { data, error } = await supabase
    .from('posts')
    .insert([
      { author: session.user.name ?? '', title, sub_title, markdown, tags },
    ])
    .select();
  if (error) {
    return new Response('Not Found Error', { status: 404 });
  }
  const response: Array<PostDetail> = data;
  return NextResponse.json(response);
}
