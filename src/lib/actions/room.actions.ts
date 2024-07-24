'use server';

import { liveblocks } from '@/lib/liveblocks';
import { parseStringify } from '@/lib/utils';
import { RoomAccesses, RoomData } from '@liveblocks/node';
import { nanoid } from 'nanoid';
import { revalidatePath } from 'next/cache';

type CreateCommentParams = {
  userId: string;
  email: string;
};

type CommentParams = {
  roomId: string;
  userId: string;
};
export const createComment = async ({ userId, email }: CreateCommentParams) => {
  console.log('🚀 ~ createComment ~ { userId, email }:', { userId, email });
  const roomId = nanoid();

  try {
    const metadata = {
      creatorId: userId,
      email,
      title: 'Untitled',
    };

    const usersAccesses: RoomAccesses = {
      [email]: ['room:write'],
    };
    const room = await liveblocks.createRoom(roomId, {
      defaultAccesses: [],
      usersAccesses,
      metadata,
    });
    console.log('🚀 ~ createComment ~ room:', room);

    revalidatePath('/posts/*');

    return parseStringify(room) as RoomData;
  } catch (error) {
    console.log(`Error happened while creating a room ${error}`);
  }
};

export const getComment = async ({ roomId, userId }: CommentParams) => {
  try {
    const room = await liveblocks.getRoom(roomId);

    const hasAccess = Object.keys(room.usersAccesses).includes(userId);

    if (!hasAccess) {
      throw new Error('You do not have access to this comment');
    }
  } catch (error) {
    console.log(`Error happened while getting a room ${error}`);
  }
};
