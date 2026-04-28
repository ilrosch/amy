import { changeStatusMessagesDB } from '@/src/scripts/database/handlers/message/status';

export const changeStatusMessages = async (ids: string[], status: string) => {
  try {
    await changeStatusMessagesDB(ids, status);
  } catch (err) {
    console.error('failed to update status messages:', err);
    throw err;
  }
};
