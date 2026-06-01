import { withDB } from '@/shared/api/db';

export const DELETE_CHAT = 'DELETE FROM chats WHERE id = ?;';

export const deleteChatDB = async (chatID: string) =>
  withDB(async (db) => {
    try {
      await db.runAsync(DELETE_CHAT, chatID);
    } catch (err) {
      console.error('failed to delete chat db:', err);
      throw err;
    }
  });
