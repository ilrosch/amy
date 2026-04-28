import { db as dbInstance } from '@/src/scripts/database/init';
import queries from '../queries';

export const renameContactDB = async (id: string, name: string, db = dbInstance) => {
  try {
    await db.runAsync(queries.contact.rename, id, name);
  } catch (err) {
    console.error('Failed rename contact db:', err);
    throw err;
  }
};
