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
  console.log('🚀 ~ file: route.ts:13 ~ data, error:', data, error);

  return NextResponse.json(data);
}
