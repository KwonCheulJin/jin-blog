'use client';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import { Post } from '@/service/posts';
import PostCard from './PostCard';

type Props = {
  posts: Post[];
};

export default function MultiCarousel({ posts }: Props) {
  const postCardList = posts.map((post, index) => <PostCard key={index} post={post} />);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 4,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <Carousel
      autoPlay
      autoPlaySpeed={2000}
      infinite
      itemClass="m-2"
      pauseOnHover
      responsive={responsive}
    >
      {postCardList}
    </Carousel>
  );
}
