import { supabaseAnonKey, supabaseUrl } from '@/lib/constants';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

export function createSupabaseAuthClient(token: string): SupabaseClient {
  return createClient(supabaseUrl, supabaseAnonKey, {
    global: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });
}

export function createSupabaseClient(): SupabaseClient {
  return createClient(supabaseUrl, supabaseAnonKey);
}
