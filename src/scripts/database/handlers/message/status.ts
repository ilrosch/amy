import { db } from '../../init';
import queries from '../queries';

export const changeStatusMessagesDB = async (ids: string[], status: string) => {
  await db.runAsync(queries.message.status, status, ids.join(','));
};
