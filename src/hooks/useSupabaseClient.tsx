import { getSupabaseBrowserClient } from '@/utils/supabase/client';
import { useMemo } from 'react';

export default function useSupabaseClient(token?: string) {
  return useMemo(() => getSupabaseBrowserClient(token), [token]);
}
