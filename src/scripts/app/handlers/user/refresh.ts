import * as storage from 'expo-secure-store';

import http from '@/src/lib/clients/axios';
import { Token } from '@/src/assets/entities/user';
import { router } from '@/src/lib/routes';
import { store } from '@/src/lib/store';
import { setToken } from '@/src/lib/store/slices/user';

const TOKEN_REFRESH_THRESHOLD_MS = 3 * 24 * 60 * 60 * 1000;

export const refreshToken = async (tokenData: Token | null): Promise<void> => {
  if (!tokenData?.access_token || !tokenData.expires_at) return;

  const now = new Date();
  const expires = new Date(tokenData.expires_at);
  // refresh threshold
  if (expires.getTime() > now.getTime() + TOKEN_REFRESH_THRESHOLD_MS) return;

  try {
    const response = await http.post<Token>(router.user.refresh(), {
      access_token: tokenData.access_token,
    });

    const td = response.data;
    if (!td) throw new Error('no token data in response');
    // save new token data
    await storage.setItemAsync('token', JSON.stringify(td));
    store.dispatch(setToken(td));
  } catch (err) {
    console.error('failed to refresh token:', err);
  }
};
