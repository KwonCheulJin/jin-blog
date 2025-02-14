import { SUPABASE_ANON_KEY, SUPABASE_URL } from '@/lib/constants';
import { Database } from '@/types/supabase';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function supabaseServer(token?: string) {
  const cookieStore = await cookies();
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
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options),
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
