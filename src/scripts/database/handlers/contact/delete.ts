import { SQLiteDatabase } from 'expo-sqlite';
import { db as dbInstance } from '@/src/scripts/database/init';
import queries from '../queries';

interface DeleteContactDB {
  id: string;
  db: SQLiteDatabase;
}

export const renameContactDB = async ({ id, db = dbInstance }: DeleteContactDB) => {
  try {
    await db.runAsync(queries.contact.rename, id);
  } catch (err) {
    console.error('Failed delete contact db:', err);
    throw err;
  }
};

export const deleteContactDB = async (id: string, db = dbInstance) => {
  try {
    await db.runAsync(queries.contact.delete, id);
  } catch (err) {
    console.error('failed delete contact db:', err);
    throw err;
  }
};
