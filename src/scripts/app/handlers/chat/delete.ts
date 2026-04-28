import { store } from '@/src/lib/store';
import { removeChat } from '@/src/lib/store/slices/chats';
import { deleteChatDB } from '@/src/scripts/database/handlers/chat/delete';

export const deleteChat = async (chatID: string): Promise<void> => {
  try {
    await deleteChatDB(chatID);
    store.dispatch(removeChat(chatID));
  } catch (err) {
    console.error('failed to delete chat:', err);
    throw err;
  }
};
