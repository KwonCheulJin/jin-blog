import MultiCarousel from './MultiCarousel';
import { getFeaturedPosts } from '@/service/posts';

export default function CarouselPosts() {
  const posts = getFeaturedPosts();

  return (
    <section className="mt-28 md:mt-32">
      <h2 className="text-2xl font-bold my-2">Featured Posts</h2>
      <MultiCarousel posts={posts} />
    </section>
  );
}
