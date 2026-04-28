import { SQLiteDatabase } from 'expo-sqlite';
import { db as dbInstance } from '@/src/scripts/database/init';
import { ContactType } from '@/src/assets/entities/contact';
import queries from '../queries';

type GetContactsDB = (db?: SQLiteDatabase) => Promise<ContactType[]>;

export const getContactsDB: GetContactsDB = async (db = dbInstance) => {
  try {
    const stmt = await db.prepareAsync(queries.contact.getAll);
    const res = await stmt.executeAsync();
    const contacts = (await res.getAllAsync()) as ContactType[];
    await stmt.finalizeAsync();
    return contacts;
  } catch (err) {
    console.error('Failed get contacts db:', err);
    throw err;
  }
};
