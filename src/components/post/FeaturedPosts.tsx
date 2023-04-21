import { getFeaturedPosts } from '@/service/posts';
import FeaturedPost from './FeaturedPost';

export default function FeaturedPosts() {
  const posts = getFeaturedPosts();

  const featuredPosts = posts.map((post, index) => {
    if (index <= 1) {
      return <FeaturedPost key={`${post.path}-${index}`} post={post} />;
    } else {
      return <></>;
    }
  });

  return (
    <ul
      key="feature-post"
      className="grid grid-cols-2 gap-16 lg:gap-8 lg:grid-cols-1 lg:gap-y-12 md:grid-cols-1 md:gap-y-12"
    >
      {featuredPosts}
    </ul>
  );
}
