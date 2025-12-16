import { generateAnonymousColor, generateAnonymousName, getUserColor } from '@/lib/utils';
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
  // 익명 사용자인 경우 해당 ID로 익명 사용자 정보 생성
  if (userId.startsWith('anonymous-')) {
    return createAnonymousUser(userId);
  }

  const commentUsers: Array<Liveblocks['UserMeta']> = users.map(user => ({
    id: user.email,
    info: { name: user.name, avatar: user.image, color: getUserColor(user.id) },
  }));
  return commentUsers.find(u => u.id === userId) || null;
}

// 고유한 익명 사용자 생성 (세션별로 고유한 ID 부여)
export function createAnonymousUser(sessionId?: string) {
  const uniqueId = sessionId || `anonymous-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

  // seed 기반으로 일관된 아바타 인덱스 생성
  let sum = 0;
  for (let i = 0; i < uniqueId.length; i++) {
    sum += uniqueId.charCodeAt(i);
  }
  const avatarIndex = (sum % 10) + 1;

  return {
    id: uniqueId,
    info: {
      name: generateAnonymousName(uniqueId),
      color: generateAnonymousColor(uniqueId),
      avatar: `https://liveblocks.io/avatars/avatar-${avatarIndex}.png`,
    },
  };
}

// 기존 호환성을 위한 기본 익명 사용자
export const anonymousUser = createAnonymousUser('default-anonymous');
