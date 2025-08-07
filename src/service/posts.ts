import { DEFAULT_PAGE, DEFAULT_PER_PAGE } from '@/lib/constants';
import { postRepository } from '@/repositories/postRepository';
import { AllPostsData, Post, PostData } from '@/types';
import { notFound } from 'next/navigation';

export async function getPostDetail(id: string) {
  return await postRepository.getPostDetail(id);
}

export async function getAllPostsSorted() {
  const posts = await postRepository.getAllPosts();
  return posts.sort((a, b) => (a.created_at > b.created_at ? -1 : 1));
}

export async function getAllPosts() {
  return await getAllPostsSorted();
}

export async function createPost(
  postData: Post,
  authorName: string,
  supabaseAccessToken: string | undefined,
) {
  const newPostData = {
    ...postData,
    author: authorName,
  };
  return await postRepository.createPost(newPostData, supabaseAccessToken);
}

export async function getAllPostsStatic() {
  const posts = await postRepository.getAllPostsStatic();
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
  const postDetail = await getPostDetail(id);
  if (!postDetail) {
    notFound();
  }
  const posts = await getAllPostsSorted();

  const targetPost = posts.find(post => post.id === id);
  if (!targetPost) {
    notFound();
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
  const post = {
    ...targetPost,
    author: postDetail?.author,
    markdown: postDetail?.markdown,
    next,
    prev,
  };
  return post;
}
