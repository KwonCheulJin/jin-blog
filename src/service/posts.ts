import { DataResponse } from '@/app/api/post/route';
import { AdjacentPost, PostDetail, SimplePost } from '@/types';

export type Post = {
  title: string;
  description: string;
  date: string;
  category: string;
  path: string;
  image: string;
  featured: boolean;
};

export type PostData = PostDetail & {
  next: AdjacentPost | null;
  prev: AdjacentPost | null;
};

const baseUrl =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'http://127.0.0.1:8000';

export async function getPostDetail(id: string) {
  const data = await fetch(`${baseUrl}/api/post/${id}`, {
    headers: {
      Accept: 'application/json',
    },
    method: 'GET',
    next: {
      revalidate: 0,
    },
  });
  const post = (await data.json()) as PostDetail;
  return post;
}

export async function getAllPosts() {
  const data = await fetch(`${baseUrl}/api/post`, {
    headers: {
      Accept: 'application/json',
    },
    method: 'GET',
    next: {
      revalidate: 0,
    },
  });
  const posts = (await data.json()) as SimplePost[];
  return posts.sort((a, b) => (a.created_at > b.created_at ? -1 : 1));
}

export async function getAllTags() {
  const posts = await getAllPosts();
  const tagsArray = posts.map(result => result.tags).flat();
  const tags = tagsArray.reduce((acc: Record<string, number>, cur: string) => {
    acc[cur] ? (acc[cur] += 1) : (acc[cur] = 1);
    return acc;
  }, {});
  return tags;
}

type AllPostsData = {
  page?: string;
  per_page?: string;
  tag?: string;
};

export const DEFAULT_PAGE = '1';
export const DEFAULT_PER_PAGE = '5';

export async function getAllPostsData({ page, per_page, tag }: AllPostsData) {
  const posts = await getAllPosts();

  const start =
    (Number(page ?? DEFAULT_PAGE) - 1) * Number(per_page ?? DEFAULT_PER_PAGE);
  const end = start + Number(per_page ?? DEFAULT_PER_PAGE);

  const filteredPosts = tag
    ? posts.filter(post => post.tags.map(tag => tag).includes(tag))
    : posts;

  const entries = filteredPosts.slice(start, end);

  return {
    start,
    end,
    entries,
    posts: filteredPosts,
  };
}

export async function getPostData(id: string): Promise<PostData> {
  const { author, markdown } = await getPostDetail(id);
  const posts = await getAllPosts();

  const targetPost = posts.find(post => post.id === id);
  if (!targetPost) {
    throw new Error(`${id}에 해당하는 포스트를 찾을 수 없음`);
  }

  const index = posts.indexOf(targetPost);

  const next =
    index > 0
      ? { id: posts[index - 1].id, title: posts[index - 1].title }
      : null;
  const prev =
    index < posts.length - 1
      ? { id: posts[index + 1].id, title: posts[index + 1].title }
      : null;
  const post = { ...targetPost, author, markdown, next, prev };
  return post;
}

export type AddPostType = {
  title: string;
  sub_title: string;
  markdown: string;
  tags: string[];
};

export async function AddPost({
  title,
  sub_title,
  markdown,
  tags,
}: AddPostType) {
  const response = await fetch('/api/post', {
    method: 'POST',
    body: JSON.stringify({
      title,
      sub_title,
      markdown,
      tags,
    }),
  });
  const result = (await response.json()) as DataResponse;
  return result;
}
