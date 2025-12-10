import { db } from '../database/init';
import reqs from '../database/handlers/reqs';

export const getMessages = async (chatID: string, page: number, limit = 10) => {
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
