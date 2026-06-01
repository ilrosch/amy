import { secureStore } from '@/shared/lib/secure-store';
import { Session } from '../model';

export const setSessionToStorage = async (session: Session) => {
  return secureStore.set('session', session);
};
