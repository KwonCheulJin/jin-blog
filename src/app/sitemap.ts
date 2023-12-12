import { getAllPosts } from '@/service/posts';
import { MetadataRoute } from 'next';
const URL = 'https://www.jin-blog.dev';
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const getSortedPostsData = await getAllPosts();
  const posts = getSortedPostsData.map(({ id, created_at }) => ({
    url: `${URL}/posts/${id}`,
    lastModified: new Date(created_at).toISOString(),
  }));

  const routes = ['', '/about', '/posts'].map(route => ({
    url: `${URL}${route}`,
    lastModified: new Date().toISOString(),
  }));

  return [...routes, ...posts];
}
