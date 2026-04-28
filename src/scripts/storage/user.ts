import * as storage from 'expo-secure-store';
import { Token, User } from '@/src/assets/entities/user';

export const getUserDataFromStorage = async (): Promise<[User, Token]> => {
  try {
    const userPR: Promise<User> = storage.getItemAsync('user').then((d) => JSON.parse(d || ''));
    const tokenPR: Promise<Token> = storage.getItemAsync('token').then((d) => JSON.parse(d || ''));
    return Promise.all([userPR, tokenPR]);
  } catch (err) {
    console.error('failed get user data from storage:', err);
    throw err;
  }
};
