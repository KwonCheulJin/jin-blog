'use client';
import Link from '@/components/template/Link';
import PageTitle from '@/components/template/PageTitle';
import { ReactNode } from 'react';

import TimeAgoContainer from '@/components/post/TimeAgoContainer';
import Image from '@/components/template/Image';
import ScrollTopAndComment from '@/components/template/ScrollTopAndComment';
import Tag from '@/components/template/Tag';
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
                    <time className="ml-2 text-primary-500">
                      (<TimeAgoContainer datetime={created_at} />)
                    </time>
                  </dd>
                </div>
              </dl>
              <div>
                <PageTitle>{title}</PageTitle>
              </div>
            </div>
          </header>
          <div className="block gap-x-6 divide-y divide-gray-200 border-none pb-8 dark:divide-gray-700 lg:grid lg:grid-cols-4 lg:grid-rows-[auto_1fr] lg:divide-y-0">
            <dl className="border-b border-gray-200 pb-8 pt-4 dark:border-gray-700 lg:border-none lg:pb-4 lg:pt-10">
              <dt className="sr-only">Authors</dt>
              <dd>
                <ul className="flex flex-wrap justify-center gap-4 space-x-12 space-y-8 lg:block lg:space-x-0">
                  <li className="flex items-center space-x-2">
                    <Image
                      src="https://iozhvnavvkkqttsrqiyc.supabase.co/storage/v1/object/public/images/author.png"
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
              <div className="prose max-w-none pb-8 pt-10 dark:prose-invert">
                {children}
              </div>
            </div>
            <footer>
              <div className="col-start-1 row-start-2 divide-y divide-gray-200 text-sm font-medium leading-5 dark:divide-gray-700">
                {tags && (
                  <div className="py-4 lg:py-8">
                    <h2 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                      Tags
                    </h2>
                    <div className="flex flex-wrap">
                      {tags.map(tag => (
                        <Tag key={tag} text={tag} />
                      ))}
                    </div>
                  </div>
                )}
                {(next || prev) && (
                  <div className="flex justify-between gap-4 space-y-0 py-4 md:space-y-8 lg:block lg:py-8">
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
              <div className="pt-4 lg:pt-8">
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
