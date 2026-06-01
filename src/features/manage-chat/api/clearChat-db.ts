import { withDB } from '@/shared/api/db';

export const CLEAR_CHAT = 'DELETE FROM messages WHERE chat_id = ?;';

export const clearChatDB = async (chatID: string) =>
  withDB(async (db) => {
    try {
      await db.runAsync(CLEAR_CHAT, chatID);
    } catch (err) {
      console.error('failed to clear chat db:', err);
      throw err;
    }
  });
