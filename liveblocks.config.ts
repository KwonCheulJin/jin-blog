// Define Liveblocks types for your application
// https://liveblocks.io/docs/api-reference/liveblocks-react#Typing-your-data
export type AccurateCursorPositions = {
  cursorSelectors: string[];
  cursorX: number;
  cursorY: number;
};

export type DragOffset = {
  x: number;
  y: number;
};
declare global {
  interface Liveblocks {
    // Each user's Presence, for useMyPresence, useOthers, etc.
    Presence: {
      cursor: AccurateCursorPositions | null;
      editingText: `${string}/${string}` | null;
    };

    // The Storage tree for the room, for useMutation, useStorage, etc.
    Storage: {
      // Example, a conflict-free list
      // animals: LiveList<string>;
    };

    // Custom user info set when authenticating with a secret key
    UserMeta: {
      id: string; // Accessible through `user.id`
      info: {
        name: string;
        color: string;
        avatar: string;
      }; // Accessible through `user.info`
    };

    // Custom events, for useBroadcastEvent, useEventListener
    // eslint-disable-next-line @typescript-eslint/ban-types
    RoomEvent: {};
      // Example has two events, using a union
      // | { type: "PLAY" }
      // | { type: "REACTION"; emoji: "🔥" };

    // Custom metadata set on threads, for useThreads, useCreateThread, etc.
    ThreadMetadata: {
      zIndex: number;
      cursorSelectors: string;
      cursorX: AccurateCursorPositions["cursorX"];
      cursorY: AccurateCursorPositions["cursorY"];
    };

    // Custom room info set with resolveRoomsInfo, for useRoomInfo
    RoomInfo: {
      // Example, rooms with a title and url
      // title: string;
      // url: string;
    };
  }
}

export { };

