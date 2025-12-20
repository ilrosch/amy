import * as SecureStore from 'expo-secure-store';

import { store } from '@/lib/store';
import { addAuth } from '@/lib/store/slices/auth';
import { Dispatch } from '@reduxjs/toolkit';
import initDB from './database/init';
import getContacts from './database/handlers/get-contacts-db';
import { addContacts } from '@/lib/store/slices/contacts';
import { addChats, ChatType } from '@/lib/store/slices/chats';
import { getChats, getLastMessage } from './database/handlers/create-chat-db';

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
  const chats = (await getChats()) as ChatType[];
  const lastMessagePS = chats?.map((chat) => getLastMessage(chat.id).then((msg) => msg?.body || null));
  const lastMessages = await Promise.all(lastMessagePS);

  const chatsData = chats?.map((chat, index) => ({
    ...chat,
    message: lastMessages[index],
  }));

  return dispatch(addChats(chatsData));
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
