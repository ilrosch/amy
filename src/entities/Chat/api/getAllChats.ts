import { withDB } from '@/shared/api/db';
import { GET_CHATS } from './queries';
import { mapChatDtoToEntity } from '../model/mapper';
import { ChatDTO } from '../model/types';

export const getAllChats = async () =>
  withDB(async (db) => {
    try {
      const res: ChatDTO[] = await db.getAllAsync(GET_CHATS);
      return res.map(mapChatDtoToEntity);
    } catch (err) {
      console.error('failed to load chats from db:', err);
      throw err;
    }
  });
