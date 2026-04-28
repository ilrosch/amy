import { store } from '@/src/lib/store';
import { removeAllUserMessage, removeChatDB } from '../../database/handlers/create-chat-db';
import { removeChat, updateChat } from '@/src/lib/store/slices/chats';

export const handleClearChat = async (userID: string) => {
  try {
    await removeAllUserMessage(userID);
    store.dispatch(updateChat({ id: userID, changes: { message: null } }));
  } catch (err) {
    console.log('Failed clear chat:', err);
  }
};

export const handleDeleteChat = async (userID: string) => {
  try {
    await removeAllUserMessage(userID);
    await removeChatDB(userID);
    store.dispatch(removeChat(userID));
  } catch (err) {
    console.log('Failed delete chat:', err);
  }
};
