import { getUserColor } from '@/lib/utils';
import { userApi } from '@/service/api/userApi';
import { User } from '@/types';

export async function getUserInfo(userId: string) {
  const { data: user } = await userApi.userInfo(userId);
  return user;
}

type getUserParams = {
  users: Array<User>;
  userId: string;
};
export function getUser({ users, userId }: getUserParams) {
  const commentUsers: Array<Liveblocks['UserMeta']> = users.map(user => ({
    id: user.email,
    info: { name: user.name, avatar: user.image, color: getUserColor(user.id) },
  }));
  const allUsers = [...commentUsers, anonymousUser];
  return allUsers.find(u => u.id === userId) || null;
}

export const anonymousUser = {
  id: `anonuymous@example.com`,
  info: {
    name: 'Anonymous',
    color: '#8594F0',
    avatar: `https://liveblocks.io/avatars/avatar-6.png`,
  },
};
