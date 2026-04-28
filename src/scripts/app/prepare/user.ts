import { store } from '@/src/lib/store';
import { getUserDataFromStorage } from '../../storage/user';
import { setToken, setUser } from '@/src/lib/store/slices/user';

export const prepareUserData = async () => {
  try {
    const [userData, tokenData] = await getUserDataFromStorage();
    store.dispatch(setUser(userData));
    store.dispatch(setToken(tokenData));
  } catch (err) {
    console.error('failed prepare user data:', err);
  }
};
