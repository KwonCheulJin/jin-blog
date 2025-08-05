import { DEFAULT_PAGE, DEFAULT_PER_PAGE } from '@/lib/constants';
import { postApi } from '@/service/api/postApi';
import { AllPostsData, PostData } from '@/types';
import { notFound } from 'next/navigation';

export async function getPostDetail(id: string) {
  const { data: post } = await postApi.postDetail(id);
  return post;
}

export async function getAllPosts() {
  const { data: posts } = await postApi.allPost();
  if (!posts || !Array.isArray(posts)) {
    return [];
  }
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
  const posts = await getAllPosts();

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
