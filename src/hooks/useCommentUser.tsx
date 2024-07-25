import { queries } from '@/service/queries';
import { ThreadData } from '@liveblocks/client';
import { useQuery } from '@tanstack/react-query';

export default function useCommentUser(thread: ThreadData) {
  const commentOwner = thread.comments[0].userId;
  const { data: user, isLoading } = useQuery(
    queries.users.userInfo(commentOwner),
  );

  return { user, isLoading };
}
