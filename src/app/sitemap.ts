import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://jin-blog-blush.vercel.app',
      lastModified: new Date(),
    },
    {
      url: 'https://jin-blog-blush.vercel.app/about',
      lastModified: new Date(),
    },
    {
      url: 'https://jin-blog-blush.vercel.app/posts',
      lastModified: new Date(),
    },
    {
      url: 'https://jin-blog-blush.vercel.app/contact',
      lastModified: new Date(),
    },
  ];
}
