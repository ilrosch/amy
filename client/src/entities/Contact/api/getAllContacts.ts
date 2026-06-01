import { withDB } from '@/shared/api/db';
import { GET_ALL_CONTACTS } from './queries';
import { ContactDTO } from '../model/types';
import { mapContactDtoToEntity } from '../model/mapper';

export const getAllContact = async () =>
  withDB(async (db) => {
    try {
      const res: ContactDTO[] = await db.getAllAsync(GET_ALL_CONTACTS);
      return res.map(mapContactDtoToEntity);
    } catch (err) {
      console.error('failed to load contacts from db:', err);
      throw err;
    }
  });
