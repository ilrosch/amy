import * as SecureStore from 'expo-secure-store';

import { store } from '@/lib/store';
import { addAuth } from '@/lib/store/slices/auth';
import { Dispatch } from '@reduxjs/toolkit';
import initDB from './database/init';
import getContacts from './database/handlers/get-contacts-db';
import { addContacts } from '@/lib/store/slices/contacts';
import { addChats } from '@/lib/store/slices/chats';
import { getChats } from './database/handlers/create-chat-db';

const prepareAuthData = async (dispatch: Dispatch) => {
  const psID = SecureStore.getItemAsync('id');
  const psToken = SecureStore.getItemAsync('token');
  const psName = SecureStore.getItemAsync('name');
  const [id, token, name] = await Promise.all([psID, psToken, psName]);
  return dispatch(addAuth({ id, token, name }));
};

const prepareContactsData = async (dispatch: Dispatch) => {
  const contacts = await getContacts();
  return dispatch(addContacts(contacts));
};

const prepareChatsData = async (dispatch: Dispatch) => {
  const chats = await getChats();
  return dispatch(addChats(chats));
};

const prepareData = async () => {
  await initDB();
  const dispatch = store.dispatch;
  const authPS = prepareAuthData(dispatch);
  const contactsPS = prepareContactsData(dispatch);
  const chatsPS = prepareChatsData(dispatch);
  return Promise.all([authPS, contactsPS, chatsPS]);
};

export default prepareData;
