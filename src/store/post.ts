import { Post } from '@/types';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

type PostState = {
  addPost: Post;
};

type PostAction = {
  setAddPostInit: () => void;
  setAddPost: (post: Post) => void;
};

export const usePostStore = create(
  immer<PostState & PostAction>(set => ({
    addPost: { title: '', sub_title: '', markdown: '', tags: [] },
    setAddPostInit: () =>
      set(state => {
        state.addPost.title = '';
        state.addPost.sub_title = '';
        state.addPost.markdown = '';
        state.addPost.tags = [];
      }),
    setAddPost: post =>
      set(state => {
        state.addPost = post;
      }),
  })),
);
