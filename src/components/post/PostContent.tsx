import MarkdownViewer from '@/components/post/MarkdownViewer';
import { PostData } from '@/service/posts';
import { AiTwotoneCalendar } from 'react-icons/ai';

type Props = {
  post: PostData;
};

export default function PostContent({ post }: Props) {
  const { title, description, date, content } = post;
  return (
    <section className="flex flex-col p-8">
      <div className="flex items-center self-end text-primary dark:text-primaryDark">
        <AiTwotoneCalendar />
        <p className="font-semibold ml-2">
          {date.toLocaleString('ko-KR', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            timeZone: 'UTC',
          })}
        </p>
      </div>
      <h1 className="text-4xl font-bold text-dark dark:text-light">{title}</h1>
      <p className="text-xl font-bold mt-2 text-dark dark:text-light">{description}</p>
      <div className="w-80 border-2 border-primary dark:border-primaryDark mt-4 mb-8"></div>
      <MarkdownViewer content={content} />
    </section>
  );
}
