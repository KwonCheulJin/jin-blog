import { getSupabaseBrowserClient } from '@/utils/supabase/client';
import { useMemo } from 'react';

export default function useSupabaseClient(token?: string) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(() => getSupabaseBrowserClient(token), []);
}
