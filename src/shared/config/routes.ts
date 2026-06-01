export const ROUTES = {
  HOME: '/',
  CONTACTS: '/contacts',
  SETTINGS: '/settings',
  PROFILE: (id: string) => `/${id}/profile`,
  CHAT: (id: string) => `/${id}/chat`,
  ADD_CONTACT: '/add-contact',
  ADD_CHAT: '/add-chat',
  CONTACT: {
    RENAME: (id: string) => `/${id}/rename`,
  },
  CALL: {
    INCOMING: (id: string) => `/${id}/incoming-call`,
    ROOM: (id: string) => `/${id}/call`,
  },
  USER: {
    RENAME: `/rename-user`,
  },
} as const;
