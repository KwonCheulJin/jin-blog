import matter from 'gray-matter';
import { readdirSync, readFileSync } from 'fs';

export type Post = {
  title: string;
  description: string;
  date: Date;
  category: string;
  path: string;
  image: string;
  featured: boolean;
};

export type PostData = Post & {
  content: string;
  next: Post | null;
  prev: Post | null;
};

const FOLDER = 'data/posts';

export const getAllPosts = () => {
  const files = readdirSync(FOLDER);
  const markdownPosts = files.filter(file => file.endsWith('.md'));
  const posts = markdownPosts
    .map(fileName => {
      const fileContents = readFileSync(`${FOLDER}/${fileName}`, 'utf-8');
      const matterResult = matter(fileContents);
      return {
        title: matterResult.data.title as string,
        description: matterResult.data.description as string,
        date: matterResult.data.date as Date,
        category: matterResult.data.category as string,
        path: matterResult.data.path as string,
        image: matterResult.data.image as string,
        featured: matterResult.data.featured as boolean,
      };
    })
    .sort((a, b) => (a.date > b.date ? -1 : 1));

  return posts;
};

export function getFeaturedPosts(): Post[] {
  return getAllPosts().filter(post => post.featured);
}

export function getNonFeaturedPosts(): Post[] {
  return getAllPosts().filter(post => !post.featured);
}

export function getPostData(fileName: string): PostData {
  const fileContents = readFileSync(`${FOLDER}/${fileName}.md`, 'utf-8');
  const posts = getAllPosts();
  const post = posts.find(post => post.path === fileName);
  if (!post) {
    throw new Error(`${fileName}에 해당하는 포스트를 찾을 수 없음`);
  }

  const index = posts.indexOf(post);
  const next = index > 0 ? posts[index - 1] : null;
  const prev = index < posts.length ? posts[index + 1] : null;
  const content = matter(fileContents).content;
  return { ...post, content, next, prev };
}
