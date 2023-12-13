export const MAX_LENGTH = 5;

// posts
export const baseUrl =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://www.jin-blog.dev/';

export const DEFAULT_PAGE = '1';
export const DEFAULT_PER_PAGE = '5';

// supabase
export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
export const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';
