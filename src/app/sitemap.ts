import { getAllPosts } from '@/service/posts';
import { MetadataRoute } from 'next';
const URL = 'https://jin-blog-blush.vercel.app';
export default function sitemap(): MetadataRoute.Sitemap {
  const getSortedPostsData = getAllPosts();
  const posts = getSortedPostsData.map(({ path, date }) => ({
    url: `${URL}/posts/${path}`,
    lastModified: date,
  }));

  const routes = ['', '/about', '/posts', '/contact'].map((route) => ({
    url: `${URL}${route}`,
    lastModified: new Date().toISOString(),
  }));

  return [...routes, ...posts];
}
