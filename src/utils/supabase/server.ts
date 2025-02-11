import { SUPABASE_ANON_KEY, SUPABASE_URL } from '@/lib/constants';
import { Database } from '@/types/supabase';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export function supabaseServer(
  cookieStore: ReturnType<typeof cookies>,
  token?: string,
) {
  const globalHeaders = token
    ? {
        global: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      }
    : undefined;
  return createServerClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY, {
    ...globalHeaders,
    cookies: {
      async getAll() {
        return (await cookieStore).getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(async ({ name, value, options }) =>
            (await cookieStore).set(name, value, options),
          );
        } catch {
          // The `setAll` method was called from a Server Component.
          // This can be ignored if you have middleware refreshing
          // user sessions.
        }
      },
    },
  });
}
