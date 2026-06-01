export const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL || '';

export const API_CONFIG = {
  TOKEN_PARAM: 'token',
} as const;

export const ENDPOINTS = {
  USER: {
    CREATE: '/api/user/create',
    REFRESH: '/api/user/refresh',
    UPDATE: '/api/user/update',
    PUSH: '/api/user/push',
  },
  CONTACT: {
    NEW: (id: string) => `/api/contact/${id}/new`,
    ACCEPT: (id: string) => `/api/contact/${id}/accept`,
    REJECT: (id: string) => `/api/contact/${id}/reject`,
    STATUS: (id: string) => `/api/contact/${id}/status`,
  },
} as const;
