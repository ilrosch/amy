import { clearChatDB } from '@/src/scripts/database/handlers/chat/clear';

export const clearChat = async (id: string): Promise<void> => {
  try {
    await clearChatDB(id);
  } catch (err) {
    console.error('Failed clear chat:', err);
  }
};
