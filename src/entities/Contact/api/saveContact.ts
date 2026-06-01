import { withDB } from '@/shared/api/db';
import { Contact } from '../model';
import { UPSERT_CONTACT } from './queries';

export const saveContact = async (contact: Contact) =>
  withDB(async (db) => {
    try {
      await db.runAsync(UPSERT_CONTACT, [contact.id, contact.name, contact.chatID, contact.status]);
    } catch (err) {
      console.error('failed to save contact to db:', err);
      throw err;
    }
  });
