import { createSupabaseClient } from '@/service/supabase';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  _: NextRequest,
  { params: { slug } }: { params: { slug: string } },
) {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('id', slug)
    .single();

  if (error) {
    return new NextResponse('Not Found', { status: 404 });
  }
  return NextResponse.json(data);
}
