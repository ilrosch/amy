import { router } from 'expo-router';
import { isChatExists } from '../database/handlers/create-chat-db';
import { createChat } from './create-chat';

export const handleRouterChat = async (id: string) => {
  try {
    const exists = await isChatExists(id);
    if (!exists) await createChat(id);
    router.push(`/chat/${id}`);
  } catch (err) {
    console.log('Failed router chat:', err);
  }
};
