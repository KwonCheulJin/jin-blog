import Link from 'next/link';

type Props = {
  text: string;
};

export default function Tag({ text }: Props) {
  return (
    <Link
      href={`/posts?tag=${text}`}
      prefetch={false}
      className="mr-3 text-sm font-medium uppercase text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
    >
      {text}
    </Link>
  );
}
