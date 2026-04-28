import * as storage from 'expo-secure-store';
import { isAxiosError } from 'axios';

import http from '@/src/lib/clients/axios';
import { router } from '@/src/lib/routes';
import { store } from '@/src/lib/store';
import { setToken, setUser } from '@/src/lib/store/slices/user';
import { errors } from '@/src/scripts/utils/errors';
import { Token, User } from '@/src/assets/entities/user';

export const createUser = async (username: string): Promise<void> => {
  try {
    const response = await http.post<{ user: User; token: Token }>(router.user.create(), {
      name: username,
    });

    // prepare date
    const userData: User = response.data.user ?? {};
    const tokenData: Token = response.data.token ?? {};

    // save user to storage
    const userPR = storage.setItemAsync('user', JSON.stringify(userData));
    const tokenPR = storage.setItemAsync('token', JSON.stringify(tokenData));
    await Promise.all([userPR, tokenPR]);

    // save user to state
    store.dispatch(setUser(userData));
    store.dispatch(setToken(tokenData));
  } catch (err) {
    console.error('failed to create user:', err);

    if (isAxiosError(err)) {
      if (!err.response) throw errors.ERR_NETWORK;
      if (err.response?.status >= 500) throw errors.ERR_SERVER;
    }

    throw errors.ERR_UNKNOWN;
  }
};
