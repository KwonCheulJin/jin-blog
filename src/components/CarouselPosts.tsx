import MultiCarousel from './MultiCarousel';
import { getNonFeaturedPosts } from '@/service/posts';

export default function CarouselPosts() {
  const posts = getNonFeaturedPosts();

  return (
    <section className="m-8">
      <h2 className="text-2xl font-bold my-2">You May Like</h2>
      <MultiCarousel posts={posts} />
    </section>
  );
}
