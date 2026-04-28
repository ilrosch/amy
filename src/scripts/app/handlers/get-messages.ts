import { db } from '../../database/init';
import { Message } from '@/src/assets/entities/message';

export const getMessages = async (chatID: string, page: number, limit = 10): Promise<Message[]> => {
  const offset = (page - 1) * limit;

  try {
    const stmt = await db.prepareAsync(reqs.getMessages);
    const rows = await stmt.executeAsync([chatID, limit, offset]);
    const res = await rows.getAllAsync();
    await stmt.finalizeAsync();
    return res;
  } catch (err) {
    console.log('Get message: ', err);
  }
};
