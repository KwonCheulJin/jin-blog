import Link from 'next/link';
import Layout from './Layout';

export default function Footer() {
  return (
    <footer className="w-full border-t-2 border-solid border-dark text-lg font-medium dark:border-light dark:text-light sm:text-base">
      <Layout className="flex items-center justify-between py-8 lg:flex-col lg:py-6">
        <span>{new Date().getFullYear()} &copy; All Right Reserved</span>
        <div className="flex items-center lg:py-2">
          Design{' '}
          <span className="text-primary-500 px-1 text-2xl dark:text-primaryDark">
            &#9825;
          </span>
          by&nbsp;{' '}
          <Link
            href="https://www.youtube.com/watch?v=Yw7yWHigGKI&list=WL&index=22"
            target="_blank"
            className="underline underline-offset-2"
          >
            CodeBucks
          </Link>
        </div>
        <div className="flex items-center">
          Build with{' '}
          <span className="text-primary-500 px-1 text-2xl dark:text-primaryDark">
            &#9825;
          </span>
          by&nbsp; JIN
        </div>
      </Layout>
    </footer>
  );
}
