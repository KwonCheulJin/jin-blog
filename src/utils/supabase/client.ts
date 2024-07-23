import { SUPABASE_ANON_KEY, SUPABASE_URL } from '@/lib/constants';
import { Database } from '@/types/supabase';
import { createBrowserClient } from '@supabase/ssr';
import { SupabaseClient, createClient } from '@supabase/supabase-js';

export function createSupabaseAuthClient(token: string): SupabaseClient {
  return createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}

export function createSupabaseClient(): SupabaseClient {
  return createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}

export type TypedSupabaseClient = SupabaseClient<Database>
let client: TypedSupabaseClient | undefined;
export function getSupabaseBrowserClient(token?: string) {
  if (client) {
    return client;
  }

  client = createBrowserClient<Database>(
    SUPABASE_URL, SUPABASE_ANON_KEY, token ? {
      global: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    } : undefined,
  )

  return client
}