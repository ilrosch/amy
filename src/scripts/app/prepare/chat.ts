import { store } from '@/src/lib/store';
import { ChatType } from '@/src/assets/entities/chat';
import { addChats } from '@/src/lib/store/slices/chats';
import { getChatsDB } from '../../database/handlers/chat/get-all';

export const prepareChatsData = async () => {
  try {
    const chats: ChatType[] = await getChatsDB();
    store.dispatch(addChats(chats));
  } catch (err) {
    console.error('failed prepare chats data:', err);
  }
};
