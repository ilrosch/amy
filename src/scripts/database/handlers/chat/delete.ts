import { db as dbInstance } from '@/src/scripts/database/init';
import queries from '../queries';

export const deleteChatDB = async (id: string, db = dbInstance): Promise<void> => {
  try {
    await db.runAsync(queries.chat.delete, id);
  } catch (err) {
    console.error('failed delete chat db:', err);
    throw err;
  }
};
