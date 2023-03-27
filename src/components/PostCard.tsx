import { Post } from '@/service/posts';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  post: Post;
};
export default function PostCard({ post: { title, description, date, category, path } }: Props) {
  return (
    <Link href={`/posts/${path}`}>
      <article className="shadow-lg rounded-md overflow-hidden hover:shadow-xl">
        <Image
          className="w-full"
          src={`/images/posts/${path}.png`}
          alt={title}
          width={300}
          height={200}
        />
        <div className="flex flex-col items-center p-4">
          <time className="self-end">{date.toLocaleString()}</time>
          <h3 className="w-full truncate text-center text-lg font-bold">{title}</h3>
          <p className="w-full truncate text-center">{description}</p>
          <span className="bg-green-100 rounded-lg text-sm px-2 my-2">{category}</span>
        </div>
      </article>
    </Link>
  );
}
