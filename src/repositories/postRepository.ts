import { SUPABASE_ANON_KEY, SUPABASE_URL } from '@/lib/constants';
import { PostDetail, SimplePost } from '@/types';
import { supabaseServer } from '@/utils/supabase/server';
import { createClient } from '@supabase/supabase-js';

export const postRepository = {
  async getAllPosts(): Promise<SimplePost[]> {
    const supabase = await supabaseServer();
    const { data, error } = await supabase
      .from('posts')
      .select('id, title, sub_title, tags, created_at, updated_at');

    if (error) {
      console.error('Error fetching posts:', error);
      return [];
    }

    return data || [];
  },

  async getAllPostsStatic(): Promise<SimplePost[]> {
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    const { data, error } = await supabase
      .from('posts')
      .select('id, title, sub_title, tags, created_at, updated_at');

    if (error) {
      console.error('Error fetching posts for static generation:', error);
      return [];
    }

    return data || [];
  },

  async getPostDetail(id: string): Promise<PostDetail | null> {
    const supabase = await supabaseServer();
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching post detail:', error);
      return null;
    }

    return data;
  },

  async createPost(
    postData: {
      title: string;
      sub_title: string;
      markdown: string;
      tags: string[];
      author: string;
    },
    supabaseAccessToken: string | undefined,
  ): Promise<PostDetail[]> {
    if (!supabaseAccessToken) {
      throw new Error('Supabase access token이 필요합니다.');
    }

    const supabase = await supabaseServer(supabaseAccessToken);
    const { data, error } = await supabase
      .from('posts')
      .insert([postData])
      .select();

    if (error) {
      throw new Error(`게시물 생성에 실패했습니다: ${error.message}`);
    }

    return data || [];
  },
};
