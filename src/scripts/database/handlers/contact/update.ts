import { db as dbInstance } from '@/src/scripts/database/init';
import queries from '../queries';

export const updateStatusContact = async (id: string, status: string, db = dbInstance) => {
  try {
    await db.runAsync(queries.contact.updateStatus, status, id);
  } catch (err) {
    console.error('Failed update status contact db:', err);
    throw err;
  }
};
