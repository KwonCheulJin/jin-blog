'use client';
import Link from '@/components/template/Link';
import { DEFAULT_PAGE, DEFAULT_PER_PAGE } from '@/service/posts';
import { useSearchParams } from 'next/navigation';
import { v1 } from 'uuid';
type Props = {
  tags: Record<string, number>;
};
export default function TagList({ tags }: Props) {
  const searchParams = useSearchParams();

  const targetTag = searchParams.get('tag') ?? '';

  const tagKeys = Object.keys(tags);
  const sortedTags = tagKeys.sort((a, b) => tags[b] - tags[a]);
  return (
    <div className="h-full max-h-screen min-w-[300px] max-w-[300px] flex-wrap rounded pt-2 sm:hidden">
      <div className="px-6 py-4">
        {targetTag === '' ? (
          <h3 className="font-bold uppercase text-primary-500">All Posts</h3>
        ) : (
          <Link
            href={`/posts`}
            className="font-bold uppercase text-gray-700 hover:text-primary-500 dark:text-gray-300 dark:hover:text-primary-500"
          >
            All Posts
          </Link>
        )}
        <div className="h-full max-h-[calc(100vh-203px)] overflow-auto">
          <ul>
            {sortedTags.map(tag => {
              return (
                <li key={v1()} className="my-3">
                  {targetTag === tag ? (
                    <h3 className="inline px-3 py-2 text-sm font-bold uppercase text-primary-500">
                      {`${tag} (${tags[tag]})`}
                    </h3>
                  ) : (
                    <Link
                      href={`/posts?page=${DEFAULT_PAGE}&per_page=${DEFAULT_PER_PAGE}&tag=${tag.replace(
                        / /g,
                        '%20',
                      )}`}
                      className="px-3 py-2 text-sm font-medium uppercase text-gray-500 hover:text-primary-500 dark:text-gray-300 dark:hover:text-primary-500"
                      aria-label={`View posts tagged ${tag}`}
                    >
                      {`${tag} (${tags[tag]})`}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
