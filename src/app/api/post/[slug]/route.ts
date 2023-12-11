import { createSupabaseClient } from '@/service/supabase';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params: { slug } }: { params: { slug: string } },
) {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('id', slug)
    .single();

  return NextResponse.json(data);
}
