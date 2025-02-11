import { PostDetail } from '@/types';
import { supabaseServer } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const cookieStore = cookies();
  const supabase = supabaseServer(cookieStore);
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('id', slug)
    .single();

  if (error) {
    return new NextResponse('Not Found', { status: 404 });
  }
  return NextResponse.json<PostDetail>(data);
}
