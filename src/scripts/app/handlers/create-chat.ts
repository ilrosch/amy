import { store } from '@/src/lib/store';
import { addChat } from '@/src/lib/store/slices/chats';
import { createChatDB } from '../../database/handlers/chat/create';
import { Contact } from '@/src/assets/entities/contact';

export const createChat = async (contact: Contact) => {
  try {
    await createChatDB(contact.chat_id);
    store.dispatch(addChat({ id: contact.chat_id, name: contact.name, message: null }));
  } catch (err) {
    console.log('Failed create chat:', err);
  }
};
