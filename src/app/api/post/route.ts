import { authOptions } from '@/service/auth';
import { createSupabaseAuthClient } from '@/service/supabase';
import { Post } from '@/types';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const supabaseAccessToken = session?.supabaseAccessToken;

  if (!supabaseAccessToken) {
    return new Response('Authentication Error', { status: 401 });
  }
  const supabase = createSupabaseAuthClient(supabaseAccessToken);

  const { title, subTitle, markdown, tags } = (await req.json()) as Post;
  const { data, error } = await supabase
    .from('posts')
    .insert([
      { author: session.user.name, title, sub_title: subTitle, markdown, tags },
    ])
    .select();

  return NextResponse.json(data);
}
// 'bd03226f-9dbe-4cb2-bcfc-e3b2a8090716'
