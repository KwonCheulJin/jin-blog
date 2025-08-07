import { authOptions } from '@/service/auth';
import { createPost, getAllPostsSorted } from '@/service/posts';
import { Post } from '@/types';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    const posts = await getAllPostsSorted();
    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json([], { status: 500 });
  }
}

export type DataResponse<T> = {
  data: T | null;
  status: number;
};

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response('No session found', { status: 401 });
    }

    if (!session.user) {
      return new Response('No user in session', { status: 401 });
    }

    // HOST 권한 확인 (글 작성은 HOST만 가능)
    if (session.user.type !== 'HOST') {
      return new Response('Insufficient permissions', { status: 403 });
    }

    const supabaseAccessToken = session?.supabaseAccessToken;

    if (!supabaseAccessToken) {
      return new Response('No Supabase access token', { status: 401 });
    }

    const postData = (await req.json()) as Post;
    const newPost = await createPost(
      postData,
      session.user.name,
      supabaseAccessToken,
    );
    return NextResponse.json(newPost);
  } catch (error) {
    return new Response('Internal Server Error', { status: 500 });
  }
}
