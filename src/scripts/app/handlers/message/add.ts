import { Message } from '@/src/assets/entities/message';
import { store } from '@/src/lib/store';
import { addMessagesStore } from '@/src/lib/store/slices/messages';
import { addMessagesDB } from '@/src/scripts/database/handlers/message/add';

type AddMessages = (messages: Message[]) => Promise<void>;

export const addMessages: AddMessages = async (messages) => {
  try {
    await addMessagesDB(messages);
    const currentChat = store.getState().messages.chatID;
    const currentMessages = messages.filter((message) => message.chat_id === currentChat);
    store.dispatch(addMessagesStore(currentMessages));
  } catch (err) {
    console.error('Failed add messages:', err);
  }
};
