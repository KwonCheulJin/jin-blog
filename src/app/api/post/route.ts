import { authOptions } from '@/app/api/auth/[...nextauth]/route';
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
    .from('posts')
    .select('*')
    .eq('id', 'bd03226f-9dbe-4cb2-bcfc-e3b2a8090716');

  return NextResponse.json(data);
}
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
