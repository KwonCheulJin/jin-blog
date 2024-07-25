import { posts } from '@/service/queries/posts';
import { users } from '@/service/queries/users';
import { mergeQueryKeys } from '@lukemorales/query-key-factory';

export const queries = mergeQueryKeys(posts, users);
