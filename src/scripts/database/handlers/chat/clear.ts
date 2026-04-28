import { db as dbInstance } from '@/src/scripts/database/init';
import queries from '../queries';

export const clearChatDB = async (id: string, db = dbInstance): Promise<void> => {
  try {
    await db.runAsync(queries.chat.clear, id);
  } catch (err) {
    console.error('failed clear chat db:', err);
    throw err;
  }
};
