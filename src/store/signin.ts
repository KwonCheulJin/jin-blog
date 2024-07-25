import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

type MouseEvent = {
  isMouseEnter: boolean;
};

export type SignInState = {
  Google: MouseEvent;
  GitHub: MouseEvent;
};

type SignInAction = {
  setMouseEventInit: () => void;
  setTargetMouseEvent: (target: keyof SignInState, event: boolean) => void;
};

export const useSignInStore = create(
  immer<SignInState & SignInAction>(set => ({
    Google: {
      isMouseEnter: false,
    },
    GitHub: {
      isMouseEnter: false,
    },
    setMouseEventInit: () =>
      set(state => {
        state.GitHub.isMouseEnter = false;
        state.Google.isMouseEnter = false;
      }),
    setTargetMouseEvent: (target, event) =>
      set(state => {
        state[target].isMouseEnter = event;
      }),
  })),
);
