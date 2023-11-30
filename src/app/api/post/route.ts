import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { createSupabaseClient } from '@/service/supabase';
import { Post } from '@/types';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const supabaseAccessToken = session?.supabaseAccessToken;

  if (!supabaseAccessToken) {
    return new Response('Authentication Error', { status: 401 });
  }
  const supabase = createSupabaseClient(supabaseAccessToken);

  const { title, subTitle, content, tags } = (await req.json()) as Post;
  const { data, error } = await supabase
    .from('posts')
    .insert([
      { author: session.user.name, title, sub_title: subTitle, content, tags },
    ])
    .select();

  return NextResponse.json(data);
}
