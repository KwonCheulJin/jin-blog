import { getFeaturedPosts } from '@/service/posts';
import FeaturedPost from './FeaturedPost';

export default function FeaturedPosts() {
  const posts = getFeaturedPosts();

  const featuredPosts = posts.map((post, index) => {
    if (index <= 3) {
      return <FeaturedPost key={post.path} post={post} />;
    } else {
      return <></>;
    }
  });

  return <ul className="grid grid-cols-2 gap-16">{featuredPosts}</ul>;
}
