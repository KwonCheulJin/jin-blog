import { authOptions } from '@/service/auth';
import { getAllPostsSorted, createPost } from '@/service/posts';
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
    if (!session?.user?.name) {
      return new Response('Authentication Error', { status: 401 });
    }

    const postData = (await req.json()) as Post;
    const newPost = await createPost(postData, session.user.name);
    return NextResponse.json(newPost);
  } catch (error) {
    console.error('Error creating post:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
