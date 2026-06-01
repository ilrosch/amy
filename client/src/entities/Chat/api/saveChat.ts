import { withDB } from '@/shared/api/db';
import { UPSERT_CHAT } from './queries';

export const saveChat = async (chatID: string) =>
  withDB(async (db) => {
    try {
      await db.runAsync(UPSERT_CHAT, chatID);
    } catch (err) {
      console.error('failed to save chat to db:', err);
      throw err;
    }
  });
