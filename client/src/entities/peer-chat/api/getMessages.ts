import { withDB } from '@/shared/api/db';
import { GET_MESSAGES } from './queries';
import { mapMessageDtoToEntity } from '../model/mapper';
import { MessageDTO } from '../config/types';

export const getMessages = (chatID: string, page = 1, limit = 15) => {
  const offset = (page - 1) * limit;
  return withDB(async (db) => {
    try {
      const res: MessageDTO[] = await db.getAllAsync(GET_MESSAGES, [chatID, limit, offset]);
      return res.map(mapMessageDtoToEntity);
    } catch (err) {
      console.error('failed to get messages:', err);
      throw err;
    }
  });
};
