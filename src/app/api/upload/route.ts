import { authOptions } from '@/service/auth';
import { createSupabaseAuthClient } from '@/service/supabase';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const supabaseAccessToken = session?.supabaseAccessToken;

  if (!supabaseAccessToken) {
    return new Response('Authentication Error', { status: 401 });
  }
  const supabase = createSupabaseAuthClient(supabaseAccessToken);

  const formData = await req.formData();

  const file = formData.get('image') as File;
  const formats = file.type.split('/')[1];

  if (!file) {
    return NextResponse.json({ error: 'No files received.' }, { status: 400 });
  }

  const { data, error } = await supabase.storage
    .from('images')
    .upload(`post_${Date.now()}.${formats}`, file);
  const { data: url } = supabase.storage
    .from('images')
    .getPublicUrl(data?.path ?? '');

  return Response.json(url);
}
