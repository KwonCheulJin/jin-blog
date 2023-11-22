import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { createClient } from '@supabase/supabase-js';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const supabaseAccessToken = session?.supabaseAccessToken;

  if (!supabaseAccessToken) {
    return new Response('Authentication Error', { status: 401 });
  }
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '',
    {
      global: {
        headers: {
          Authorization: `Bearer ${supabaseAccessToken}`,
        },
      },
    },
  );
  const formData = await req.formData();

  const file = formData.get('image') as File;
  if (!file) {
    return NextResponse.json({ error: 'No files received.' }, { status: 400 });
  }

  const { data, error } = await supabase.storage
    .from('images')
    .upload(`post_${Date.now()}.png`, file);
  const { data: url } = supabase.storage
    .from('images')
    .getPublicUrl(data?.path ?? '');

  return Response.json(url);
}
