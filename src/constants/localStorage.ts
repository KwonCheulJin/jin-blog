export const STORAGE_KEYS = {
  LOGIN_TOOLTIP_SEEN: 'login-tooltip-seen',
  LIVEBLOCKS_TOOLTIP_SEEN: 'liveblocks-tooltip-seen',
} as const;

export type StorageKey = typeof STORAGE_KEYS[keyof typeof STORAGE_KEYS];