import Layout from './Layout';

export default function Footer() {
  return (
    <footer className="w-full border-solid border-t-2 border-dark font-medium text-lg dark:text-light dark:border-light sm:text-base">
      <Layout className="py-8 flex items-center justify-between lg:flex-col lg:py-6">
        <span>{new Date().getFullYear()} &copy; All Right Reserved</span>
        <div className="flex items-center lg:py-2">
          Design <span className="text-primary dark:text-primaryDark text-2xl px-1">&#9825;</span>
          by&nbsp;{' '}
          <a
            href="https://www.youtube.com/watch?v=Yw7yWHigGKI&list=WL&index=22"
            target="_blank"
            className="underline underline-offset-2"
          >
            CodeBucks
          </a>
        </div>
        <div className="flex items-center">
          Build with{' '}
          <span className="text-primary dark:text-primaryDark text-2xl px-1">&#9825;</span>
          by&nbsp; JIN
        </div>
      </Layout>
    </footer>
  );
}
