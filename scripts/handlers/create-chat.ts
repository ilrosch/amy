import { store } from '@/lib/store';
import { createChatDB, getChat } from '../database/handlers/create-chat-db';
import { addChat, ChatType } from '@/lib/store/slices/chats';

export const createChat = async (userID: string) => {
  try {
    await createChatDB(userID);
    const chat = await getChat(userID);
    store.dispatch(addChat(chat));
  } catch (err) {
    console.log('Failed create chat:', err);
  }
};
