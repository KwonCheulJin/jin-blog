import Layout from './Layout';

export default function Footer() {
  return (
    <footer className="w-full border-2 border-solid border-dark font-medium text-lg">
      <Layout className="py-8 flex items-center justify-between">
        <span>{new Date().getFullYear()} &copy; All Right Reserved</span>
        <div className="flex items-center">
          Design <span className="text-primary text-2xl px-1">&#9825;</span>
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
          Build with <span className="text-primary text-2xl px-1">&#9825;</span>
          by&nbsp; JIN
        </div>
      </Layout>
    </footer>
  );
}
