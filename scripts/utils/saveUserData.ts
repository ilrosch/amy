import * as SecureStore from 'expo-secure-store';
import { UserData } from '../handlers/createAccount';

const saveUserData = async ({ id, token, name }: UserData) => {
  const psID = SecureStore.setItem('id', id);
  const psToken = SecureStore.setItem('token', token);
  const psName = SecureStore.setItem('name', name);
  return Promise.all([psID, psToken, psName]);
};

export default saveUserData;
