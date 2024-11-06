import { createQueryKeys } from '@lukemorales/query-key-factory';

export const posts = createQueryKeys('posts', {
  all: null,
  detail: (postId: string) => ({
    queryKey: [postId],
    queryFn: () => {},
  }),
});
