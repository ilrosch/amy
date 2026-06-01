import { secureStore } from '@/shared/lib/secure-store';
import { User } from '../model';

export const getUserFromStorage = async () => secureStore.get('user');
export const saveUserToStorage = async (user: User) => secureStore.set('user', user);
