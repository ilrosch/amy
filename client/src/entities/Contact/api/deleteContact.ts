import { withDB } from '@/shared/api/db';
import { DELETE_CONTACT } from './queries';

export const deleteContact = async (id: string) =>
  withDB(async (db) => {
    try {
      await db.runAsync(DELETE_CONTACT, id);
    } catch (err) {
      console.error('failed to delete contact from db:', err);
      throw err;
    }
  });
