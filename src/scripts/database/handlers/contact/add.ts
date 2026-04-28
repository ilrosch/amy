import { SQLiteDatabase } from 'expo-sqlite';
import { db as dbInstance } from '@/src/scripts/database/init';
import { ContactType } from '@/src/assets/entities/contact';
import queries from '../queries';

type AddContactDB = (contact: ContactType, db?: SQLiteDatabase) => Promise<void>;

export const addContactDB: AddContactDB = async (contact, db = dbInstance) => {
  try {
    await db.runAsync(
      queries.contact.add,
      contact.id,
      contact.name,
      contact.status,
      contact.chat_id,
    );
  } catch (err) {
    console.error('Failed add contact db:', err);
    throw err;
  }
};

type AddContactsDB = (contacts: ContactType[], db?: SQLiteDatabase) => Promise<void>;

export const addContactsDB: AddContactsDB = async (contacts, db = dbInstance) => {
  try {
    await db.withTransactionAsync(async () => {
      const stmt = await db.prepareAsync(queries.contact.add);
      for (const contact of contacts) {
        try {
          await stmt.executeAsync(contact.id, contact.name);
        } catch (err) {
          console.error('Failed add contact:', err);
        }
      }
      await stmt.finalizeAsync();
    });
  } catch (err) {
    console.error('Failed add contacts db:', err);
    throw err;
  }
};
