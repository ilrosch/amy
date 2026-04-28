import * as SecureStore from 'expo-secure-store';
import axiosInstance from '@/src/lib/clients/axios';
import routes from '@/src/lib/routes';

export const renameUser = async (name: string) => {
  try {
    await SecureStore.setItemAsync('name', name);
    await axiosInstance.post(routes.user.rename, { name });
  } catch (err) {
    console.log('Failed rename user:', err);
    throw err;
  }
};
