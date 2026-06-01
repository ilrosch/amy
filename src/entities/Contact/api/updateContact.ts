import { withDB } from '@/shared/api/db';
import { Contact } from '../model';
import { UPDATE_CONTACT, UPSERT_CONTACT } from './queries';

export const updateContact = async (contact: Contact) =>
  withDB(async (db) => {
    try {
      await db.runAsync(UPDATE_CONTACT, [contact.name, contact.chatID, contact.status, contact.id]);
    } catch (err) {
      console.error('failed to update contact to db:', err);
      throw err;
    }
  });
