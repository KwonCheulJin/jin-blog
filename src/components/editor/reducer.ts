import { Post } from '@/types';

export enum ActionKind {
  title = 'title',
  sub_title = 'sub_title',
  markdown = 'markdown',
  tags = 'tags',
  clear = 'clear',
}

export type Action =
  | {
      type: ActionKind.title;
      payload: string;
    }
  | {
      type: ActionKind.sub_title;
      payload: string;
    }
  | {
      type: ActionKind.markdown;
      payload: string;
    }
  | {
      type: ActionKind.tags;
      payload: string[];
    }
  | {
      type: ActionKind.clear;
      payload: null;
    };

export function postReducer(state: Post, action: Action): Post {
  const { type, payload } = action;

  switch (type) {
    case ActionKind.title:
      return {
        ...state,
        title: payload,
      };
    case ActionKind.sub_title:
      return {
        ...state,
        sub_title: payload,
      };
    case ActionKind.markdown:
      return {
        ...state,
        markdown: payload,
      };
    case ActionKind.tags:
      return {
        ...state,
        tags: payload,
      };
    case ActionKind.clear:
      return {
        title: '',
        sub_title: '',
        markdown: '',
        tags: [],
      };
    default:
      throw new Error('존재하지 않는 액션 타입입니다.');
  }
}

export const initialState: Post = {
  title: '',
  sub_title: '',
  markdown: '',
  tags: [],
};
