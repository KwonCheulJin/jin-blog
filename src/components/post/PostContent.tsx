import MarkdownViewer from '@/components/post/MarkdownViewer';
import { PostData } from '@/service/posts';
import { AiTwotoneCalendar } from 'react-icons/ai';

type Props = {
  post: PostData;
};

export default function PostContent({ post }: Props) {
  const { title, description, date, content } = post;
  return (
    <section className="flex flex-col p-8 md:p-4">
      <div className="text-primary-500 flex items-center self-end dark:text-primaryDark">
        <AiTwotoneCalendar />
        <p className="ml-2 font-semibold">
          {date.toLocaleString('ko-KR', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            timeZone: 'UTC',
          })}
        </p>
      </div>
      <h1 className="mt-4 text-4xl font-bold text-dark dark:text-light">
        {title}
      </h1>
      <p className="mt-4 text-xl font-bold text-dark dark:text-light">
        {description}
      </p>
      <div className="border-primary-500 mt-4 mb-8 w-80 border-2 dark:border-primaryDark"></div>
      <MarkdownViewer content={content} />
    </section>
  );
}
