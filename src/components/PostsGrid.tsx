import { Post } from '@/service/posts'
import PostCard from './PostCard'

type Props = {
  posts: Post[]
}

export default async function PostsGrid({posts}:Props) {

  const postCardList = posts.map((post, index) => (
    <li key={index}>
      <PostCard
        post={post}
      />
    </li>
  ))

  return (
    <ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
      {postCardList}
    </ul>
  )
}
