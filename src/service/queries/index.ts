import { posts } from '@/service/queries/posts';
import { mergeQueryKeys } from '@lukemorales/query-key-factory';

export const queries = mergeQueryKeys(posts);