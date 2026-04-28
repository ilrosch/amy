import { store } from '@/src/lib/store';
import { addChat } from '@/src/lib/store/slices/chats';
import { createChatDB } from '@/src/scripts/database/handlers/chat/create';
import { getChatDB } from '@/src/scripts/database/handlers/chat/get';

type CreateChat = (id: string) => Promise<void>;

export const createChat: CreateChat = async (id) => {
  try {
    await createChatDB(id);
    const chat = await getChatDB(id);
    store.dispatch(addChat(chat));
  } catch (err) {
    console.error('Failed create chat:', err);
    throw err;
  }
};
