import { db as dbInstance } from '../init';
import queries from './queries';

export const dropTables = async (db = dbInstance): Promise<void> => {
  try {
    await db.runAsync(queries.contact.drop);
  } catch (err) {
    console.error('Failed drop tables:', err);
    throw err;
  }
};
