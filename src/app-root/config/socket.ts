const SOCKET_BASE_URL = process.env.EXPO_PUBLIC_SOCKET_URL;

export const buildSocketURL = (token: string): string => {
  if (!SOCKET_BASE_URL) throw new Error('no socket url in .env');
  return `${SOCKET_BASE_URL}/api/s/connect?token=${token}`;
};
