'use client'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import { Post } from '@/service/posts'
import PostCard from './PostCard'

type Props = {
  posts: Post[]
}

export default function MultiCarousel({posts}:Props) {

  const postCardList = posts.map((post, index) => (
    <PostCard
      key={index}
      post={post}
    />
  ))

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 1536, min: 1024 },
      items: 4
    },
    desktop: {
      breakpoint: { max: 1024, min: 768 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 768, min: 640 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 640, min: 0 },
      items: 1,
    }
  };

  return (
    <Carousel
      additionalTransfrom={0}
      arrows
      autoPlay
      autoPlaySpeed={2000}
      centerMode={false}
      className=""
      containerClass="container-with-dots"
      dotListClass=""
      draggable
      focusOnSelect={false}
      infinite
      itemClass="m-2"
      keyBoardControl
      minimumTouchDrag={80}
      pauseOnHover
      renderArrowsWhenDisabled={false}
      renderButtonGroupOutside={false}
      renderDotsOutside={false}
      rewind={false}
      rewindWithAnimation={false}
      rtl={false}
      shouldResetAutoplay
      showDots={false}
      sliderClass=""
      slidesToSlide={2}
      swipeable
      responsive={responsive}
    >
      {postCardList}
    </Carousel>
  )
}
