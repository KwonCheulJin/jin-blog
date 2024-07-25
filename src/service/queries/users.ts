import { getUserInfo } from '@/service/users';
import { createQueryKeys } from '@lukemorales/query-key-factory';

export const users = createQueryKeys('users', {
  all: null,
  userInfo: (userId: string) => ({
    queryKey: [userId],
    queryFn: () => getUserInfo(userId),
  }),
});
