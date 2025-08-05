import { Post } from '@/types';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

type PostState = {
  addPost: Post;
};

type PostAction = {
  setAddPostInit: () => void;
  setAddPost: (post: Post) => void;
  updateTitle: (title: string) => void;
  updateSubTitle: (subTitle: string) => void;
  updateMarkdown: (markdown: string) => void;
  updateTags: (tags: string[]) => void;
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
    updateTitle: title =>
      set(state => {
        state.addPost.title = title;
      }),
    updateSubTitle: subTitle =>
      set(state => {
        state.addPost.sub_title = subTitle;
      }),
    updateMarkdown: markdown =>
      set(state => {
        state.addPost.markdown = markdown;
      }),
    updateTags: tags =>
      set(state => {
        state.addPost.tags = tags;
      }),
  })),
);
