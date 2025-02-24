import TimeAgoContainer from '@/components/post/TimeAgoContainer';
import Link from '@/components/template/Link';
import Tag from '@/components/template/Tag';
import { MAX_LENGTH } from '@/lib/constants';
import { SimplePost } from '@/types';
import { formatDate } from 'pliny/utils/formatDate';
import { v1 } from 'uuid';

type Props = {
  posts: SimplePost[];
};
export default function PostList({ posts }: Props) {
  const EMPTY_LENGTH = MAX_LENGTH - posts.length;
  return (
    <ul>
      {posts.map(post => {
        const { id, created_at, title, sub_title, tags } = post;
        return (
          <li
            key={v1()}
            className="min-w-[724px] max-w-[724px] py-5 xl:min-w-[436px] xl:max-w-[436px] xs:min-w-[350px] xs:max-w-[350px]"
          >
            <article className="flex flex-col space-y-2">
              <dl>
                <dt className="sr-only">Published on</dt>
                <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                  <time dateTime={created_at}>
                    {formatDate(created_at, 'ko-KR')}
                  </time>
                  <time className="ml-2 text-primary-500">
                    (<TimeAgoContainer datetime={created_at} />)
                  </time>
                </dd>
              </dl>
              <div className="space-y-3">
                <div>
                  <h2 className="text-2xl font-bold leading-8 tracking-tight">
                    <Link
                      href={`/posts/${id}`}
                      className="break-keep text-gray-900 dark:text-gray-100"
                    >
                      {title}
                    </Link>
                  </h2>
                  <div className="flex flex-wrap">
                    {tags.map(tag => (
                      <Tag key={tag} text={tag} />
                    ))}
                  </div>
                </div>
                <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                  {sub_title}
                </div>
              </div>
            </article>
          </li>
        );
      })}
      {Array.from({ length: EMPTY_LENGTH }).map(_ => (
        <li
          key={v1()}
          className="h-[164px] min-w-[724px] max-w-[724px] py-5 xl:min-w-[436px] xl:max-w-[436px] xs:min-w-[350px] xs:max-w-[350px]"
        ></li>
      ))}
    </ul>
  );
}
