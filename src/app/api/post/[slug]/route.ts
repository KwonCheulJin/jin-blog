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
    return NextResponse.json({ data: null, status: 404 });
  }
  return NextResponse.json({ data, status: 200 });
}
