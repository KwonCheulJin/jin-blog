import { UserInfo } from '@/types/liveblocks';

export async function getUserInfo() {
  const response = await fetch(`/api/user-info`);

  if (!response.ok) {
    throw new Error('Problem resolving users');
  }

  const users = (await response.json()) as Array<UserInfo>;
  return users;
}
