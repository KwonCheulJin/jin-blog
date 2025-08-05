import { authOptions } from '@/service/auth';
import { supabaseServer } from '@/utils/supabase/server';
import { getServerSession } from 'next-auth';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

// 허용된 이미지 MIME 타입들
const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'image/gif',
];

// 최대 파일 크기 (5MB)
const MAX_FILE_SIZE = 5 * 1024 * 1024;

export async function POST(req: NextRequest) {
  const cookieStore = cookies();
  const session = await getServerSession(authOptions);
  const supabaseAccessToken = session?.supabaseAccessToken;

  if (!supabaseAccessToken) {
    return new Response('Authentication Error', { status: 401 });
  }
  const supabase = await supabaseServer(supabaseAccessToken);

  try {
    const formData = await req.formData();
    const file = formData.get('image') as File;

    // 파일 존재 여부 검증
    if (!file) {
      return NextResponse.json({ error: 'No files received.' }, { status: 400 });
    }

    // MIME 타입 검증
    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return NextResponse.json({
        error: `Invalid file type. Allowed types: ${ALLOWED_MIME_TYPES.join(', ')}`,
      }, { status: 400 });
    }

    // 파일 크기 검증
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({
        error: `File too large. Maximum size: ${MAX_FILE_SIZE / (1024 * 1024)}MB`,
      }, { status: 400 });
    }

    // 파일 확장자 추출 (보안 강화)
    const fileExtension = file.type.split('/')[1];
    if (!fileExtension) {
      return NextResponse.json({ error: 'Invalid file format.' }, { status: 400 });
    }

    const { data, error } = await supabase.storage
      .from('images')
      .upload(`post_${Date.now()}.${fileExtension}`, file);

    if (error) {
      console.error('Upload error:', error);
      return NextResponse.json({ error: 'Upload failed.' }, { status: 500 });
    }

    const { data: url } = supabase.storage
      .from('images')
      .getPublicUrl(data?.path ?? '');

    return Response.json(url);
  } catch (error) {
    console.error('File upload error:', error);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
