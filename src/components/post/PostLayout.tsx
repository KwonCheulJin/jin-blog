import { ReactNode } from 'react';
import Link from '@/components/template/Link';
import PageTitle from '@/components/template/PageTitle';

import ScrollTopAndComment from '@/components/template/ScrollTopAndComment';
import Image from '@/components/template/Image';
import Tag from '@/components/template/Tag';
import { v1 } from 'uuid';
import { AdjacentPost } from '@/types';

const postDateTemplate: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  timeZone: 'Asia/Seoul',
};

interface LayoutProps {
  title: string;
  author: string;
  tags: string[];
  children: ReactNode;
  created_at: string;
  next: AdjacentPost | null;
  prev: AdjacentPost | null;
}

export default function PostLayout({
  title,
  author,
  tags,
  children,
  created_at,
  next,
  prev,
}: LayoutProps) {
  return (
    <>
      <ScrollTopAndComment />
      <article>
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          <header className="pb-6 pt-6 lg:pb-0">
            <div className="space-y-1 text-center">
              <dl className="space-y-10">
                <div>
                  <dt className="sr-only">Published on</dt>
                  <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                    <time>
                      {new Date(created_at).toLocaleDateString(
                        'ko-KR',
                        postDateTemplate,
                      )}
                    </time>
                  </dd>
                </div>
              </dl>
              <div>
                <PageTitle>{title}</PageTitle>
              </div>
            </div>
          </header>
          <div className="grid grid-cols-4 grid-rows-[auto_1fr] gap-x-6 divide-y-0 divide-gray-200 dark:divide-gray-700 lg:block lg:divide-y lg:border-none lg:pb-8">
            <dl className="border-b border-gray-200 pb-10 pt-11 dark:border-gray-700 lg:border-none lg:pt-6">
              <dt className="sr-only">Authors</dt>
              <dd>
                <ul className="block space-x-0 space-y-8 sm:space-x-12 lg:flex lg:flex-wrap lg:justify-center lg:gap-4">
                  <li className="flex items-center space-x-2">
                    <Image
                      src="/images/my-profile.webp"
                      width={38}
                      height={38}
                      alt="avatar"
                      className="h-10 w-10 rounded-full"
                    />
                    <dl className="whitespace-nowrap font-medium">
                      <dt className="sr-only">Name</dt>
                      <dd className="leading-10 text-gray-900 dark:text-gray-100">
                        {author}
                      </dd>
                    </dl>
                  </li>
                </ul>
              </dd>
            </dl>
            <div className="col-span-3 row-span-2 divide-gray-200 pb-0 dark:divide-gray-700">
              <div className="prose max-w-none pt-10 dark:prose-invert lg:pb-8">
                {children}
              </div>
            </div>
            <footer>
              <div className="col-start-1 row-start-2 divide-y divide-gray-200 dark:divide-gray-700 md:text-sm md:font-medium md:leading-5">
                {tags && (
                  <div className="py-8 md:py-4">
                    <h2 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                      Tags
                    </h2>
                    <div className="flex flex-wrap">
                      {tags.map(tag => (
                        <Tag key={v1()} text={tag} />
                      ))}
                    </div>
                  </div>
                )}
                {(next || prev) && (
                  <div className="block space-y-8 py-8 md:flex md:justify-between md:py-4">
                    {prev && prev.id && (
                      <div>
                        <h2 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                          Previous Article
                        </h2>
                        <div className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                          <Link href={`/posts/${prev.id}`}>{prev.title}</Link>
                        </div>
                      </div>
                    )}
                    {next && next.id && (
                      <div>
                        <h2 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                          Next Article
                        </h2>
                        <div className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                          <Link href={`/posts/${next.id}`}>{next.title}</Link>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className="pt-8 md:pt-4">
                <Link
                  href="/posts"
                  className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                  aria-label="Back to the blog"
                >
                  &larr; Back to the blog
                </Link>
              </div>
            </footer>
          </div>
        </div>
      </article>
    </>
  );
}
