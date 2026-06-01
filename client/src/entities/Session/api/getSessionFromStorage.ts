import { secureStore } from '@/shared/lib/secure-store';
import { Session } from '../model';

export const getSessionFromStorage = async () => {
  const session = await secureStore.get('session');
  if (!session) return null;
  return session as Session;
};
