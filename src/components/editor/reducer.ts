import { Post } from '@/types';

export enum ActionKind {
  title = 'title',
  subTitle = 'subTitle',
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
      type: ActionKind.subTitle;
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
    case ActionKind.subTitle:
      return {
        ...state,
        subTitle: payload,
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
        subTitle: '',
        markdown: '',
        tags: [],
      };
    default:
      throw new Error('존재하지 않는 액션 타입입니다.');
  }
}

export const initialState: Post = {
  title: '',
  subTitle: '',
  markdown: '',
  tags: [],
};
