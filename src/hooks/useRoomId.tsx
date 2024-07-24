import { createComment } from '@/lib/actions/room.actions';
import { queries } from '@/service/queries';
import { useQuery } from '@tanstack/react-query';

import { nanoid } from 'nanoid';
import { Session } from 'next-auth';
import { useEffect, useState } from 'react';

export default function useRoomId(session: Session | null) {
  const roomId = nanoid();
  const [id, setId] = useState('');
  const { data } = useQuery({
    ...queries.users.all,
    queryFn: async () =>
      await createComment({
        userId: session?.user.id ?? '',
        email: session?.user.email ?? '',
      }),
  });
  console.log('🚀 ~ useRoomId ~ data:', data);

  useEffect(() => {
    if (data) {
      setId(data.id);
    }
  }, [data]);

  return roomId;
}
