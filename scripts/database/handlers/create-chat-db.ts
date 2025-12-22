import { db } from '../init';
import reqs from './reqs';

export const createChatDB = async (userID: string) => {
  try {
    const stmt = await db.prepareAsync(reqs.createChat);
    await stmt.executeAsync(userID, userID);
    await stmt.finalizeAsync();
  } catch (err) {
    console.log('create chat db: ', err);
  }
};

export const getChat = async (userID: string) => {
  try {
    const stmt = await db.prepareAsync(reqs.getInfoChat);
    const res = await stmt.executeAsync(userID);
    const chat = await res.getFirstAsync();
    await stmt.finalizeAsync();
    return chat;
  } catch (err) {
    console.log('add contact store: ', err);
  }
};

export const getChats = async () => {
  try {
    const stmt = await db.prepareAsync(reqs.getChats);
    const res = await stmt.executeAsync();
    const chats = await res.getAllAsync();
    await stmt.finalizeAsync();
    return chats;
  } catch (err) {
    console.log('add contact store: ', err);
  }
};

export const isChatExists = async (userID: string) => {
  try {
    const stmt = await db.prepareAsync(reqs.isChatExists);
    const res = await stmt.executeAsync(userID);
    const exists = (await res.getFirstAsync()) === 1;
    await stmt.finalizeAsync();
    return exists;
  } catch (err) {
    console.log(err);
  }
};

export const getLastMessage = async (userID: string) => {
  try {
    const stmt = await db.prepareAsync(reqs.getLastMessage);
    const res = await stmt.executeAsync(userID);
    const message = await res.getFirstAsync();
    await stmt.finalizeAsync();
    return message;
  } catch (err) {
    console.log(err);
  }
};

export const removeAllUserMessage = async (id: string) => {
  try {
    const stmt = await db.prepareAsync(reqs.removeUserMessage);
    await stmt.executeAsync(id);
    await stmt.finalizeAsync();
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const removeChatDB = async (chatID: string) => {
  try {
    const stmt = await db.prepareAsync(reqs.removeChat);
    await stmt.executeAsync(chatID);
    await stmt.finalizeAsync();
  } catch (err) {
    console.log(err);
    throw err;
  }
};
