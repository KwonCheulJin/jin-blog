import { getAllPostsSorted } from '@/service/posts';
import { BASE_URL } from '@/lib/constants';
import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = (await getAllPostsSorted()).map(({ id, created_at }) => ({
    url: `${BASE_URL}/posts/${id}`,
    lastModified: new Date(created_at).toISOString(),
  }));

  const routes = ['', '/about', '/posts'].map(route => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date().toISOString(),
  }));

  return [...routes, ...posts];
}
